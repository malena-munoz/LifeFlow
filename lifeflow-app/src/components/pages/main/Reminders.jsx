// REACT
import React, { useEffect, useRef, useState } from 'react';
// Componentes
import { GooogleColors } from '../../logic/Objects';
import Select from 'react-select';
// BS
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Form from 'react-bootstrap/Form';
// DATATABLE
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
// ICONOS
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';


export default function Reminders(props) {
    const[selectedColor, setSelectedColor] = useState(null);
    DataTable.use(DT);

    let toolbar = document.createElement('div');
    toolbar.className = 'd-flex flex-row gap-2';
    toolbar.innerHTML = "<button id='add-reminder' class='btn-pink'><i class='fi fi-sr-square-plus'></i>Agregar recordatorio</button>";
    
    const options = {
        layout:{
            topStart: toolbar
        },
        columnDefs: [
            { targets: 1, width: '300px' },
            { targets: 2, width: '300px' },
            { targets: 3, width: '100px' }
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
      
    const getOptionLabel = (e) => (
        <div className='d-flex align-items-center'>
            <CircleIcon style={{ fill: e.color, fontSize: 20 }} />
            <span className='ms-2'>{e.label}</span>
        </div>
    );

    return(
        <article page="reminders">
            {/* ----- TITULO ----- */}
            <div className="d-flex flex-row gap-4 align-items-center">
                <h1>Recordatorios</h1>
            </div>
            {/* ----- TABLA Y DETALLES DE RECORDATORIOS ----- */}
            <div id='reminders-panel' className="d-flex flex-row flex-grow-1 gap-3">
                <DataTable 
                id="reminder-table"      
                className="display" 
                options={options}>
                    <thead>
                        <tr>
                            <th>Recordatorio</th>
                            <th>Programado para...</th>
                            <th>Fecha de creación</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Recordatorio 1
                            </td>
                            <td>
                                Cada 1 día
                            </td>
                            <td>
                                17/04/2025
                            </td>
                            <td>
                                <div className='d-flex justify-content-center gap-2'>
                                    <i className='icon-btn edit-icon'><EditIcon/></i>
                                    <i className='icon-btn delete-icon'><DeleteForeverIcon/></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </DataTable>
                <section id="reminder-editor">

                </section>
            </div>
            {/* ----- CREAR MODAL ----- */}
            <Modal show={true} centered='true' dialogClassName='modal-xl modal-dialog-scrollable'>
                <ModalHeader>
                    <ModalTitle>Crear recordatorio</ModalTitle>
                    <CloseIcon/>
                </ModalHeader>
                <ModalBody>
                    <Form id="form-create-reminder">
                        <Form.Group controlId="title" className='d-flex flex-column'>
                            <Form.Label>Título del recordatorio</Form.Label>
                            <Form.Control type="text" placeholder="Escribe un título para el recordatorio" />
                        </Form.Group>
                        <Form.Group controlId="description" className='d-flex flex-column'>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" />
                        </Form.Group>
                        <Form.Group controlId="color" className='d-flex flex-column'>
                            <Form.Label>Color del evento</Form.Label>
                            <Select
                                options={GooogleColors()}
                                getOptionLabel={getOptionLabel}
                                isSearchable={false}
                                id='color-picker'
                                placeholder="Selecciona un color"
                                noOptionsMessage={() => "No hay opciones"}
                                loadingMessage={() => "Cargando..."}
                            />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>This is the footer</ModalFooter>
            </Modal>
        </article>
    );
}