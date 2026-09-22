import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
  subscribeToAuth,
  AuthState,
} from '../services/googleAuth';
import {
  listUserSpreadsheets,
  getSpreadsheetDetails,
  getSpreadsheetValues,
  appendRowToSheet,
  createTrainingSpreadsheet,
  GoogleSpreadsheetItem,
  SheetMetadata,
} from '../services/googleSheets';

export interface InquiryLogPayload {
  name: string;
  email: string;
  company?: string;
  topic?: string;
  format?: string;
  participants?: string;
  duration?: string;
  message: string;
  source?: string;
}

interface GoogleSheetsContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  spreadsheets: GoogleSpreadsheetItem[];
  activeSpreadsheet: SheetMetadata | null;
  activeSpreadsheetId: string | null;
  activeSheetName: string;
  sheetData: string[][];
  isLoadingData: boolean;
  error: string | null;
  statusMessage: string | null;
  isSyncing: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loadUserSpreadsheets: () => Promise<void>;
  selectSpreadsheet: (id: string) => Promise<void>;
  selectSheetTab: (tabName: string) => Promise<void>;
  createNewTrainingSheet: (customTitle?: string) => Promise<string>;
  logInquiry: (payload: InquiryLogPayload) => Promise<boolean>;
  refreshActiveSheet: () => Promise<void>;
  clearError: () => void;
  clearStatusMessage: () => void;
}

const GoogleSheetsContext = createContext<GoogleSheetsContextType | undefined>(undefined);

