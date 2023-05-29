import { LogLevel } from '@azure/msal-browser';

export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_signUpSignIn',
        signUp: 'B2C_1_signUp ',
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

const apiConfig = {
    b2cScopes: ["https://your-tenant-name.onmicrosoft.com/tasks-api/app.read"],
    // webApi: "http://localhost:5000/hello"
};

const tokenRequest = {
    scopes: [...apiConfig.b2cScopes],
    forceRefresh: false
};

export const loginRequest = {
    scopes: ["openid", ...apiConfig.b2cScopes],
};
