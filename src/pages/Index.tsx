import { useState } from 'react';
import { BatchSelection } from '@/components/BatchSelection';
import { LoginForm } from '@/components/LoginForm';
import { CourseDashboard } from '@/components/CourseDashboard';
import { ConfirmationPage } from '@/components/ConfirmationPage';
import { RegistrationProvider } from '@/contexts/RegistrationContext';

type AppState = 'batch-selection' | 'login' | 'dashboard' | 'confirmation';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('batch-selection');
  const [selectedBatch, setSelectedBatch] = useState<string>('');

  const handleBatchSelect = (batch: string) => {
    setSelectedBatch(batch);
    setAppState('login');
  };

  const handleBackToBatch = () => {
    setAppState('batch-selection');
    setSelectedBatch('');
  };

  const handleLoginSuccess = () => {
    setAppState('dashboard');
  };

  const handleProceedToConfirmation = () => {
    setAppState('confirmation');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setAppState('batch-selection');
    setSelectedBatch('');
  };

  return (
    <RegistrationProvider>
      {appState === 'batch-selection' && (
        <BatchSelection onSelectBatch={handleBatchSelect} />
      )}
      {appState === 'login' && (
        <LoginForm
          batch={selectedBatch}
          onBack={handleBackToBatch}
          onSuccess={handleLoginSuccess}
        />
      )}
      {appState === 'dashboard' && (
        <CourseDashboard 
          onLogout={handleLogout} 
          onProceedToConfirmation={handleProceedToConfirmation}
        />
      )}
      {appState === 'confirmation' && (
        <ConfirmationPage
          onBack={handleBackToDashboard}
          onLogout={handleLogout}
        />
      )}
    </RegistrationProvider>
  );
};

export default Index;
