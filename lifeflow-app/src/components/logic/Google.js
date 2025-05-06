import axios from "axios";
import { Notyf } from 'notyf';

export async function GoogleLogin(token, setLoginStatus) {
    try {
        // 1. Obtener el access_token
        const accessToken = token.access_token;
        // 2. Llamar a Google para obtener datos del usuario
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        // 3. Objeto con datos del usuario, timestamp y token
        const loginData = {
            user: res.data,
            timestamp: Date.now(),
            token: accessToken
        };
        // 4. Estado del inicio de sesión guardado en variable y en almacenamiento local
        setLoginStatus(loginData);
        localStorage.setItem("login-session", JSON.stringify(loginData));
    } catch (err) {
        localStorage.removeItem("login-session");
        setLoginStatus(null);
    }
}

export function GoogleLogout(setLoginStatus) {
    localStorage.removeItem("login-session");
    setLoginStatus(null);
}

export function GoogleCheckSession(setLoginStatus) {
    const data = localStorage.getItem("login-session");
    if (!data) return;

    const { user, timestamp, token } = JSON.parse(data);
    const now = Date.now();
    const minutesPassed = (now - timestamp) / (1000 * 60);

    if (minutesPassed <= 10) {
        setLoginStatus({ user, timestamp, token });
    } else {
        // Sesión vencida
        localStorage.removeItem("login-session");
        setLoginStatus(null);
    }
}

export async function CreateGoogleReminder(token, reminder, identifier) {
    const notyf = new Notyf();
    try {
        const response = await fetch(`https://localhost:7245/api/google-calendar/create-event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token,
                "identificador": identifier
            },
            body: JSON.stringify(reminder)
        });
        const data = await response.json();
        notyf.success("Evento creado con éxito.");
    } catch (error) {
        notyf.error(error.message);
    }
}

export async function GetGoogleReminders(token, identifier) {
    const notyf = new Notyf();
    try {
        const response = await fetch(`https://localhost:7245/api/google-calendar/events`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token,
                "identificador": identifier
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        notyf.error(error.message);
        return {};
    }
}