

import { LogLevel } from '@azure/msal-browser';


export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_signUpSignIn',
        // signUp: 'B2C_1_signUp '
        // forgotPassword: 'B2C_1_reset_v3',
        // editProfile: 'B2C_1_edit_profile_v2',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://movievotingb2c.b2clogin.com/movievotingb2c.onmicrosoft.com/B2C_1_signUpSignIn',
        },
        signUp: {
            authority: 'https://movievotingb2c.b2clogin.com/movievotingb2c.onmicrosoft.com/B2C_1_signUp',
        },
        // forgotPassword: {
        //     authority: 'https://movievotingb2c.b2clogin.com/movievotingb2c.onmicrosoft.com/B2C_1_reset_v3',
        // },
        // editProfile: {
        //     authority: 'https://movievotingb2c.b2clogin.com/movievotingb2c.onmicrosoft.com/b2c_1_edit_profile_v2',
        // },
    },
    authorityDomain: 'movievotingb2c.b2clogin.com',
};


export const msalConfig = {
    auth: {
        clientId: 'f5b7e137-646f-46e4-b418-5d9065d07cd5', // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: '/', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: 'localStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};



export const loginRequest = {
    scopes: [],
};



export const silentRequest = {
    scopes: ["openid", "profile"],
    loginHint: "example@domain.net"
};