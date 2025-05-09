// Componentes
import LifeFlow from './components/LifeFlow';
// JS
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'datatables.net-dt/js/dataTables.dataTables.min.js'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "@flaticon/flaticon-uicons/css/all/all.css";
import 'datatables.net-dt/css/dataTables.dataTables.min.css'
import './App.css';
import './Calendar.css';
import 'notyf/notyf.min.css';

function App() {
    return ( 
        <LifeFlow />
    );
}

export default App;
