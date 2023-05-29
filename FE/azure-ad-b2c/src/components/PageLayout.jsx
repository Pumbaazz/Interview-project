import { AuthenticatedTemplate } from "@azure/msal-react";
import { NavigationBar } from "./NavigationBar";

export const PageLayout = (props) => {
    return (
        <>
            <NavigationBar />
            <br />
            <h5>
                <center>Title of website</center>
            </h5>
            <br />
            {props.children}
            <br />
            <AuthenticatedTemplate></AuthenticatedTemplate>
        </>
    );
};
