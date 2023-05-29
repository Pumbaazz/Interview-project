import { Navbar, Button, Nav } from "react-bootstrap";
import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export const NavigationBar = () => {
    const { instance } = useMsal();
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
            <Navbar bg="dark" variant="dark" className="navbarStyle">
                <a className="navbar-brand" href="/">
                    Brand name
                </a>
                <AuthenticatedTemplate>
                    <div className="collapse navbar-collapse justify-content-end">
                        <Nav.Item className="ml-3 navbar-text px-2">
                            {
                                activeAccount && activeAccount.name
                                    ? activeAccount.name
                                    : "Unknown"
                            }
                        </Nav.Item>
                        <Nav.Item>
                            <Button as="button" onClick={handleLogoutRedirect}> Sign out</Button>
                        </Nav.Item>
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
