import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Main from './pages/Main';
import Welcome from './pages/Welcome';



export default function LifeFlow () {
    const [loginStatus, setLoginStatus] = useState(null);

    useEffect(() => {
        let timeoutId;
        if (loginStatus) {
            timeoutId = setTimeout(() => {
                setLoginStatus(null);
            }, 600000); 
        }
        return () => {
            clearTimeout(timeoutId); 
        };
    }, [loginStatus]);

    return (
        <main>
            {loginStatus ? 
                <Main user={loginStatus} /> 
                : 
                <GoogleOAuthProvider clientId="981816115503-l42ngh8ah178r4rdskng4gh5jgov5eui.apps.googleusercontent.com">
                    <Welcome setLoginStatus={setLoginStatus} />
                </GoogleOAuthProvider>
            }
        </main>   
    );
}
