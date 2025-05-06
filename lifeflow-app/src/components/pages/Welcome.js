import { Google } from '@mui/icons-material';
import icono_app from '../../assets/img/lifeflow-full-filled.png';
import titulo_app from '../../assets/img/lifeflow-text-rosa.png';
import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { GoogleLogin } from "../logic/Google";

export default function Welcome(props) {

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            props.setToken(tokenResponse.access_token);
            GoogleLogin(tokenResponse, props.setLoginStatus);
        },
        onError: () => {
            props.setLoginStatus(null);
            props.setToken(null);
        },
        redirectUri: "http://localhost:3000",
        scope: "https://www.googleapis.com/auth/calendar",
        prompt: "consent"
    });

    return (
        <>
            <button id="login" onClick={() => login()} className='btn-pink' data-aos="fade-up">Iniciar sesión con Google <Google /></button>   
            <div id="welcome">
                <motion.div
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }}  
                    transition={{ duration: 1 }}  
                    className='vh-100 d-flex align-items-center justify-content-center gap-5'
                    >
                <img src={icono_app}/>
                    <div>
                        <img src={titulo_app} className='w-75'/>
                        <h4>Tu app web para tu seguimiento de ciclos menstruales.</h4>
                    </div>
                </motion.div>
            </div>
        </>
    );
}