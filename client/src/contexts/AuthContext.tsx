import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethers } from 'ethers';

interface User {
  id: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_URL = "https://dan-xw2i.onrender.com";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const isAuthenticated = !!token && !!user;

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('uploadjwt');
    if (storedToken) {
      setToken(storedToken);
      // You might want to verify the token with the backend here
    }
  }, []);

  const connectWallet = async () => {
    try {
      setError(null);
      await open();
    } catch (err) {
      setError('Failed to connect wallet');
      console.error('Wallet connection error:', err);
    }
  };

  const signIn = async () => {
    if (!isConnected || !address || !walletProvider) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Get nonce from backend
      const nonceRes = await fetch(`${BACKEND_URL}/auth/nonce/${address}`);
      if (!nonceRes.ok) {
        throw new Error('Failed to get nonce');
      }
      const { nonce } = await nonceRes.json();

      // Step 2: Sign message with wallet
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const message = `Login nonce: ${nonce}`;
      const signature = await signer.signMessage(message);

      // Step 3: Verify signature and get JWT
      const verifyRes = await fetch(`${BACKEND_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature }),
      });

      if (!verifyRes.ok) {
        throw new Error('Authentication failed');
      }

      const data = await verifyRes.json();
      
      // Store token and user data
      localStorage.setItem('uploadjwt', data.token);
      setToken(data.token);
      setUser(data.user);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      console.error('Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('uploadjwt');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    connectWallet,
    signIn,
    signOut,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
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
