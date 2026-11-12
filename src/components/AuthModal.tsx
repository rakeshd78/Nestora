import React, { useState } from 'react';
import { X, LogOut, CheckCircle, UserCheck, Mail, Lock, User as UserIcon, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAccount?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onOpenAccount }) => {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsGuest, signOut, isAdmin, isGuest } = useAuth();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please provide both email and password.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      if (authMode === 'signup') {
        await signUpWithEmail(email.trim(), password, name.trim());
      } else {
        await signInWithEmail(email.trim(), password);
      }
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        setErrorMsg('Invalid email or password. Please try again.');
      } else if (err?.code === 'auth/email-already-in-use') {
        setErrorMsg('An account with this email already exists. Please sign in instead.');
      } else if (err?.code === 'auth/weak-password') {
        setErrorMsg('Password should be at least 6 characters long.');
      } else {
        setErrorMsg(err?.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
      setErrorMsg('Google sign-in was cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await signInAsGuest();
      onClose();
    } catch (err: any) {
      console.error('Guest Sign-In failed:', err);
      setErrorMsg('Guest sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#F7F3EE] border border-[#E3DACF] shadow-2xl p-6 sm:p-8 text-center max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A7167] hover:text-[#171512] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          <div className="space-y-5 py-2">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-[#171512] shadow-sm">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#171512] text-white flex items-center justify-center font-serif text-2xl">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'G'}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-[#7A7167]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                {isGuest ? 'Guest Session Active' : 'Signed In'}
              </div>
              <h3 className="font-serif text-2xl text-[#171512] mt-1">
                {user.displayName || (isGuest ? 'Guest Patron' : 'Nestora Client')}
              </h3>
              {user.email && <p className="text-xs text-[#7A7167] mt-0.5">{user.email}</p>}
              {isAdmin && (
                <span className="inline-block mt-2 px-2.5 py-0.5 text-[10px] uppercase tracking-wider bg-[#171512] text-white">
                  Studio Admin
                </span>
              )}
              {isGuest && (
                <p className="text-[11px] text-[#8C8276] mt-2 italic">
                  You are exploring Nestora as a guest. Your consultations and cart will remain saved during this session.
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              {onOpenAccount && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAccount();
                  }}
                  className="w-full py-2.5 border border-[#171512] text-[#171512] text-xs uppercase tracking-widest font-semibold hover:bg-[#EEE7DE] transition-colors"
                >
                  View My Orders & Inquiries
                </button>
              )}
              <button
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
                className="w-full py-2.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest hover:bg-[#2C2723] flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                {isGuest ? 'Exit Guest Session' : 'Sign Out'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 py-1">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#EEE7DE] border border-[#D8CEBF] flex items-center justify-center text-[#171512]">
              <UserCheck className="w-5 h-5 stroke-[1.5]" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A7167] font-medium block mb-1">
                • CLIENT ACCESS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#171512]">
                Welcome to Nestora
              </h3>
              <p className="text-xs text-[#5C554E] mt-1.5 max-w-xs mx-auto leading-relaxed">
                Choose your preferred access option to schedule consultations, save projects, and track orders.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs text-left rounded">
                {errorMsg}
              </div>
            )}

            {/* Email & Password Form */}
            <div className="bg-[#EEE7DE]/60 p-4 border border-[#E0D7CC] text-left space-y-3">
              <div className="flex items-center justify-between border-b border-[#D8CEBF] pb-2.5 mb-3">
                <span className="text-[11px] uppercase tracking-wider text-[#171512] font-semibold">
                  {authMode === 'signin' ? 'Sign In with Email' : 'Create an Account'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                    setErrorMsg('');
                  }}
                  className="text-[11px] text-[#7A7167] underline hover:text-[#171512] transition-colors"
                >
                  {authMode === 'signin' ? 'Need an account?' : 'Already have account?'}
                </button>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-3">
                {authMode === 'signup' && (
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#8C8276] absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F7F3EE] border border-[#D8CEBF] rounded-none pl-9 pr-3 py-2.5 text-xs text-[#171512] placeholder-[#8C8276] focus:outline-none focus:border-[#171512]"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C8276] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F7F3EE] border border-[#D8CEBF] rounded-none pl-9 pr-3 py-2.5 text-xs text-[#171512] placeholder-[#8C8276] focus:outline-none focus:border-[#171512]"
                  />
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C8276] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F7F3EE] border border-[#D8CEBF] rounded-none pl-9 pr-3 py-2.5 text-xs text-[#171512] placeholder-[#8C8276] focus:outline-none focus:border-[#171512]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-medium hover:bg-[#2C2723] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : authMode === 'signin' ? (
                    'Sign In with Email'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            </div>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D8CEBF]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#F7F3EE] px-3 text-[#8C8276]">Or Choose Access</span>
              </div>
            </div>

            {/* Google & Guest Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 bg-white border border-[#D8CEBF] text-[#171512] text-xs uppercase tracking-widest font-semibold hover:bg-[#EEE7DE] flex items-center justify-center gap-3 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={handleGuestSignIn}
                disabled={loading}
                className="w-full py-2.5 border border-[#8C8276] text-[#2C2723] text-xs uppercase tracking-widest font-semibold hover:bg-[#EEE7DE] flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C8276]" />
                Continue as Guest
              </button>
            </div>

            <p className="text-[10px] text-[#9A8F82] pt-1 leading-relaxed">
              Guest access allows immediate project browsing & store checkout without creating a password.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

