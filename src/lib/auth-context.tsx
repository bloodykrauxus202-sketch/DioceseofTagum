import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';

// Complete auth session for web browser
WebBrowser.maybeCompleteAuthSession();

// User type for Firebase Auth
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: 'google' | 'facebook';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@datos_auth_user';

// OAuth Client IDs from Google Cloud Console (Firebase project: datos-e5fe7)
const GOOGLE_IOS_CLIENT_ID = '1087705723094-bd6qjn1eplc0gvhjf3s5bh91i9tf4lrj.apps.googleusercontent.com';
const GOOGLE_ANDROID_CLIENT_ID = '1087705723094-bd6qjn1eplc0gvhjf3s5bh91i9tf4lrj.apps.googleusercontent.com';
const GOOGLE_WEB_CLIENT_ID = '1087705723094-83qqimnindp99cv81e7pvfspbgdse8of.apps.googleusercontent.com';

// Facebook App ID
const FACEBOOK_APP_ID = '6174008472817851';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // iOS redirect URI using REVERSED_CLIENT_ID
  const iosRedirectUri = 'com.googleusercontent.apps.1087705723094-bd6qjn1eplc0gvhjf3s5bh91i9tf4lrj:/oauthredirect';

  // Redirect URI using makeRedirectUri for Web to match localhost correctly
  const redirectUri = Platform.OS === 'ios' ? iosRedirectUri : makeRedirectUri({
    scheme: 'datos',
    path: 'oauthredirect',
  });

  // Google Auth configuration with platform-specific client IDs
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
    redirectUri: redirectUri,
  });

  // Log the actual redirect URI being used
  console.log('Google Request Redirect URI:', googleRequest?.redirectUri);
  console.log('Platform:', Platform.OS);

  // Facebook redirect URI
  const facebookRedirectUri = Platform.OS === 'ios' ? `fb${FACEBOOK_APP_ID}://authorize` : undefined;

  // Facebook Auth configuration
  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    redirectUri: facebookRedirectUri,
  });

  // Log Facebook redirect URI
  console.log('Facebook Request Redirect URI:', facebookRequest?.redirectUri);

  // Handle Google auth response
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { authentication } = googleResponse;
      if (authentication?.accessToken) {
        fetchGoogleUserInfo(authentication.accessToken);
      }
    }
  }, [googleResponse]);

  // Handle Facebook auth response
  useEffect(() => {
    if (facebookResponse?.type === 'success') {
      const { authentication } = facebookResponse;
      if (authentication?.accessToken) {
        fetchFacebookUserInfo(authentication.accessToken);
      }
    }
  }, [facebookResponse]);

  // Load user from storage on app start
  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const fetchGoogleUserInfo = async (accessToken: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info from Google');
      }

      const googleUser = await response.json();

      if (!googleUser.id) {
        throw new Error('Invalid response from Google');
      }

      const userData: User = {
        uid: googleUser.id,
        email: googleUser.email || null,
        displayName: googleUser.name || null,
        photoURL: googleUser.picture || null,
        provider: 'google',
      };

      await saveUser(userData);
      console.log('Google Sign-In successful:', userData.email);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Google';
      console.error('Error fetching Google user info:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFacebookUserInfo = async (accessToken: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture.type(large)`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user info from Facebook');
      }

      const fbUser = await response.json();

      if (!fbUser.id) {
        throw new Error('Invalid response from Facebook');
      }

      const userData: User = {
        uid: fbUser.id,
        email: fbUser.email || null,
        displayName: fbUser.name || null,
        photoURL: fbUser.picture?.data?.url || null,
        provider: 'facebook',
      };

      await saveUser(userData);
      console.log('Facebook Sign-In successful:', userData.email);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Facebook';
      console.error('Error fetching Facebook user info:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Starting Google Sign-In...');
      console.log('Platform:', Platform.OS);

      if (!googleRequest) {
        setError('Google Sign-In is not ready. Please try again.');
        setIsLoading(false);
        return;
      }

      // Prompt the Google auth flow
      const result = await googlePromptAsync({
        showInRecents: true,
      });

      if (result.type === 'cancel') {
        console.log('Google Sign-In was cancelled by user');
        setError(null); // Don't show error for user cancellation
      } else if (result.type === 'error') {
        console.error('Google Sign-In error:', result.error);
        setError(result.error?.message || 'Google Sign-In failed. Please try again.');
      } else if (result.type !== 'success') {
        console.log('Google Sign-In result:', result.type);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Google';
      console.error('Google Sign-In error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Starting Facebook Sign-In...');
      console.log('Platform:', Platform.OS);

      if (!facebookRequest) {
        setError('Facebook Sign-In is not ready. Please try again.');
        setIsLoading(false);
        return;
      }

      // Prompt the Facebook auth flow
      const result = await facebookPromptAsync();

      if (result.type === 'cancel') {
        console.log('Facebook Sign-In was cancelled by user');
        setError(null); // Don't show error for user cancellation
      } else if (result.type === 'error') {
        console.error('Facebook Sign-In error:', result.error);
        setError(result.error?.message || 'Facebook Sign-In failed. Please try again.');
      } else if (result.type !== 'success') {
        console.log('Facebook Sign-In result:', result.type);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with Facebook';
      console.error('Facebook Sign-In error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
      console.log('User signed out');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign out';
      console.error('Sign out error:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        signInWithGoogle,
        signInWithFacebook,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
