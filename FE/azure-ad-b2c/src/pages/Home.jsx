import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { Container } from 'react-bootstrap';
import { DashboardPage } from '../components/Dashboard';

export const Home = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    return (
        <>
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <Container>
                        <DashboardPage />
                    </Container>
                ) : null}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p className='text-center'>
                    Please login to vote.
                </p>
            </UnauthenticatedTemplate>
        </>
    );
};