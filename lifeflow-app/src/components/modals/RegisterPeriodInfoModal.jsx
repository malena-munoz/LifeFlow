import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import * as bootstrap from 'bootstrap';
import { GuardarDatosCicloBase } from "../../services/UsuarioServices";
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Form } from 'react-bootstrap';
import { InfoOutlined, SaveRounded } from '@mui/icons-material'; 
import { GetDaysOfPreviousMonth } from '../../services/Methods';
import { Notyf } from 'notyf';

export default function ResgisterPeriodInfoModal(props) {
    // Inicialización de objetos
    let notyf = new Notyf();

    // Datos del usuario
    const user = props.user;
    const token = props.token;

    // Visibilidad del modal
    const display = props.display;
    const setDisplay = props.setDisplay;

    // Valores de la última menstruacion
    const [periodDay, setPeriodDay] = useState(1);
    const [periodDuration, setPeriodDuration] = useState(1);
    const [cycleDuration, setCycleDuration] = useState("regular");

    
    const opcionesDuracionCiclo = [
        { value: 'corto', label: 'Menor de 26 días' },
        { value: 'regular', label: 'Entre 26 y 30 días' },
        { value: 'largo', label: 'Más de 30 días' },
    ];

    const buildLastPeriodInfo = function() {
        let ciclo = {
            DiaInicioCiclo: periodDay,
            DuracionMenstruacion: periodDuration,
            DuracionCiclo: cycleDuration
        };
        GuardarDatosCicloBase(user.sub, user.given_name, user.family_name, ciclo);
    };

    return (
        <Modal show={display} centered='true' dialogClassName='modal-xl modal-dialog-scrollable'>
            <ModalHeader>
                <ModalTitle>¡Bienvenido a Lifeflow, {user.given_name.trim()}!</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form className='d-flex flex-column gap-3'>
                    <span className='d-flex align-items-center gap-2 txt-azul-oscuro'>
                        <InfoOutlined/> 
                        Antes de poder acceder a la aplicación, necesitamos obtener los datos de la menstruación del último mes. Si no menstruaste, indica los valores más aproximados a la realidad.
                    </span>
                    <Form.Group controlId="period-day" className='d-flex flex-column'>
                        <Form.Label>¿Cuándo fue el día que empezó tu menstruación del último mes?</Form.Label>
                        <Form.Control 
                        type='number' 
                        min={1}
                        defaultValue={periodDay}
                        max={GetDaysOfPreviousMonth()}
                        onChange={(e) => setPeriodDay(parseInt(e.target.value))}
                        placeholder='Introduce el día de la menstruación del último mes.'>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="period-duration" className='d-flex flex-column'>
                        <Form.Label>¿Cuántos días duró tu última menstruación?</Form.Label>
                        <Form.Control 
                        type='number' 
                        min={1}
                        defaultValue={periodDuration}
                        onChange={(e) => setPeriodDuration(parseInt(e.target.value))}
                        placeholder='Introduce la duración de la menstruación del último mes.'>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="cycle-duration" className='d-flex flex-column'>
                        <Form.Label>¿Cuántos días suele durar tu ciclo menstrual?</Form.Label>
                        <Select
                            options={opcionesDuracionCiclo}
                            defaultValue={opcionesDuracionCiclo.find(o => o.value == cycleDuration)}
                            onChange={(e) => setCycleDuration(e.target)}
                            placeholder="Selecciona duración del ciclo"
                        />
                    </Form.Group>
                </Form>
            </ModalBody>
            <ModalFooter>
                <i className='icon-btn success-icon' onClick={() => buildLastPeriodInfo()}>
                    <div className='d-flex align-items-center text-white gap-2 fst-normal'>
                        <SaveRounded/> Guardar datos
                    </div>
                </i>
            </ModalFooter>
        </Modal>
    );
}