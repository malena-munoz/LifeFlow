import React, { useEffect, useState } from "react";
import { IsNewUser } from '../services/User'
import ResgisterPeriodInfoModal from "../components/modals/RegisterPeriodInfoModal";
import Loader from '../components/custom/Loader';
import Nav from '../components/custom/Nav';
import Index from './views/Index';
import Reminders from './views/Reminders';
import { GetGoogleReminders } from "../services/Google";

export default function Main(props) {
    const login = props.login;
    const setLoginStatus = props.setLoginStatus;

    const [page, setPage] = useState(1);
    const [newUser, setNewUser] = useState(null);

    // DATOS RELACIONADOS CON CICLOS Y RECORDATORIOS
    const reminders = React.useRef([]);

    const renderPage = () => {
        switch(page){
            case 1:
                return <Index 
                user={login.user} 
                token={login.token}
                reminders={reminders}/>;
            case 2:
                return <Reminders 
                user={login.user} 
                token={login.token}
                reminders={reminders}/>;
            default:
                return <Index/>;
        }
    };

    useEffect(() => {
        const checkIfNewUser = async () => {
            const isNew = await IsNewUser(login.user.sub);
            setNewUser(isNew);
        };
        checkIfNewUser();
    }, []);

    useEffect(() => {
        async function fetchReminders() {
            const data = await GetGoogleReminders(login.token, login.user.sub);
            reminders.current = data;
            console.log("recordatorios",reminders.current);
        }
        fetchReminders();
    }, [login.token, login.user.sub]);
    

    return (
        <>
            <Nav user={login.user} setLoginStatus={setLoginStatus} setPage={setPage}/>
            <ResgisterPeriodInfoModal user={login.user} display={newUser}/>
            <Loader/>
            {renderPage()}
        </>
    );
}