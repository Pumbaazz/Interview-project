import { Navbar, Button } from "react-bootstrap";
import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { DashboardPage } from "./Dashboard";

export const NavigationBar = () => {
    const { instance, inProgress } = useMsal();
    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    /**
     * Executes a login redirect request.
     *
     * @param {Object} loginRequest - The login request object.
     * @return {Promise} A promise that resolves after the login request is executed.
     */
    const handleLoginRedirect = () => {
        instance
            .loginRedirect(loginRequest)
            .catch((error) => console.log(error));
    };

    /**
     * Executes the `logoutRedirect` method of `instance`.
     *
     * @return {void} This function does not return anything.
     */
    const handleLogoutRedirect = () => {
        instance.logoutRedirect();
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    Brand name
                </a>
                <AuthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <p
                            variant="warning"
                            drop="start"
                            title={
                                activeAccount && activeAccount.name
                                    ? activeAccount.name
                                    : "Unknown"
                            }
                        >
                        </p>
                        <Button
                            as="button"
                            onClick={handleLogoutRedirect}
                        >
                            Sign out
                        </Button>
                    </div>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <Button onClick={handleLoginRedirect}>
                            Sign in
                        </Button>
                    </div>
                </UnauthenticatedTemplate>
            </Navbar>
        </>
    );
};
