// Componentes
import LifeFlow from './routes/LifeFlow';
// JS
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net-dt/js/dataTables.dataTables.min.js'
import './services/BootstrapInitialize.js';
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "@flaticon/flaticon-uicons/css/all/all.css";
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import './assets/styles/App.css';
import './assets/styles/Calendar.css';
import 'notyf/notyf.min.css';

function App() {
    return ( 
        <LifeFlow />
    );
}

export default App;
