import React, { useEffect, useState } from 'react';
import { GetGoogleReminders, DeleteGoogleReminder } from '../../services/Google';
import { GooogleColors } from '../../services/Objects';
import { SpanishDateString } from '../../services/Methods';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import RemindersDisplay from '../displays/RemindersDisplay';
import { ReminderButtonOptions } from '../../services/HtmlCreator';



export default function RemindersTable(props){
    const user = props.user;
    const token = props.token;
    const selectedReminder = props.selectedReminder;
    const setSelectedReminder = props.setSelectedReminder;

    const displayEditReminderModal = props.displayEditModal;
    const setDisplayEditReminderModal = props.setDisplayEditModal;
    
    const rawRemindersReference = React.useRef([]);
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        async function fetchReminders() {
            const data = await GetGoogleReminders(token, user.sub);
            let data_display = [];
            if (Array.isArray(data)) {
                data_display = data.map(item => {

                    let circle = document.createElement('i');
                    circle.className = 'fi fi-ss-circle';
                    circle.style.color = GooogleColors().find(c => c.value == item.colorId).color;
    
                    let obj = [
                        circle,
                        String(item.summary), 
                        SpanishDateString(item.start.dateTime, true), 
                        SpanishDateString(item.created),
                        ReminderButtonOptions(item.id, token, user.sub, setDisplayEditReminderModal),
                        item.id
                    ];
                    
                    return obj;
                });
            }
            // Aquí se actualiza el estado para los recordatorios visuales
            setReminders(data_display);
            // Aquí se actualiza el estado para los recordatorios crudos (originales)
            rawRemindersReference.current = data;
        }
        fetchReminders();
    }, [token, user.sub]);
    
    useEffect(() => {
        const btn = document.getElementById("add-reminder");
        if (btn) {
            btn.onclick = () => {
                props.setDisplay(true);
            };
        }
    }, []);

    let toolbar = document.createElement('div');
    toolbar.className = 'd-flex flex-row gap-2';
    toolbar.innerHTML = "<button id='add-reminder' class='btn-pink'><i class='fi fi-sr-square-plus'></i>Agregar recordatorio</button>";

    const options = {
        layout:{
            topStart: toolbar
        },
        columnDefs: [
            { targets: 0, width: '50px' },
            { targets: 2, width: '300px' },
            { targets: 3, width: '300px' },
            { targets: 4, width: '100px' }
        ],          
        lengthChange: false,
        language :{
            emptyTable: "No hay recordatorios creados.",
            entries: "Entradas",
            info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            infoEmpty: "Mostrando 0 a 0 de 0 entradas",
            infoFiltered: "(filtrado de _MAX_ entradas totales)",
            infoPostFix: "",
            decimal: ",",
            thousands: ".",
            lengthMenu: "Mostrar _MENU_ entradas",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: '<i class="fi fi-rr-search"></i>',
            searchPlaceholder: "",
            zeroRecords: "No se encontraron registros coincidentes",
            paginate: {
                first: '<i class="fi fi-rr-angle-double-small-left"></i>',
                last: '<i class="fi fi-rr-angle-double-small-right"></i>',
                next: '<i class="fi fi-rr-angle-small-right"></i>',
                previous: '<i class="fi fi-rr-angle-small-left"></i>'
            },
            aria: {
                orderable: "Ordenable",
                orderableReverse: "Ordenable inverso",
                orderableRemove: "Eliminar ordenable",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior",
                    number: "Número"
                }
            },
            url: ""
        },
        ordering: false,
        pagingType: 'full',
        info: false,
        rowCallback: function (row, data, index) {
            row.classList.add('tr-selectable');
            row.setAttribute('data-id', data[5]);

            const last_td = row.querySelector('td:last-child');
            if (last_td) {
                last_td.classList.add('td-options');
            }

            row.addEventListener('click', () => {
                // Quitar clase de cualquier fila seleccionada
                const table = row.closest('table');
                table.querySelectorAll('tr.tr-selected').forEach(tr => {
                    tr.classList.remove('tr-selected');
                    tr.querySelector('.td-options > div').classList.add('d-none');
                    tr.querySelector('.td-options > div').classList.remove('d-flex');
                });
        
                // Alternar clase seleccionada en esta fila
                row.classList.add('tr-selected');
                row.querySelector('.td-options > div').classList.remove('d-none');
                row.querySelector('.td-options > div').classList.add('d-flex');
        
                const reminder = rawRemindersReference.current.find(r => r.id === data[5]) ?? null;
                setSelectedReminder(reminder);
            });
        }        
    };

    DataTable.use(DT);

    return (
        <div id='reminders-panel' className="d-flex flex-row flex-grow-1 gap-3">
            <DataTable 
            id="reminder-table"      
            className="display" 
            options={options}
            data={reminders}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Recordatorio</th>
                        <th>Programado para...</th>
                        <th>Fecha de creación</th>
                        <th></th>
                    </tr>
                </thead>
            </DataTable>
            <RemindersDisplay 
            reminder={selectedReminder}
            user={user}/>
        </div>
    );
}