import axios from "axios";


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
        setLoginStatus(userInfo);
    } catch (err) {
        setLoginStatus(null);
    }
}

export function GoogleLogout(setLoginStatus) {
    setLoginStatus(null);
}