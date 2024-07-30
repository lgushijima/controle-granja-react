import './globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import {AuthProvider} from './context/AuthProvider.tsx';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './api/queryCliente.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
