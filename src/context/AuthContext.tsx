import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  auth,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  loginAsGuest,
  logoutUser,
  db,
} from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isGuest: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              id: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || (currentUser.isAnonymous ? 'Guest Patron' : 'Client'),
              photoURL: currentUser.photoURL || '',
              role: currentUser.email === 'rakeshd78@gmail.com' ? 'admin' : 'user',
              createdAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.warn('User profile sync notice:', error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  };

  const handleSignInEmail = async (email: string, pass: string) => {
    try {
      await loginWithEmail(email, pass);
    } catch (error) {
      console.error('Email sign-in error:', error);
      throw error;
    }
  };

  const handleSignUpEmail = async (email: string, pass: string, name?: string) => {
    try {
      await registerWithEmail(email, pass, name);
    } catch (error) {
      console.error('Email sign-up error:', error);
      throw error;
    }
  };

  const handleSignInGuest = async () => {
    try {
      const guestObj = await loginAsGuest();
      if (guestObj) {
        setUser(guestObj);
      }
    } catch (error) {
      console.warn('Guest sign-in notice, using fallback session:', error);
      setUser({
        uid: `guest-${Date.now()}`,
        displayName: 'Guest Patron',
        email: '',
        isAnonymous: true,
        photoURL: '',
        emailVerified: false,
      } as unknown as User);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn('Sign-out notice:', error);
    } finally {
      setUser(null);
    }
  };

  const isAdmin = user?.email === 'rakeshd78@gmail.com';
  const isGuest = Boolean(user?.isAnonymous);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isGuest,
        signInWithGoogle: handleSignInGoogle,
        signInWithEmail: handleSignInEmail,
        signUpWithEmail: handleSignUpEmail,
        signInAsGuest: handleSignInGuest,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
