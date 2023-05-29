import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

export const login = async () => {
  try {
    await msalInstance.loginRedirect(loginRequest);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  msalInstance.logout();
};

export default msalInstance;
