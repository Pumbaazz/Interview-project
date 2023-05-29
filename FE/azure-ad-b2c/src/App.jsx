import { useEffect } from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';

import { Route, Routes } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import { Home } from './pages/Home';
import { b2cPolicies } from './authConfig';


import './styles/App.css';
import { DashboardPage } from './components/Dashboard';

const Pages = () => {
    const { instance } = useMsal();
    useEffect(() => {
        const callbackId = instance.addEventCallback((event) => {
            if (
                (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
                event.payload.account
            ) {
                // if (event.payload.idTokenClaims['tfp'] === b2cPolicies.names.editProfile) {
                //     // retrieve the account from initial sing-in to the app
                //     const originalSignInAccount = instance
                //         .getAllAccounts()
                //         .find(
                //             (account) =>
                //                 account.idTokenClaims.oid === event.payload.idTokenClaims.oid &&
                //                 account.idTokenClaims.sub === event.payload.idTokenClaims.sub &&
                //                 account.idTokenClaims['tfp'] === b2cPolicies.names.signUpSignIn
                //         );

                //     let signUpSignInFlowRequest = {
                //         authority: b2cPolicies.authorities.signUpSignIn.authority,
                //         account: originalSignInAccount,
                //     };

                //     instance.ssoSilent(signUpSignInFlowRequest);
                // }
                if (event.payload.idTokenClaims['tfp'] === b2cPolicies.names.forgotPassword) {
                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                    };
                    instance.loginRedirect(signUpSignInFlowRequest);
                }
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, [instance]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
    );
};

const App = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <PageLayout>
                <Pages />
            </PageLayout>
        </MsalProvider>
    );
}

export default App;
