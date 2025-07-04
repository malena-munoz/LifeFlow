import React, { useEffect, useState } from "react";
import { EsNuevoUsuario } from '../services/UsuarioServices'
import ResgisterPeriodInfoModal from "../components/modals/RegisterPeriodInfoModal";
import Loader from '../components/custom/Loader';
import Nav from '../components/custom/Nav';
import Index from './views/Index';
import Reminders from './views/Reminders';
import Estadisticas from "./views/Estadisticas";
import { GetGoogleReminders } from "../services/Google";
import { AgruparRecordatoriosPorDia } from "../services/RecordatoriosService";
import { CiclosTrimestre, DiasDeSangrado, DiasFertiles } from "../services/CicloService";
import Privacidad from "./views/Privacidad";
import Guia from "./views/Guia";


export default function Main(props) {
    const login = props.login;
    const setLoginStatus = props.setLoginStatus;

    // PAGINA ACTIVA Y ES NUEVO USUARIO
    const [page, setPage] = useState(1);
    const [newUser, setNewUser] = useState(null);

    // DATOS RELACIONADOS CON CICLOS Y RECORDATORIOS
    const reminders = React.useRef([]);
    const ciclos = React.useRef([]);
    const [sangrados, setSangrados] = useState([]);
    const [fertiles, setFertiles] = useState([]);

    // DISPLAY DE LA PRIVACIDAD
    const [displayPrivacidad, setDisplayPrivacidad] = useState(false);

    const renderPage = () => {
        switch(page){
            case 1:
                return <Index 
                user={login.user} 
                token={login.token}
                ciclos={ciclos.current}
                sangrados={sangrados}
                fertiles={fertiles}
                />;
            case 2:
                return <Reminders 
                user={login.user} 
                token={login.token}
                reminders={reminders}/>;
            case 3:
                return <Estadisticas 
                user={login.user} 
                token={login.token}/>;
            case 4: 
                return <Guia/>;
            default:
                return <Index 
                user={login.user} 
                token={login.token}
                ciclos={ciclos.current}
                sangrados={sangrados}
                fertiles={fertiles}
                />;
        }
    };

    useEffect(() => {
        const checkIfNewUser = async () => {
            const isNew = await EsNuevoUsuario(login.user.sub, login.user.given_name, login.user.family_name);
            setNewUser(isNew);
        };
        const fetchCiclos = async () => {
            const ciclos_trimestre = await CiclosTrimestre(login.user.sub, login.user.given_name, login.user.family_name);
            ciclos.current = ciclos_trimestre;
            setSangrados(DiasDeSangrado(ciclos_trimestre));
            setFertiles(DiasFertiles(ciclos_trimestre));
        };

        checkIfNewUser();
        if (!newUser) {
            fetchCiclos();
        }
    }, []);

    useEffect(() => {
        async function fetchReminders() {
            const data = await GetGoogleReminders(login.token, login.user.sub);
            reminders.current = data;
        }
        if (!newUser) {
            fetchReminders();
        }     
    }, [login.token, login.user.sub]);
    

    return (
        <>
            <Nav 
            user={login.user} 
            setLoginStatus={setLoginStatus} 
            setPage={setPage}
            setDisplayPrivacidad={setDisplayPrivacidad}/>
            <Privacidad display={displayPrivacidad} setDisplay={setDisplayPrivacidad}/>
            <ResgisterPeriodInfoModal user={login.user} display={newUser}/>
            <Loader/>
            {renderPage()}
        </>
    );
}