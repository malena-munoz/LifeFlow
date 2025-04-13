import Nav from '../modules/Nav';
import Index from '../pages/main/Index';

export default function Main(props) {

    const user = props.user;

    return (
        <>
            <Nav user={user} />
            <Index />
        </>
    );
}