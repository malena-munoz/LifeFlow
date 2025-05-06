import React, { useEffect, useState } from 'react';
import { Circle, LocationOn } from '@mui/icons-material';
import * as bootstrap from 'bootstrap';

export default function RemindersDisplay(props){
    const [displayTitle, set_DisplayTitle] = useState('???');  // TITULO
    const [displayLocation, set_DisplayLocation] = useState('???');  // UBICACION
    const [displayColor, set_DisplayColor] = useState('#000000');  // COLOR
    const [displayDescription, set_DisplayDescription] = useState('');  // DESCRIPCION
    const [displayGuests, set_DisplayGuests] = useState([]);  // INVITADOS
    const [displayDate, set_DisplayDate] = useState(new Date().toISOString().slice(0, 16));  // FECHA 
    const [displayHours, set_DisplayHours] = useState(1);  // DURACION -> HORAS
    const [displayMinutes, set_DisplayMinutes] = useState(0);  // DURACION -> MINUTOS
    const [displayFrequency, set_DisplayFrequency] = useState('');  // FRECUENCIA
    const [displayDaysWeek, set_DisplayDaysWeek] = useState([]);  // DIAS DE LA SEMANA

    return (
        <section id="reminder-editor" className='d-flex flex-column gap-3 p-5'>
            <div className="d-flex align-items-center gap-3">
                <Circle htmlColor={displayColor}/>
                <h2>{displayTitle}</h2>
            </div>
            <div className="d-flex align-items-center gap-3">
                <LocationOn className='icon-btn--single location-icon'/>
                <span className='property-label'>Localización:</span>
                <h4>{displayLocation}</h4>
            </div>
            <hr></hr>
            <div className="d-flex align-items-center gap-3">
                <span className='property-label'>Descripción:</span>
                <p>{displayDescription}</p>
            </div>
        </section>
    );
}