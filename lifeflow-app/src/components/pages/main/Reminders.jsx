// REACT
import React, { useEffect, useState } from 'react';
// Componentes
import { GooogleColors, Filter1Recurrency, Filter2Recurrency } from '../../logic/Objects';
import { GoogleCalendarObject } from '../../logic/Google';
import Select from 'react-select';
// BS 
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// DATATABLE
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
// ICONOS
import { DeleteForever, Edit, Close, Circle, QueryBuilderOutlined, AddRounded, SaveRounded, InfoOutlined } from '@mui/icons-material'; 




export default function Reminders(props) {
    // Objeto de evento o recordatorio
    const [event, setEvent] = useState(GoogleCalendarObject);
    // Estado de modal de creación, por defecto está oculto
    const [displayCreateReminderModal, setDisplayCreateReminderModal] = useState(false);
    // Inputs de formulario
    const [formTitle, set_FormTitle] = useState('');  // TITULO
    const [formLocation, set_FormLocation] = useState('');  // UBICACION
    const [formColor, set_FormColor] = useState('');  // COLOR
    const [formDescription, set_FormDescription] = useState('');  // DESCRIPCION
    const [formGuests, set_FormGuests] = useState([]);  // INVITADOS
    const [formDate, set_FormDate] = useState('');  // FECHA 
    const [formHours, set_FormHours] = useState('');  // DURACION -> HORAS
    const [formMinutes, set_FormMinutes] = useState('');  // DURACION -> MINUTOS
    const [formFrequency, set_FormFrequency] = useState('');  // FRECUENCIA
    const [formDaysWeek, set_FormDaysWeek] = useState([]);  // DIAS DE LA SEMANA

    const [currentDateTime, setCurrentDateTime] = useState('');
    const [selectedInputs, setSelectedInputs] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [frequency, setFrequency] = useState('');

    const toggleSelectedInput = (e) => {
        let id = e.getAttribute('id');
        
        setSelectedInputs((prevSelected) => {
            if (prevSelected.includes(id)) {
                // Si ya está, lo quitamos
                return prevSelected.filter((v) => v !== id);
            } else {
                // Si no está, lo agregamos
                return [...prevSelected, id];
            }
        });
    };

    // Cambio en el valor de días de la semana seleccionados
    const toggleSelectedDays = (e) => {
        let value = e.getAttribute('value');
        
        set_FormDaysWeek((prevSelected) => {
            if (prevSelected.includes(value)) {
                e.classList.remove('selected');
                // Si ya está, lo quitamos
                return prevSelected.filter((v) => v !== value);
            } else {
                e.classList.add('selected');
                // Si no está, lo agregamos
                return [...prevSelected, value];
            }
        });

        toggleRecurrencyInfo();
    };

    // Cambio en el valor de invitados
    const toggleGuests = (e) => {
        let value = e;
        
        set_FormGuests((prevSelected) => {
            if (prevSelected.includes(value)) {
                // Si ya está, lo quitamos
                return prevSelected.filter((v) => v !== value);
            } else {
                // Si no está, lo agregamos
                return [...prevSelected, value];
            }
        });
    };

    // Cambio en el valor de frecuencia del formulario
    const toggleFrequency = function(e) {
        let dayweek = document.getElementById('filter-2-div');
        let selected_option = e.value;
        set_FormFrequency(selected_option);

        if (selected_option === 'WEEKLY') {
            dayweek.classList.remove('d-none');
            dayweek.classList.add('d-flex');
        } else {
            dayweek.classList.add('d-none');
            dayweek.classList.remove('d-flex');
        }
    }

    const toggleRecurrencyInfo = function() {
        let info = document.getElementById('info-recurrency');

        let date = new Date(formDate);
        const date_hours = date.getHours().toString().padStart(2, '0');
        const date_minutes = date.getMinutes().toString().padStart(2, '0');
        const date_day = date.getDate().toString().padStart(2, '0');
        const date_month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses van de 0 a 11
        const date_year = date.getFullYear();

        let days_week = document.querySelectorAll('#filter-2-div .btn.selected');
        let days_groupby = formDaysWeek.join(', ');
        console.log(formFrequency);
        if (formFrequency == 'DAILY') {
            info.textContent = `El recordatorio se repetirá diariamente a las ${date_hours}:${date_minutes}, a partir del ${date_day}/${date_month}/${date_year} a las ${date_hours}:${date_minutes}`;
        } else if (formFrequency == 'WEEKLY') {
            info.textContent = `El recordatorio se repetirá los días ${days_groupby} a las ${date_hours}:${date_minutes}, a partir del ${date_day}/${date_month}/${date_year} a las ${date_hours}:${date_minutes}`;
        } else {
            info.textContent = `El recordatorio se repetirá mensualmente cada ${date_day} a las ${date_hours}:${date_minutes}, a partir del ${date_day}/${date_month}/${date_year} a las ${date_hours}:${date_minutes}`;
        }
    }

    const handleGuests = () => {    
        let guest = document.getElementById("guest");
        let guest_list = document.getElementById("guest-list");
        toggleGuests(guest.value);

        if(guest && guest_list) {
            let btn = document.createElement('span');
            btn.className = 'new-guest btn-pink';
            btn.innerHTML = guest.value + '<i class="fi fi-rr-cross"></i>';
            btn.onclick = function(){
                this.remove();
                toggleGuests(guest.value);
            };

            guest_list.appendChild(btn);
            guest.value = null;
        }
    };

    DataTable.use(DT);

    let toolbar = document.createElement('div');
    toolbar.className = 'd-flex flex-row gap-2';
    toolbar.innerHTML = "<button id='add-reminder' class='btn-pink'><i class='fi fi-sr-square-plus'></i>Agregar recordatorio</button>";
    
    
    useEffect(() => {
        const btn = document.getElementById("add-reminder");
        if (btn) {
            btn.onclick = () => {
            setDisplayCreateReminderModal(true);
            };
        }

        const now = new Date();
        const formattedDateTime = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
        setCurrentDateTime(formattedDateTime);
    }, []);

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
            <Circle style={{ fill: e.color, fontSize: 20 }} />
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
                                    <i className='icon-btn edit-icon'><Edit/></i>
                                    <i className='icon-btn delete-icon'><DeleteForever/></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </DataTable>
                <section id="reminder-editor">

                </section>
            </div>
            {/* ----- CREAR MODAL ----- */}
            <Modal show={displayCreateReminderModal} centered='true' dialogClassName='modal-xl modal-dialog-scrollable'>
                <ModalHeader>
                    <ModalTitle>Crear recordatorio</ModalTitle>
                    <Close onClick={() => setDisplayCreateReminderModal(false)}/>
                </ModalHeader>
                <ModalBody>
                    <Form id="form-create-reminder">
                        <Form.Group controlId="title" className='d-flex flex-column'>
                            <Form.Label className='mb-2'>Título</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='Escribe un título'
                            onChange={(e) => set_FormTitle(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="color" className='d-flex flex-column'>
                            <Form.Label className='mb-2'>Color del evento</Form.Label>
                            <Select
                                options={GooogleColors()}
                                getOptionLabel={getOptionLabel}
                                isSearchable={false}
                                id='color-picker'
                                placeholder="Selecciona un color"
                                noOptionsMessage={() => "No hay opciones"}
                                loadingMessage={() => "Cargando..."}
                                onChange={(e) => set_FormColor(e.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="location" className='d-flex flex-column'>
                            <Form.Label className='mb-2'>Ubicación</Form.Label>
                            <Form.Control 
                            type='text' 
                            placeholder='Escribe una ubicación donde dará lugar el recordatorio (casa, oficina, centro de salud...)'
                            onChange={(e) => set_FormLocation(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description" className='d-flex flex-column'>
                            <Form.Label className='mb-2'>Descripción</Form.Label>
                            <Form.Control 
                            id="description" 
                            as='textarea' 
                            placeholder='Escribe un texto que describa el evento.' multiline
                            onChange={(e) => set_FormDescription(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="guests" className='d-flex flex-column'>
                            <Form.Label className='mb-2'>Invitados</Form.Label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Escriba los correos invitados al evento." aria-describedby="add-guest" id='guest'/>
                                <button class="btn icon-btn blue-icon" type="button" id="add-guest" onClick={handleGuests}><AddRounded/></button>
                            </div>
                            <div className='d-flex flex-row flex-wrap gap-2 mt-2' id='guest-list'></div>
                        </Form.Group>
                        <Form.Group controlId="daterange" className='d-flex flex-column'>
                            <Form.Label className='mb-2'>Duración del evento:</Form.Label>
                            <div className='d-flex flex-row align-items-center gap-3'>
                                <Form.Control 
                                id='start-date' 
                                type='datetime-local' 
                                min={formDate}
                                value={formDate}
                                onChange={(e) => set_FormDate(e.target.value)}
                                ></Form.Control>
                                <div className='d-flex align-items-center gap-2'>
                                    <QueryBuilderOutlined/>
                                    <Form.Control id='hours' type='number' 
                                    min={1} max={23} defaultValue={1} 
                                    className='time-picker' onChange={(e) => set_FormHours(e.target.value)}></Form.Control>
                                    <span>h</span>
                                    <Form.Control id='minutes' type='number' 
                                    min={0} max={45} step={15} defaultValue={0} 
                                    className='time-picker' onChange={(e) => set_FormMinutes(e.target.value)}></Form.Control>
                                    <span>min</span>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="recurrency" className='d-flex flex-column gap-2'>
                            <div className='d-flex flex-row align-items-center gap-2'>
                                <input className="form-check-input m-0" type="checkbox" 
                                value="" id="check-recurrency" onChange={(e) => toggleSelectedInput(e.target)}/>
                                <Form.Label className='m-0'>¿El recordatorio se va a repetir?</Form.Label>
                            </div>
                            <div className={`flex-column align-items-start gap-3
                                ${selectedInputs.includes('check-recurrency') ? 'd-flex' : 'd-none'}`}>
                                <select id='filter-1-recurrency' className='form-control form-select' 
                                onChange={(e) => {toggleFrequency(e.target);  toggleRecurrencyInfo();}}>
                                    {Filter1Recurrency().map((opt) => (
                                        <option value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                <div id='filter-2-div' 
                                className={`flex-column align-items-start gap-2 sub-input ${frequency === 'WEEKLY' ? 'd-flex' : 'd-none'}`}> 
                                    <Form.Label className='m-0'>¿Cada cuántos días se repite?</Form.Label>                  
                                    <ButtonGroup>
                                        {Filter2Recurrency().map((opt) => (
                                            <Button onClick={(e) => {toggleSelectedDays(e.target);}} variant="secondary" value={opt.value}>{opt.label}</Button>
                                        ))}
                                    </ButtonGroup>
                                </div>
                                <span id='info-recurrency' className='d-flex align-items-center gap-2 txt-azul-oscuro'><InfoOutlined/> El recordatorio se repetirá cada ... días.</span>
                            </div>
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter><i className='icon-btn success-icon'><div className='d-flex align-items-center text-white gap-2 fst-normal'><SaveRounded/>Guardar recordatorio</div></i></ModalFooter>
            </Modal>
        </article>
    );
}