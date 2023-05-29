

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
    },
    authorityDomain: 'movievotingb2c.b2clogin.com',
};


export const msalConfig = {
    auth: {
        clientId: 'f5b7e137-646f-46e4-b418-5d9065d07cd5',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: '/',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
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