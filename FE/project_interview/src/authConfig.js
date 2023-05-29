import { LogLevel } from '@azure/msal-browser';

export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_signUpSignIn',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://movievotingb2c.b2clogin.com/movievotingb2c.onmicrosoft.com/B2C_1_signUpSignIn',
        },
    },
    authorityDomain: 'movievotingb2c.b2clogin.com',
};

export const msalConfig = {
    auth: {
        clientId: '0c77cda1-3e59-4f86-89c5-e8017ea02625', // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: 'https://localhost:3000/dashboard', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        // navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
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


/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["openid", "app.read"],
    // 'openid', 'profile'
};
