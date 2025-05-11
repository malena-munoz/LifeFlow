import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import * as bootstrap from 'bootstrap';
import { GetReminderInfoToEdit } from '../../services/Methods';
import { EditGoogleReminder } from '../../services/Google';
import { GooogleColors, Filter1Recurrency, Filter2Recurrency } from '../../services/Objects';
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Form, Button, ButtonGroup} from 'react-bootstrap';
import { Close, QueryBuilderOutlined, Circle, AddRounded, SaveRounded, InfoOutlined, HorizontalRuleRounded } from '@mui/icons-material'; 


export default function EditRemindersModal(props){
    // Datos del usuario
    const user = props.user;
    const token = props.token;
    const selectedReminder = props.selectedReminder;

    const [infoReminder, setInfoReminder] = useState(null);

    // ☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰
    //      PROPIEDADES DEL FORMULARIO
    // ☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰☰

    const [formTitle, set_FormTitle] = useState('');  // TITULO
    const [formLocation, set_FormLocation] = useState('');  // UBICACION
    const [formColor, set_FormColor] = useState('');  // COLOR
    const [formDescription, set_FormDescription] = useState('');  // DESCRIPCION
    const [formGuests, set_FormGuests] = useState([]);  // INVITADOS
    const [formDate, set_FormDate] = useState(new Date().toISOString().slice(0, 16));  // FECHA 
    const [formHours, set_FormHours] = useState(1);  // DURACION -> HORAS
    const [formMinutes, set_FormMinutes] = useState(0);  // DURACION -> MINUTOS
    const [displayFormFrequency, set_DisplayFormFrequency] = useState(false);  // VISTA DE LA FRECUENCIA
    const [formFrequency, set_FormFrequency] = useState('');  // FRECUENCIA
    const [formDaysWeek, set_FormDaysWeek] = useState([]);  // DIAS DE LA SEMANA
    const [formDurationFrequencyInfinite, set_FormDurationFrequencyInfinite] = useState(true);  // VISTA DE LA DURACION DE LA FRECUENCIA
    const [formDurationFrequency, set_FormDurationFrequency] = useState('');  // DURACION DE FRECUENCIA

    // Construir objeto recordatorio
    const buildReminder = () => {
        let end_date = new Date(formDate);
        end_date.setMinutes(end_date.getMinutes() + formMinutes + (formHours * 60));

        let reminder = {
            summary: formTitle,
            location: formLocation,
            description: formDescription,
            attendees: formGuests.map(f => ({email: f})),
            colorId: String(formColor),
            start: {
                dateTime: new Date(formDate).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            end: {
                dateTime: new Date(end_date).toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            reminders: {
                useDefault: false,
                overrides: [
                    {'method': 'popup', 'minutes': 10}
                ]
            },
        };

        if (displayFormFrequency) {;
            let recurrencia_string = `RRULE:FREQ=${formFrequency};`;

            if (formFrequency == 'WEEKLY' && formDaysWeek.length > 0) {
                recurrencia_string += `BYDAY=${String(formDaysWeek.join(", "))};`;
            }
            if (formDurationFrequencyInfinite == false) {
                recurrencia_string += `COUNT=${formDurationFrequency};`;
            }

            reminder.recurrence = [recurrencia_string];
        }
        EditGoogleReminder(selectedReminder.id, token, reminder, user.sub);
    }

    // Control del correo
    const handleEmail = (e) => {
        let add_guest = document.getElementById('add-guest');
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = regex.test(e);

        console.log("Input: ", e);
        
        if (valid) {
            add_guest.removeAttribute('disabled');
        } else {
            add_guest.setAttribute('disabled', '');

            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

            add_guest.setAttribute('data-bs-toggle', 'tooltip');
            add_guest.setAttribute('data-bs-placement', 'top');
            add_guest.setAttribute('data-bs-html', 'true');
            add_guest.setAttribute('data-bs-title', 'El correo no es válido para invitar.');
        }
    }

    // Control de los invitados
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
    
    // Cambio en el valor de frecuencia del formulario
    const toggleFrequency = function(e) {
        let dayweek = document.getElementById('filter-2-div');
        let selected_option = e;
        console.log(dayweek);
        set_FormFrequency(selected_option);

        if (selected_option === 'WEEKLY') {
            dayweek.classList.remove('d-none');
            dayweek.classList.add('d-flex');
        } else {
            dayweek.classList.add('d-none');
            dayweek.classList.remove('d-flex');
        }
    }

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
        toggleRecurrencyInfo(formFrequency);
    };

    const toggleRecurrencyInfo = function(e) {
        const current_frequency = e;
        toggleFrequency(current_frequency); 

        let info = document.getElementById('info-recurrency');

        let date = new Date(formDate);
        const date_hours = date.getHours().toString().padStart(2, '0');
        const date_minutes = date.getMinutes().toString().padStart(2, '0');
        const date_day = date.getDate().toString().padStart(2, '0');
        const date_month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses van de 0 a 11
        const date_year = date.getFullYear();

        let display_time = `${date_hours}:${date_minutes}`;
        let display_date = `${date_day}/${date_month}/${date_year}`;

        if (current_frequency == 'DAILY') {
            info.textContent = `A partir del ${display_date}, el recordatorio se repetirá diariamente a las ${display_time}.`;
        } else if (current_frequency == 'WEEKLY') {
            info.textContent = `A partir del ${display_date}, el recordatorio se repetirá semanalmente a las ${display_time} según los días seleccionados.`;
        } else {
            info.textContent = `A partir del ${display_date}, el recordatorio se repetirá mensualmente el día ${date_day} a las ${display_time}.`;
        }
    }

    const getOptionLabel = (e) => (
        <div className='d-flex align-items-center'>
            <Circle style={{ fill: e.color, fontSize: 20 }} />
            <span className='ms-2'>{e.label}</span>
        </div>
    );

    useEffect(() => {
        if (user && selectedReminder) {
            const reminderData = GetReminderInfoToEdit(user, selectedReminder);
            setInfoReminder(reminderData);
        }
    }, [user, selectedReminder]);

    useEffect(() => {
        if (infoReminder) {
            set_FormTitle(infoReminder.summary || '');
            set_FormLocation(infoReminder.location || '');
            set_FormColor(infoReminder.colorId || '');
            set_FormDescription(infoReminder.description || '');
            set_FormGuests(infoReminder.attendees || []);
            set_FormDate(infoReminder.start || new Date().toISOString().slice(0, 16));
            set_FormHours(infoReminder.hours || 1);
            set_FormMinutes(infoReminder.minutes || 0);
            set_DisplayFormFrequency(infoReminder.display_frequency || false);
            set_FormFrequency(infoReminder.frequency || '');
            set_FormDaysWeek(infoReminder.days_week || []);
            set_FormDurationFrequencyInfinite(infoReminder.frequency_infinite || true);
            set_FormDurationFrequency(infoReminder.count || '');

            console.log("INFO REMINDER", infoReminder);
        }
    }, [infoReminder]);


    return (
        <Modal show={props.display} centered='true' dialogClassName='modal-xl modal-dialog-scrollable'>
            {/* ---------------------------------------------------------------- */}
            <ModalHeader>
                <ModalTitle>Editar recordatorio '{formTitle}'</ModalTitle>
                <Close onClick={() => props.setDisplay(false)}/>
            </ModalHeader>
            {/* ---------------------------------------------------------------- */}
            <ModalBody>
                <Form id="form-create-reminder">

                    {/* --- TITULO ------------------------------------------------------------- */}
                    <Form.Group controlId="title" className='d-flex flex-column'>
                        <Form.Label className='mb-2'>Título</Form.Label>
                        <Form.Control 
                        defaultValue={formTitle}
                        type='text' 
                        placeholder='Escribe un título'
                        onChange={(e) => set_FormTitle(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    {/* --- COLOR ------------------------------------------------------------- */}
                    <Form.Group controlId="color" className='d-flex flex-column'>
                        <Form.Label className='mb-2'>Color del evento</Form.Label>
                        <Select
                            options={GooogleColors()}
                            getOptionLabel={getOptionLabel}
                            isSearchable={false}
                            defaultValue={formColor}
                            id='color-picker'
                            placeholder="Selecciona un color"
                            noOptionsMessage={() => "No hay opciones"}
                            loadingMessage={() => "Cargando..."}
                            onChange={(e) => set_FormColor(e.value)}
                        />
                    </Form.Group>

                    {/* --- UBICACION ------------------------------------------------------------- */}
                    <Form.Group controlId="location" className='d-flex flex-column'>
                        <Form.Label className='mb-2'>Ubicación</Form.Label>
                        <Form.Control 
                        defaultValue={formLocation}
                        type='text' 
                        placeholder='Escribe una ubicación donde dará lugar el recordatorio (casa, oficina, centro de salud...)'
                        onChange={(e) => set_FormLocation(e.target.value)}></Form.Control>
                    </Form.Group>

                    {/* --- DESCRIPCION ------------------------------------------------------------- */}
                    <Form.Group controlId="description" className='d-flex flex-column'>
                        <Form.Label className='mb-2'>Descripción</Form.Label>
                        <Form.Control 
                        id="description" 
                        as='textarea' 
                        defaultValue={formDescription}
                        placeholder='Escribe un texto que describa el evento.' multiline
                        onChange={(e) => set_FormDescription(e.target.value)}/>
                    </Form.Group>

                    {/* --- INVITADOS ------------------------------------------------------------- */}
                    <Form.Group controlId="guests" className='d-flex flex-column'>
                        <Form.Label className='mb-2'>Invitados</Form.Label>
                        <div class="input-group">
                            <input type="text" 
                            class="form-control" 
                            onInput={(e) => handleEmail(e.target.value)} 
                            placeholder="Escriba los correos invitados al evento." 
                            aria-describedby="add-guest" id='guest'/>
                            <button 
                            disabled
                            class="btn icon-btn blue-icon" 
                            type="button" 
                            id="add-guest" 
                            onClick={() => handleGuests()}><AddRounded/></button>
                        </div>
                        <div className='d-flex flex-row flex-wrap gap-2 mt-2' id='guest-list'>
                            {formGuests !== undefined ?
                                formGuests.length > 0 ?
                                    formGuests.map((att) => {
                                    return <span className='new-guest btn-pink'>
                                        {att}
                                        <i className="fi fi-rr-cross" onClick={(e) => {
                                            e.target.parentElement.remove();
                                            toggleGuests(att);
                                        }}></i>
                                    </span>
                                })
                                :
                                <></>
                            : 
                                <></>
                            }
                        </div>
                    </Form.Group>

                    {/* --- INICIO + DURACION ------------------------------------------------------------- */}
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
                                min={1} max={23} defaultValue={formHours} 
                                className='time-picker' onChange={(e) => set_FormHours(parseInt(e.target.value))}></Form.Control>
                                <span>h</span>
                                <Form.Control id='minutes' type='number' 
                                min={0} max={45} step={15} defaultValue={formMinutes} 
                                className='time-picker' onChange={(e) => set_FormMinutes(parseInt(e.target.value))}></Form.Control>
                                <span>min</span>
                            </div>
                        </div>
                    </Form.Group>

                    {/* --- RECURRENCIA ------------------------------------------------------------- */}
                    <Form.Group controlId="recurrency" className='d-flex flex-column gap-2'>
                        <div className='d-flex flex-row align-items-center gap-2'>
                            <input className="form-check-input m-0" type="checkbox" 
                            value="" id="check-recurrency" 
                            onChange={() => set_DisplayFormFrequency((prevSelected) => prevSelected == true ? false : true)}/>
                            <Form.Label className='m-0'>¿El recordatorio se va a repetir?</Form.Label>
                        </div>
                        <div className={`flex-column align-items-start gap-3
                            ${displayFormFrequency ? 'd-flex' : 'd-none'}`}>
                            <select id='filter-1-recurrency' className='form-control form-select' defaultValue={formFrequency}
                            onChange={(e) => {toggleRecurrencyInfo(e.target.value);}}>
                                {Filter1Recurrency().map((opt) => (
                                    <option value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <div className='sub-input d-flex flex-column gap-2'>
                                <Form.Label className='m-0'>¿Cuántas veces quieres que se repita el recordatorio?</Form.Label> 
                                <div className='d-flex flex-row align-items-center gap-2'>
                                    <input className="form-check-input m-0" type="checkbox" 
                                    value="" id="check-count" checked={formDurationFrequencyInfinite}
                                    onChange={() => set_FormDurationFrequencyInfinite((prevSelected) => prevSelected == true ? false : true)}/>
                                    <span>Indefinido</span>
                                    <div className={`gap-2 align-items-center ${formDurationFrequencyInfinite ? 'd-none' : 'd-flex'}`}>
                                        <HorizontalRuleRounded/>
                                        <Form.Control id='hours' type='number' 
                                        min={1} defaultValue={formDurationFrequency} 
                                        className='time-picker' onChange={(e) => set_FormDurationFrequency(parseInt(e.target.value))}>
                                        </Form.Control>
                                        <span>días</span>
                                    </div>
                                </div>
                            </div>
                            <div id='filter-2-div' 
                            className={`flex-column align-items-start gap-2 sub-input ${formFrequency === 'WEEKLY' ? 'd-flex' : 'd-none'}`}> 
                                <Form.Label className='m-0'>¿Cada cuántos días se repite?</Form.Label>                  
                                <ButtonGroup>
                                    {Filter2Recurrency().map((opt) => (
                                        <Button className={`${formDaysWeek.includes(opt.value) ? 'selected' : ''}`}
                                        onClick={(e) => {toggleSelectedDays(e.target);}} 
                                        variant="secondary" 
                                        value={opt.value}>{opt.label}</Button>
                                    ))}
                                </ButtonGroup>
                            </div>
                            <span id='info-recurrency' className='d-flex align-items-center gap-2 txt-azul-oscuro'><InfoOutlined/> El recordatorio se repetirá cada ... días.</span>
                        </div>
                    </Form.Group>
                    
                </Form>
            </ModalBody>
            {/* ---------------------------------------------------------------- */}
            <ModalFooter>
                <i className='icon-btn success-icon' onClick={() => buildReminder()}>
                    <div className='d-flex align-items-center text-white gap-2 fst-normal'>
                        <SaveRounded/> Guardar recordatorio
                    </div>
                </i>
            </ModalFooter>
            {/* ---------------------------------------------------------------- */}
        </Modal>
    );
}