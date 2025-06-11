import { Google, Html } from '@mui/icons-material';
import IconoLifeFlow from '../assets/img/lifeflow-full-filled.png';
import TituloLifeFlow from '../assets/img/lifeflow-text-rosa.png';
import BootstrapSVG from '../assets/svg/bootstrap.svg';
import GoogleSVG from '../assets/svg/google.svg';
import NetCoreSVG from '../assets/svg/netcore.svg';
import ReactSVG from '../assets/svg/react.svg';
import SassSVG from '../assets/svg/sass.svg';
import IndexPNG from '../assets/img/index.png';
import RecordatoriosPNG from '../assets/img/recordatorios.png';
import SqlServerSVG from '../assets/svg/sqlserver.svg';
import { useGoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { GoogleLogin } from "../services/Google";
import { Notyf } from 'notyf';
import '../assets/styles/scroll.css';

export default function Welcome(props) {
    const notyf = new Notyf();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            props.setToken(tokenResponse.access_token);
            GoogleLogin(tokenResponse, props.setLoginStatus);
        },
        onError: () => {
            props.setLoginStatus(null);
            props.setToken(null);
            notyf.error("Error durante el inicio de sesión.");
        },
        redirectUri: "http://localhost:3000",
        scope: "https://www.googleapis.com/auth/calendar",
        prompt: "consent"
    });

    return (
        <>
            <button id="login" onClick={() => login()} className='btn-pink' data-aos="fade-up">Iniciar sesión con Google <Google /></button>   
            <div className='container min-vh-100'>
                <motion.div
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}  
                transition={{ duration: 1 }}  
                className='vh-100 d-flex align-items-center justify-content-center gap-5'>
                    <img className='w-50' src={IconoLifeFlow}/>
                    <div className='d-flex flex-column ms-3 gap-4'>
                        <img src={TituloLifeFlow} className='w-100'/>
                        <h3 className='m-0 mt-2 fw-bold txt-azul-oscuro'>Tu app web para tu seguimiento de ciclos menstruales.</h3>
                    </div>
                </motion.div>
            </div>
            <div className="pattern-container"></div>
            <div className='container min-vh-100'>
                <motion.div
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}  
                transition={{ duration: 1 }}  
                className='vh-100 d-flex flex-column align-items-center justify-content-center gap-3'>
                    <h1 className='m-0 mt-2 fw-bold txt-rosa-oscuro'>¿Qué es LifeFlow?</h1>
                    <h4>LifeFlow es una aplicación web destinada al registro y control de los ciclos menstruales femeninos.</h4>
                    <ul style={{fontSize: '25px'}}>
                        <li>Registra tus ciclos</li>
                        <li>Crea eventos mediante Google Calendar</li>
                        <li>Introduce información diaria</li>
                        <li>Modo embarazo</li>
                        <li>Generación y exportación de reportes personalizados</li>
                    </ul>
                    <div className='d-flex align-items-center gap-4 w-100'>
                        <img src={IndexPNG} alt="" className='w-50'/>
                        <img src={RecordatoriosPNG} alt="" className='w-50'/>
                    </div>
                </motion.div>
            </div>
            <div className="pattern-container"></div>
            <div className='container'>
                <motion.div
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}  
                transition={{ duration: 1 }}  
                className='d-flex flex-column align-items-center justify-content-center gap-5 py-5'>
                    <h3 className='m-0 mt-2 fw-bold'>Tecnologías</h3>
                    <div className='d-flex align-items-center gap-5 w-100'>
                        <div className='flex-grow-1 d-flex flex-column gap-3 align-items-center'>
                            <img src={ReactSVG} alt="" style={{height: '150px'}}/>
                            <h5>React</h5>
                        </div>
                        <div className='flex-grow-1 d-flex flex-column gap-3 align-items-center'>
                            <img src={NetCoreSVG} alt="" style={{height: '150px'}}/>
                            <h5>.NET Core</h5>
                        </div>
                        <div className='flex-grow-1 d-flex flex-column gap-3 align-items-center'>
                            <img src={SqlServerSVG} alt="" style={{height: '150px'}}/>
                            <h5>SQL Server</h5>
                        </div>
                        <div className='flex-grow-1 d-flex flex-column gap-3 align-items-center'>
                            <img src={BootstrapSVG} alt="" style={{height: '150px'}}/>
                            <h5>Bootstrap</h5>
                        </div>
                        <div className='flex-grow-1 d-flex flex-column gap-3 align-items-center'>
                            <img src={SassSVG} alt="" style={{height: '150px'}}/>
                            <h5>SASS</h5>
                        </div>
                        <div className='flex-grow-1 d-flex flex-column gap-3 align-items-center'>
                            <img src={GoogleSVG} alt="" style={{height: '150px'}}/>
                            <h5>Google</h5>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="pattern-container"></div>
            
        </>
    );
}