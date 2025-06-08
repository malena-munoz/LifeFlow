import Spinner from 'react-bootstrap/Spinner';

function Loader() {
    return ( 
        <div id="loader">
            <Spinner animation="border" role="status" variant="light">
            </Spinner>
        </div>
    );
}

export default Loader;
