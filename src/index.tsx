import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserProvider from './components/contexts/provider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;

root.render(
    <HashRouter>
        <FluentProvider theme={webLightTheme}>
            <CookiesProvider>
                <GoogleOAuthProvider clientId={clientId}>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </GoogleOAuthProvider>
            </CookiesProvider>
        </FluentProvider>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
