import './globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import {AuthProvider} from './context/AuthProvider.tsx';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './api/queryCliente.ts';
import {AlertDialogProvider} from './context/AlertDialogProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <AlertDialogProvider>
                        <App />
                    </AlertDialogProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
