// REACT
import React, { useState } from 'react';
// Componentes
import * as bootstrap from 'bootstrap';

import CreateRemindersModal from '../../components/modals/CreateRemindersModal';
import EditRemindersModal from '../../components/modals/EditRemindersModal';
import RemindersTable from '../../components/tables/RemindersTable';




export default function Reminders(props) {
    // Datos del usuario
    const user = props.user;
    const token = props.token;

    // Estado de modales, por defecto están ocultos
    const [displayCreateReminderModal, setDisplayCreateReminderModal] = useState(false);
    const [displayEditReminderModal, setDisplayEditReminderModal] = useState(false);

    const [selectedReminder, setSelectedReminder] = useState(null);

    
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
            // Recordatorio seleccionado
            selectedReminder={selectedReminder}
            setSelectedReminder={setSelectedReminder}
            // Contenedor de vista de recordatorio
            display={displayCreateReminderModal} 
            setDisplay={setDisplayCreateReminderModal}
            // Configuración de la vista de editar modal
            displayEditModal={displayEditReminderModal}
            setDisplayEditModal={setDisplayEditReminderModal}
            />
            {/* ----- CREAR MODAL ----- */}
            <CreateRemindersModal 
            user={user} 
            token={token} 
            display={displayCreateReminderModal} 
            setDisplay={setDisplayCreateReminderModal}/>
            {/* ----- EDITAR MODAL ----- */}
            <EditRemindersModal 
            user={user} 
            token={token}
            selectedReminder={selectedReminder}
            display={displayEditReminderModal} 
            setDisplay={setDisplayEditReminderModal}/>
        </article>
    );
}