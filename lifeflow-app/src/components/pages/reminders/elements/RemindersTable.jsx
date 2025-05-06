import React, { useEffect, useState } from 'react';
import { GetGoogleReminders } from '../../../logic/Google';
import { GooogleColors } from '../../../logic/Objects';
import { SpanishDateString } from '../../../logic/Methods';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import * as bootstrap from 'bootstrap';
import RemindersDisplay from './RemindersDisplay';


export default function RemindersTable(props){
    const user = props.user;
    const token = props.token;
    
    const [reminders, setReminders] = useState([]);
    useEffect(() => {
        async function fetchReminders() {
            const data = await GetGoogleReminders(token, user.sub);
            console.log(data);
            const data_display = data.map(item => {
                let btns = document.createElement('div');
                btns.className = 'd-flex justify-content-center gap-2';
                btns.innerHTML = "<i class='icon-btn edit-icon'><i class='fi fi-rr-pen-clip'></i></i><i class='icon-btn delete-icon'><i class='fi fi-rr-trash'></i></i>";

                let circle = document.createElement('i');
                circle.className = 'fi fi-ss-circle';
                circle.style.color = GooogleColors().find(c => c.value == item.colorId).color;

                let obj = [
                    circle,
                    item.summary, 
                    SpanishDateString(item.start.dateTime, true), 
                    SpanishDateString(item.created),
                    btns
                ];

                return obj;
            });

            setReminders(data_display);
            console.log(data_display);
        }
        fetchReminders();
    }, [token, user.sub]);

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
            emptyTable: "No hay datos disponibles en la tabla",
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
        info: false
    };

    useEffect(() => {
        const btn = document.getElementById("add-reminder");
        if (btn) {
            btn.onclick = () => {
                props.setDisplay(true);
            };
        }
    }, []);

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
            <RemindersDisplay/>
        </div>
    );
}