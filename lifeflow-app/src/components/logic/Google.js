import axios from "axios";

export function GoogleCalendarObject() {
    return {
        summary: "",
        location: "",
        description: "",
        start: {
            dateTime: "",
            timeZone: ""
        },
        end: {
            dateTime: "",
            timeZone: ""
        },
        recurrence: [],
        attendees: [],
        reminders: {
            useDefault: false,
            overrides: []
        }
    };
}

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
        const userInfo = res.data;

        const loginData = {
            user: userInfo,
            timestamp: Date.now()
        };

        localStorage.setItem("login-session", JSON.stringify(loginData));

        setLoginStatus(userInfo);
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

    const { user, timestamp } = JSON.parse(data);
    const now = Date.now();
    const minutesPassed = (now - timestamp) / (1000 * 60);

    if (minutesPassed <= 10) {
        setLoginStatus(user);
    } else {
        // Sesión vencida
        localStorage.removeItem("login-session");
        setLoginStatus(null);
    }
}