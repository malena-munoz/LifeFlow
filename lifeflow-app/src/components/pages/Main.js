import Nav from '../modules/Nav';
import Index from '../pages/main/Index';

export default function Main(props) {

    const user = props.user;
    const setLoginStatus = props.setLoginStatus;

    return (
        <>
            <Nav user={user} setLoginStatus={setLoginStatus}/>
            <Index />
        </>
    );
}