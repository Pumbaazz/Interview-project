import { useEffect } from "react";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/PageLayout";
import { Home } from "./pages/Home";
import { b2cPolicies } from "./authConfig";
import "./styles/App.css";

const Pages = () => {
    const { instance } = useMsal();
    useEffect(() => {
        const callbackId = instance.addEventCallback((event) => {
            if (
                (event.eventType === EventType.LOGIN_SUCCESS ||
                    event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
                event.payload.account
            ) {
                if (
                    event.payload.idTokenClaims["tfp"] ===
                    b2cPolicies.names.forgotPassword
                ) {
                    let signUpSignInFlowRequest =
                    {
                        authority:
                            b2cPolicies.authorities.signUpSignIn.authority,
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
};

export default App;
