import { useEffect, useState } from "react";
import { IsNewUser } from '../logic/User'
import Nav from '../modules/Nav';
import Index from '../pages/main/Index';
import Reminders from '../pages/main/Reminders';

export default function Main(props) {
    const [page, setPage] = useState(1);
    const [newUser, setNewUser] = useState(null);

    const user = props.user;
    console.log(user);
    const setLoginStatus = props.setLoginStatus;

    const renderPage = () => {
        switch(page){
            case 1:
                return <Index />;
            case 2:
                return <Reminders />;
            default:
                return <Index />;
        }
    };

    useEffect(() => {
        IsNewUser(user.sub);
    }, []);
    

    return (
        <>
            <Nav user={user} setLoginStatus={setLoginStatus} setPage={setPage}/>
            {renderPage()}
        </>
    );
}