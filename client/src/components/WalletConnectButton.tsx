import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { Loader2, Wallet, LogOut } from 'lucide-react';

interface WalletConnectButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function WalletConnectButton({ 
  className, 
  variant = 'default',
  size = 'default' 
}: WalletConnectButtonProps) {
  const { isAuthenticated, isLoading, connectWallet, signIn, signOut, error } = useAuth();
  const { isConnected } = useWeb3ModalAccount();

  const handleClick = async () => {
    if (isAuthenticated) {
      signOut();
    } else if (isConnected) {
      await signIn();
    } else {
      await connectWallet();
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Loading...';
    if (isAuthenticated) return 'Disconnect';
    if (isConnected) return 'Sign In';
    return 'Connect Wallet';
  };

  const getButtonIcon = () => {
    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (isAuthenticated) return <LogOut className="w-4 h-4" />;
    return <Wallet className="w-4 h-4" />;
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <Button
        onClick={handleClick}
        disabled={isLoading}
        variant={variant}
        size={size}
        className={className}
      >
        {getButtonIcon()}
        <span className="ml-2">{getButtonText()}</span>
      </Button>
      {error && (
        <p className="text-sm text-red-600 text-center max-w-xs">
          {error}
        </p>
      )}
    </div>
  );
}
