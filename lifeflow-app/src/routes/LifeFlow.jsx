import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleCheckSession } from '../services/Google';
import Main from '../pages/Main';
import Welcome from '../pages/Welcome';

export default function LifeFlow () {
    const [loginStatus, setLoginStatus] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        GoogleCheckSession(setLoginStatus);
    }, []);

    return (
        <main>
            {loginStatus ? 
                <Main login={loginStatus} setLoginStatus={setLoginStatus} token={token}/> 
                : 
                <GoogleOAuthProvider clientId="981816115503-l42ngh8ah178r4rdskng4gh5jgov5eui.apps.googleusercontent.com">
                    <Welcome setLoginStatus={setLoginStatus} setToken={setToken} />
                </GoogleOAuthProvider>
            }
        </main>   
    );
}
