import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileSpreadsheet,
  X,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Trash2,
  AlertCircle,
  FolderOpen,
  Send,
  Sparkles,
  Search,
  Database,
  Layers,
  Calendar,
  UserCheck,
  LogOut,
} from 'lucide-react';
import { useGoogleSheets } from '../context/GoogleSheetsContext';
import { GoogleSignInButton } from './GoogleSignInButton';
import { ConfirmationModal } from './ConfirmationModal';
import { appendRowToSheet, clearSheetValues } from '../services/googleSheets';

interface GoogleSheetsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsManagerModal: React.FC<GoogleSheetsManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
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
    signIn,
    signOut,
    selectSpreadsheet,
    selectSheetTab,
    createNewTrainingSheet,
    refreshActiveSheet,
    clearError,
  } = useGoogleSheets();

  const [activeViewTab, setActiveViewTab] = useState<'view' | 'list' | 'add'>('view');
  const [searchDriveQuery, setSearchDriveQuery] = useState('');
  const [customSheetTitle, setCustomSheetTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // New Row Form State
  const [newRowData, setNewRowData] = useState({
    col1: new Date().toLocaleDateString('id-ID'),
    col2: '',
    col3: '',
    col4: '',
    col5: 'Enterprise Microservices with Go & Kafka',
    col6: 'Onsite Kantor Klien',
    col7: '15 - 25 Orang',
    col8: '3 Hari Intensif',
    col9: '',
    col10: 'Baru Masuk',
  });
  const [isAppending, setIsAppending] = useState(false);

  // Destructive Action Modal State
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  if (!isOpen) return null;

  const handleCreateNewSheet = async () => {
    try {
      setIsCreating(true);
      await createNewTrainingSheet(customSheetTitle || undefined);
      setCustomSheetTitle('');
      setActiveViewTab('view');
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  };

  const handleManualAddRow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSpreadsheetId || !activeSheetName || !accessToken) return;

    try {
      setIsAppending(true);
      const row = [
        [
          newRowData.col1,
          newRowData.col2,
          newRowData.col3,
          newRowData.col4,
          newRowData.col5,
          newRowData.col6,
          newRowData.col7,
          newRowData.col8,
          newRowData.col9,
          newRowData.col10,
        ],
      ];

      await appendRowToSheet(activeSpreadsheetId, activeSheetName, row, accessToken);
      await refreshActiveSheet();
      setNewRowData({
        col1: new Date().toLocaleDateString('id-ID'),
        col2: '',
        col3: '',
        col4: '',
        col5: 'Enterprise Microservices with Go & Kafka',
        col6: 'Onsite Kantor Klien',
        col7: '15 - 25 Orang',
        col8: '3 Hari Intensif',
        col9: '',
        col10: 'Baru Masuk',
      });
      setActiveViewTab('view');
    } catch (err: any) {
      console.error('Error appending row:', err);
    } finally {
      setIsAppending(false);
    }
  };

  const requestClearSheet = () => {
    if (!activeSpreadsheetId || !activeSheetName) return;
    setConfirmationMessage(
      `Apakah Anda yakin ingin menghapus isi data pada tab "${activeSheetName}" di Google Sheet "${activeSpreadsheet?.title}"? Tindakan ini akan mengosongkan baris data.`
    );
    setPendingAction(() => async () => {
      if (accessToken && activeSpreadsheetId) {
        // Clear starting from row 2 so headers are preserved, or entire sheet
        await clearSheetValues(activeSpreadsheetId, `${activeSheetName}!A2:Z100`, accessToken);
        await refreshActiveSheet();
      }
    });
    setConfirmationOpen(true);
  };

  const handleConfirmAction = async () => {
    if (pendingAction) {
      await pendingAction();
      setPendingAction(null);
    }
    setConfirmationOpen(false);
  };

  const filteredSpreadsheets = spreadsheets.filter((s) =>
    s.name.toLowerCase().includes(searchDriveQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/75 dark:bg-black/85 backdrop-blur-xs"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl bg-white dark:bg-[#181816] border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col z-10"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-[#1c1c1a]/70">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                    Google Sheets Sync &amp; Management Hub
                  </h3>
                  {isAuthenticated && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Terhubung
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Sinkronisasi langsung formulir pemesanan, silabus, dan data peserta dengan Google Sheets Drive Anda
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && user && (
                <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Google User'}
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                      {user.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <span className="text-stone-800 dark:text-stone-200 font-medium truncate max-w-[120px]">
                    {user.displayName || user.email}
                  </span>
                  <button
                    onClick={signOut}
                    title="Putuskan Akun"
                    className="p-1 rounded-md text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Feedback & Alert Banners */}
          {error && (
            <div className="px-6 py-2.5 bg-rose-50 dark:bg-rose-950/50 border-b border-rose-200 dark:border-rose-900 flex items-center justify-between text-xs text-rose-800 dark:text-rose-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button onClick={clearError} className="underline text-[11px] cursor-pointer">
                Tutup
              </button>
            </div>
          )}

          {statusMessage && (
            <div className="px-6 py-2.5 bg-emerald-50 dark:bg-emerald-950/50 border-b border-emerald-200 dark:border-emerald-900 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Main Content Area */}
          {!isAuthenticated ? (
            <div className="p-8 sm:p-14 text-center max-w-lg mx-auto flex flex-col items-center justify-center my-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-6 shadow-sm">
                <FileSpreadsheet className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 mb-2">
                Hubungkan Google Sheets &amp; Drive
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                Masuk dengan akun Google Anda untuk mengizinkan aplikasi ini melihat, membuat, dan mencatat data pelatihan IT ke spreadsheet Google Drive Anda secara aman dengan izin pengguna.
              </p>

              <GoogleSignInButton onClick={signIn} isLoading={isLoading} label="Masuk dengan Akun Google" />

              <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 font-mono">
                Menggunakan Google Identity OAuth 2.0 resmi • Token tersimpan aman di memori sesi
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto flex flex-col">
              {/* Navigation Sub-Tabs */}
              <div className="px-6 pt-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 bg-white dark:bg-[#181816]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveViewTab('view')}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeViewTab === 'view'
                        ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                        : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Tabel &amp; Data Live</span>
                  </button>

                  <button
                    onClick={() => setActiveViewTab('list')}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeViewTab === 'list'
                        ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                        : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Spreadsheet di Drive ({spreadsheets.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveViewTab('add')}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeViewTab === 'add'
                        ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                        : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Baris Manual</span>
                  </button>
                </div>

                {activeSpreadsheet && (
                  <div className="flex items-center gap-2 pb-2">
                    <button
                      onClick={refreshActiveSheet}
                      disabled={isLoadingData}
                      className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs transition-colors cursor-pointer flex items-center gap-1"
                      title="Segarkan data spreadsheet"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>

                    <a
                      href={activeSpreadsheet.spreadsheetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>Buka di Google Sheets</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* View Tab: Live Table View */}
              {activeViewTab === 'view' && (
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  {/* Spreadsheet Header Info & Tab Selector */}
                  {activeSpreadsheet ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                            {activeSpreadsheet.title}
                          </h4>
                          <span className="text-[10px] font-mono text-stone-400">
                            ({activeSpreadsheet.sheets.length} Tab)
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[11px] font-mono text-stone-500 mr-1">Pilih Tab:</span>
                          {activeSpreadsheet.sheets.map((s) => (
                            <button
                              key={s.sheetId}
                              onClick={() => selectSheetTab(s.title)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                activeSheetName === s.title
                                  ? 'bg-emerald-700 text-white dark:bg-emerald-600 font-semibold shadow-2xs'
                                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-stone-400'
                              }`}
                            >
                              {s.title}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={requestClearSheet}
                          className="px-2.5 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Kosongkan Data Tab</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                      <FileSpreadsheet className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                      <h4 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-1">
                        Belum Ada Spreadsheet Aktif yang Dipilih
                      </h4>
                      <p className="text-xs text-stone-500 max-w-md mx-auto mb-4">
                        Buat spreadsheet manajemen pelatihan siap pakai dalam 1-klik, atau pilih spreadsheet yang sudah ada dari Google Drive Anda.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={handleCreateNewSheet}
                          disabled={isCreating}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isCreating ? 'Sedang Membuat...' : '✨ Buat Spreadsheet Pelatihan Baru'}</span>
                        </button>
                        <button
                          onClick={() => setActiveViewTab('list')}
                          className="px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                        >
                          Pilih dari Google Drive
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Data Grid Table */}
                  {activeSpreadsheet && (
                    <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-white dark:bg-[#181816]">
                      {isLoadingData ? (
                        <div className="p-12 text-center text-xs text-stone-500 font-mono">
                          <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600" />
                          <span>Mengambil data sel Google Sheets...</span>
                        </div>
                      ) : sheetData.length === 0 ? (
                        <div className="p-10 text-center text-xs text-stone-500">
                          Tab ini masih kosong atau belum memiliki baris data. Klik &quot;Tambah Baris Manual&quot; atau kirim formulir inquiry.
                        </div>
                      ) : (
                        <div className="overflow-x-auto max-h-[380px]">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-stone-100 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[11px] sticky top-0 z-10 shadow-2xs">
                                <th className="py-2.5 px-3 border-r border-stone-200 dark:border-stone-800 w-10 text-center">
                                  #
                                </th>
                                {sheetData[0]?.map((header, idx) => (
                                  <th
                                    key={idx}
                                    className="py-2.5 px-3 border-r border-stone-200 dark:border-stone-800 font-semibold whitespace-nowrap"
                                  >
                                    {header || `Kolom ${idx + 1}`}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sheetData.slice(1).map((row, rowIdx) => (
                                <tr
                                  key={rowIdx}
                                  className="border-b border-stone-100 dark:border-stone-900/80 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors"
                                >
                                  <td className="py-2.5 px-3 text-center text-stone-400 font-mono text-[10px] border-r border-stone-100 dark:border-stone-900">
                                    {rowIdx + 2}
                                  </td>
                                  {sheetData[0]?.map((_, colIdx) => (
                                    <td
                                      key={colIdx}
                                      className="py-2.5 px-3 text-stone-800 dark:text-stone-200 border-r border-stone-100 dark:border-stone-900 whitespace-nowrap max-w-xs truncate"
                                    >
                                      {row[colIdx] ?? '-'}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* List Tab: Drive Spreadsheets List & Creator */}
              {activeViewTab === 'list' && (
                <div className="p-6 space-y-6">
                  {/* Create New Quick Bar */}
                  <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                          Buat Spreadsheet Khusus Manajemen Pelatihan IT
                        </h4>
                        <p className="text-xs text-emerald-800/80 dark:text-emerald-400">
                          Otomatis memformat tab Inquiries, Jadwal Kelas, dan Evaluasi Nilai Peserta
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <input
                        type="text"
                        placeholder="Nama Sheet (Opsional)"
                        value={customSheetTitle}
                        onChange={(e) => setCustomSheetTitle(e.target.value)}
                        className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-emerald-300 dark:border-emerald-800 text-stone-900 dark:text-stone-100 w-full sm:w-56 focus:outline-hidden focus:border-emerald-600"
                      />
                      <button
                        onClick={handleCreateNewSheet}
                        disabled={isCreating}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 text-white font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer shadow-xs disabled:opacity-60"
                      >
                        {isCreating ? 'Membuat...' : 'Buat Sekarang'}
                      </button>
                    </div>
                  </div>

                  {/* Drive Files Search & Grid */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                        Pilih Spreadsheet dari Google Drive Anda
                      </h4>
                      <div className="relative w-64">
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Cari file..."
                          value={searchDriveQuery}
                          onChange={(e) => setSearchDriveQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                      {filteredSpreadsheets.map((sheet) => (
                        <div
                          key={sheet.id}
                          onClick={() => {
                            selectSpreadsheet(sheet.id);
                            setActiveViewTab('view');
                          }}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                            activeSpreadsheetId === sheet.id
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 shadow-2xs'
                              : 'bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 shrink-0">
                              <FileSpreadsheet className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                {sheet.name}
                              </h5>
                              <p className="text-[10px] text-stone-400 font-mono">
                                Diubah: {sheet.modifiedTime ? new Date(sheet.modifiedTime).toLocaleDateString('id-ID') : '-'}
                              </p>
                            </div>
                          </div>

                          {activeSpreadsheetId === sheet.id && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-600 text-white font-medium shrink-0">
                              Aktif
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {filteredSpreadsheets.length === 0 && (
                      <div className="p-8 text-center text-xs text-stone-500 rounded-xl bg-stone-50 dark:bg-stone-900">
                        Tidak ada spreadsheet yang ditemukan dengan kata kunci &quot;{searchDriveQuery}&quot;.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Add Tab: Manual Row Entry */}
              {activeViewTab === 'add' && (
                <div className="p-6 max-w-2xl mx-auto w-full">
                  <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
                    Tambah Baris Data Baru ke Spreadsheet
                  </h4>
                  <p className="text-xs text-stone-500 mb-6">
                    Mencatat data inquiry baru atau jadwal pelatihan ke tab{' '}
                    <strong className="text-emerald-700 dark:text-emerald-400">
                      &quot;{activeSheetName}&quot;
                    </strong>{' '}
                    di Google Sheet aktif.
                  </p>

                  <form onSubmit={handleManualAddRow} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-stone-400 block mb-1">
                          Nama PIC / Pemohon:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nama lengkap PIC"
                          value={newRowData.col2}
                          onChange={(e) => setNewRowData({ ...newRowData, col2: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-stone-400 block mb-1">
                          Email Kerja PIC:
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="email@perusahaan.com"
                          value={newRowData.col3}
                          onChange={(e) => setNewRowData({ ...newRowData, col3: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-stone-400 block mb-1">
                          Perusahaan / Organisasi:
                        </label>
                        <input
                          type="text"
                          placeholder="PT / Instansi"
                          value={newRowData.col4}
                          onChange={(e) => setNewRowData({ ...newRowData, col4: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-stone-400 block mb-1">
                          Topik Pelatihan:
                        </label>
                        <input
                          type="text"
                          value={newRowData.col5}
                          onChange={(e) => setNewRowData({ ...newRowData, col5: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-stone-400 block mb-1">
                          Format:
                        </label>
                        <select
                          value={newRowData.col6}
                          onChange={(e) => setNewRowData({ ...newRowData, col6: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                        >
                          <option value="Onsite Kantor Klien">Onsite Kantor Klien</option>
                          <option value="Live Online Interactive">Live Online</option>
                          <option value="Hybrid (Campuran)">Hybrid</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-stone-400 block mb-1">
                          Estimasi Peserta:
                        </label>
                        <select
                          value={newRowData.col7}
                          onChange={(e) => setNewRowData({ ...newRowData, col7: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                        >
                          <option value="5 - 15 Orang">5 - 15 Orang</option>
                          <option value="15 - 25 Orang">15 - 25 Orang</option>
                          <option value="25 - 50 Orang">25 - 50 Orang</option>
                          <option value="50+ Orang">50+ Orang</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-stone-600 dark:text-stone-400 block mb-1">
                          Status Follow Up:
                        </label>
                        <select
                          value={newRowData.col10}
                          onChange={(e) => setNewRowData({ ...newRowData, col10: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                        >
                          <option value="Baru Masuk">Baru Masuk</option>
                          <option value="Proposal Terkirim">Proposal Terkirim</option>
                          <option value="Negosiasi Jadwal">Negosiasi Jadwal</option>
                          <option value="Terkonfirmasi (Deal)">Terkonfirmasi (Deal)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-stone-600 dark:text-stone-400 block mb-1">
                        Catatan Kebutuhan Khusus:
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Contoh: Fokus pada hands-on pipeline CI/CD dan Helm chart..."
                        value={newRowData.col9}
                        onChange={(e) => setNewRowData({ ...newRowData, col9: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveViewTab('view')}
                        className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isAppending}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-60"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isAppending ? 'Menyimpan...' : 'Simpan Baris ke Google Sheets'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Mandatory User Confirmation Modal for Destructive Operations */}
      <ConfirmationModal
        isOpen={confirmationOpen}
        title="Konfirmasi Penghapusan Data Spreadsheet"
        message={confirmationMessage}
        confirmLabel="Hapus Data Sel"
        cancelLabel="Batal"
        isDestructive={true}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmationOpen(false)}
      />
    </AnimatePresence>
  );
};
