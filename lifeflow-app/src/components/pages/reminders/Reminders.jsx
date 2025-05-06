// REACT
import React, { useState } from 'react';
// Componentes
import * as bootstrap from 'bootstrap';

import RemindersModal from './elements/RemindersModal';
import RemindersTable from './elements/RemindersTable';




export default function Reminders(props) {
    // Datos del usuario
    const user = props.user;
    const token = props.token;

    // Estado de modal de creación, por defecto está oculto
    const [displayCreateReminderModal, setDisplayCreateReminderModal] = useState(false);
    
    
    return(
        <article page="reminders">
            {/* ----- TITULO ----- */}
            <div className="d-flex flex-row gap-4 align-items-center">
                <h1>Recordatorios</h1>
            </div>
            {/* ----- TABLA Y DETALLES DE RECORDATORIOS ----- */}
            <RemindersTable
            user={user} 
            token={token} 
            display={displayCreateReminderModal} 
            setDisplay={setDisplayCreateReminderModal}/>
            {/* ----- CREAR MODAL ----- */}
            <RemindersModal 
            user={user} 
            token={token} 
            display={displayCreateReminderModal} 
            setDisplay={setDisplayCreateReminderModal}/>
        </article>
    );
}