import { useEffect, useState } from "react";
import { IsNewUser } from '../services/User'
import Loader from '../components/custom/Loader';
import Nav from '../components/custom/Nav';
import Index from './views/Index';
import Reminders from './views/Reminders';

export default function Main(props) {
    const login = props.login;
    const setLoginStatus = props.setLoginStatus;
    const [page, setPage] = useState(1);

    const renderPage = () => {
        switch(page){
            case 1:
                return <Index user={login.user} token={login.token}/>;
            case 2:
                return <Reminders user={login.user} token={login.token}/>;
            default:
                return <Index/>;
        }
    };

    useEffect(() => {
        IsNewUser(login.user.sub);
    }, []);
    

    return (
        <>
            <Nav user={login.user} setLoginStatus={setLoginStatus} setPage={setPage}/>
            <Loader/>
            {renderPage()}
        </>
    );
}