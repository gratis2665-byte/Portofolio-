import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google Auth Provider with all requested Workspace scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => {
  provider.addScope(scope);
});

// Prompt for consent to ensure fresh tokens with all scopes
provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline',
});

// Flag to track sign-in in progress
let isSigningIn = false;

// In-memory cache for OAuth access token (never stored in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthListener = (state: AuthState) => void;
const listeners: Set<AuthListener> = new Set();

const notifyListeners = (state: AuthState) => {
  listeners.forEach((listener) => listener(state));
};

export const subscribeToAuth = (listener: AuthListener) => {
  listeners.add(listener);
  // Send immediate current state
  listener({
    user: auth.currentUser,
    accessToken: cachedAccessToken,
    isAuthenticated: !!auth.currentUser && !!cachedAccessToken,
    isLoading: false,
  });

  return () => {
    listeners.delete(listener);
  };
};

/**
 * Initialize auth state listener.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
        notifyListeners({
          user,
          accessToken: cachedAccessToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
        notifyListeners({
          user,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
      notifyListeners({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  });
};

/**
 * Sign in with Google Popup and obtain access token
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    notifyListeners({
      user: auth.currentUser,
      accessToken: cachedAccessToken,
      isAuthenticated: !!cachedAccessToken,
      isLoading: true,
    });

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential?.accessToken) {
      throw new Error('Gagal mendapatkan token akses dari Google OAuth.');
    }

    cachedAccessToken = credential.accessToken;

    notifyListeners({
      user: result.user,
      accessToken: cachedAccessToken,
      isAuthenticated: true,
      isLoading: false,
    });

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Google Sign-in Error:', error);
    notifyListeners({
      user: auth.currentUser,
      accessToken: cachedAccessToken,
      isAuthenticated: !!cachedAccessToken,
      isLoading: false,
    });
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Get current in-memory cached access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Sign out and clear in-memory tokens
 */
export const logout = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
  notifyListeners({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
  });
};
