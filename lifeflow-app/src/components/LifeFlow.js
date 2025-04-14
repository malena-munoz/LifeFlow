import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleCheckSession } from './logic/Google';
import Main from './pages/Main';
import Welcome from './pages/Welcome';



export default function LifeFlow () {
    const [loginStatus, setLoginStatus] = useState(null);
    const [isCheckingSession, setIsCheckingSession] = useState(true); // <- nuevo

    useEffect(() => {
        GoogleCheckSession((user)=> {
            setLoginStatus(user);
            setIsCheckingSession(false); // <-- ya cargó
        });
    }, []);

    if (isCheckingSession) {
        // ⏳ Mostrar pantalla de carga mientras se verifica sesión
        return (
            <div style={{ textAlign: "center", marginTop: "30vh" }}>
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <main>
            {loginStatus ? 
                <Main user={loginStatus} setLoginStatus={setLoginStatus}/> 
                : 
                <GoogleOAuthProvider clientId="981816115503-l42ngh8ah178r4rdskng4gh5jgov5eui.apps.googleusercontent.com">
                    <Welcome setLoginStatus={setLoginStatus} />
                </GoogleOAuthProvider>
            }
        </main>   
    );
}
