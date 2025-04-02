'use client';

import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store';

export function ReduxPersistProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Debug persistence status
    const unsubscribe = persistor.subscribe(() => {
      const { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        console.log('Redux Persist: Rehydration complete');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  return (
    <PersistGate 
      loading={null} 
      persistor={persistor}
      onBeforeLift={() => {
        console.log('Redux Persist: Before lift');
      }}
    >
      {(bootstrapped) => {
        if (bootstrapped) {
          console.log('Redux Persist: Bootstrapped');
        }
        return children;
      }}
    </PersistGate>
  );
} 