export const GoogleSheetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [spreadsheets, setSpreadsheets] = useState<GoogleSpreadsheetItem[]>([]);
  const [activeSpreadsheetId, setActiveSpreadsheetId] = useState<string | null>(null);
  const [activeSpreadsheet, setActiveSpreadsheet] = useState<SheetMetadata | null>(null);
  const [activeSheetName, setActiveSheetName] = useState<string>('Inquiries Pelatihan');
  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Subscribe to Firebase Auth
  useEffect(() => {
    const unsubscribe = subscribeToAuth((state: AuthState) => {
      setUser(state.user);
      setAccessToken(state.accessToken);
      setIsAuthenticated(state.isAuthenticated);
      setIsLoading(state.isLoading);
    });

    initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setIsAuthenticated(true);
        setIsLoading(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch spreadsheets list once authenticated
  const loadUserSpreadsheets = useCallback(async () => {
    const token = accessToken || (await getAccessToken());
    if (!token) return;

    try {
      setIsLoadingData(true);
      setError(null);
      const list = await listUserSpreadsheets(token);
      setSpreadsheets(list);

      // If no active spreadsheet, auto select the first or a training hub sheet
      if (!activeSpreadsheetId && list.length > 0) {
        const preferred = list.find((s) => s.name.toLowerCase().includes('alfi') || s.name.toLowerCase().includes('training')) || list[0];
        await selectSpreadsheet(preferred.id);
      }
    } catch (err: any) {
      console.error('Failed to load spreadsheets list:', err);
      setError(err.message || 'Gagal memuat daftar Google Sheets dari Drive.');
    } finally {
      setIsLoadingData(false);
    }
  }, [accessToken, activeSpreadsheetId]);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      loadUserSpreadsheets();
    } else {
      setSpreadsheets([]);
      setActiveSpreadsheet(null);
      setActiveSpreadsheetId(null);
      setSheetData([]);
    }
  }, [isAuthenticated, accessToken, loadUserSpreadsheets]);

  const selectSpreadsheet = async (spreadsheetId: string) => {
    const token = accessToken || (await getAccessToken());
    if (!token) return;

    try {
      setIsLoadingData(true);
      setError(null);
      setActiveSpreadsheetId(spreadsheetId);

      const metadata = await getSpreadsheetDetails(spreadsheetId, token);
      setActiveSpreadsheet(metadata);

      const firstTab = metadata.sheets[0]?.title || 'Sheet1';
      setActiveSheetName(firstTab);

      // Fetch values for this tab
      const values = await getSpreadsheetValues(spreadsheetId, `${firstTab}!A1:Z50`, token);
      setSheetData(values);
    } catch (err: any) {
      console.error('Failed to load spreadsheet details:', err);
      setError(err.message || 'Gagal memuat isi Google Sheet.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const selectSheetTab = async (tabName: string) => {
    if (!activeSpreadsheetId) return;
    const token = accessToken || (await getAccessToken());
    if (!token) return;

    try {
      setIsLoadingData(true);
      setActiveSheetName(tabName);
      const values = await getSpreadsheetValues(activeSpreadsheetId, `${tabName}!A1:Z50`, token);
      setSheetData(values);
    } catch (err: any) {
      console.error('Failed to load sheet tab values:', err);
      setError(err.message || `Gagal memuat data tab ${tabName}`);
    } finally {
      setIsLoadingData(false);
    }
  };

  const refreshActiveSheet = async () => {
    if (!activeSpreadsheetId || !activeSheetName) return;
    const token = accessToken || (await getAccessToken());
    if (!token) return;

    try {
      setIsLoadingData(true);
      const values = await getSpreadsheetValues(activeSpreadsheetId, `${activeSheetName}!A1:Z50`, token);
      setSheetData(values);
      setStatusMessage('Data Google Sheets berhasil diperbarui.');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Gagal menyegarkan data.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const createNewTrainingSheet = async (customTitle?: string): Promise<string> => {
    const token = accessToken || (await getAccessToken());
    if (!token) throw new Error('Harap masuk dengan Google terlebih dahulu.');

    try {
      setIsLoadingData(true);
      setError(null);
      const result = await createTrainingSpreadsheet(
        customTitle || `Alfi IT Trainer - Training Hub (${new Date().toLocaleDateString('id-ID')})`,
        token
      );

      setStatusMessage('Spreadsheet baru berhasil dibuat dan distrukturkan otomatis di Google Drive Anda!');
      await loadUserSpreadsheets();
      await selectSpreadsheet(result.spreadsheetId);
      return result.spreadsheetId;
    } catch (err: any) {
      setError(err.message || 'Gagal membuat spreadsheet baru.');
      throw err;
    } finally {
      setIsLoadingData(false);
    }
  };

  const logInquiry = async (payload: InquiryLogPayload): Promise<boolean> => {
    const token = accessToken || (await getAccessToken());
    if (!token) {
      console.warn('Google Sheets token not available. Skipping automatic cloud logging.');
      return false;
    }

    try {
      setIsSyncing(true);
      let targetSpreadsheetId = activeSpreadsheetId;

      // If no spreadsheet exists yet, create one
      if (!targetSpreadsheetId) {
        targetSpreadsheetId = await createNewTrainingSheet(
          `Alfi IT Trainer - Inquiries & Leads (${new Date().getFullYear()})`
        );
      }

      const timestamp = new Date().toLocaleString('id-ID');
      const row = [
        [
          timestamp,
          payload.name,
          payload.email,
          payload.company || '-',
          payload.topic || 'In-House Training',
          payload.format || 'Onsite',
          payload.participants || '15-25 Orang',
          payload.duration || '-',
          payload.message,
          'Baru Masuk (Belum Follow-Up)',
        ],
      ];

      // Try appending to "Inquiries Pelatihan" tab or first tab
      const targetTab = activeSpreadsheet?.sheets.find((s) =>
        s.title.toLowerCase().includes('inquir') || s.title.toLowerCase().includes('lead')
      )?.title || activeSpreadsheet?.sheets[0]?.title || 'Sheet1';

      await appendRowToSheet(targetSpreadsheetId, targetTab, row, token);
      setStatusMessage(`Data inquiry berhasil dicatat ke Google Sheet "${targetTab}"!`);
      setTimeout(() => setStatusMessage(null), 4000);

      // If currently looking at this tab, refresh data
      if (activeSpreadsheetId === targetSpreadsheetId && activeSheetName === targetTab) {
        await refreshActiveSheet();
      }

      return true;
    } catch (err: any) {
      console.error('Failed to log inquiry to Google Sheet:', err);
      setError(`Gagal mencatat ke Google Sheet: ${err.message}`);
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  const signIn = async () => {
    try {
      setError(null);
      await googleSignIn();
      setStatusMessage('Berhasil terhubung dengan Google Sheets & Drive!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Gagal menghubungkan akun Google.');
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setActiveSpreadsheet(null);
      setActiveSpreadsheetId(null);
      setSheetData([]);
      setSpreadsheets([]);
      setStatusMessage('Akun Google berhasil diputus.');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Gagal keluar akun.');
    }
  };

  return (
    <GoogleSheetsContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        accessToken,
        spreadsheets,
        activeSpreadsheet,
        activeSpreadsheetId,
        activeSheetName,
        sheetData,
        isLoadingData,
        error,
        statusMessage,
        isSyncing,
        signIn,
        signOut: handleSignOut,
        loadUserSpreadsheets,
        selectSpreadsheet,
        selectSheetTab,
        createNewTrainingSheet,
        logInquiry,
        refreshActiveSheet,
        clearError: () => setError(null),
        clearStatusMessage: () => setStatusMessage(null),
      }}
    >
      {children}
    </GoogleSheetsContext.Provider>
  );
};

export const useGoogleSheets = () => {
  const context = useContext(GoogleSheetsContext);
  if (!context) {
    throw new Error('useGoogleSheets must be used within a GoogleSheetsProvider');
  }
  return context;
};
