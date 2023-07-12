import { useSession } from "next-auth/react";
import StatusLayout from "./StatusLayout";

interface RestrictedProps {
    children: JSX.Element;
}

const Restricted = ({ children }: RestrictedProps): JSX.Element => {
    const session = useSession();

    switch (session.status) {
        case "loading": {
            return <StatusLayout name="Authenticating">Logging you in...</StatusLayout>;
        }
        case "unauthenticated": {
            return <StatusLayout name="Unauthorized">Unauthorized</StatusLayout>;
        }
        case "authenticated": {
            return children;
        }
        default: {
            return (
                <StatusLayout name="Unknown Error">
                    An unknown error occurred when accessing this page.
                </StatusLayout>
            );
        }
    }
};

export default Restricted;
