import { CalendarObject, Days, IsCurrentDay, CurrentDate } from "../../services/DateTimeService";
import { Emotions, BodyParts, Symptoms, FemFluid } from "../../services/Objects";
import { useState, useMemo, useEffect } from "react";
import { HorizontalRuleRounded, Circle } from '@mui/icons-material';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { SpanishDateString, GetGoogleColorById } from '../../services/Methods'; 
import { DiasDeSangrado, EsDiaDeSangrado, ClaseSangrado } from "../../services/CicloService";

export default function Calendar (props) {

    // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    //  Variables para acceso a datos
    // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

    const calendar_obj = props.calendarObj;
    const mesSeleccionado = props.mesSeleccionado;
    const setMesSeleccionado = props.setMesSeleccionado;
    const setEstadoSangradoDia = props.setEstadoSangradoDia;

    const datoDia = props.dia;
    const setDatoDia = props.setDia;
    const datoMes = props.mes;
    const setDatoMes = props.setMes;
    const datoAnio = props.anio;
    const setDatoAnio = props.setAnio;

    const informacionDiaria = props.informacionDiaria;

    const ciclos = props.ciclos;
    const sangrados = props.sangrados;

    const Calendar_CompararMesSeleccionado = (fecha) => {
        return (
            mesSeleccionado.mes === fecha
        ) ? 'selected' : '';
    };  

    const Calendar_ControlarMesSeleccionado = function(obj) {
        setMesSeleccionado(obj);
        try {
            const days = document.querySelectorAll('.day:not(.day--disabled)');
            days.forEach(d => {
                if (d && d.classList && typeof d.classList.remove === 'function') {
                    d.classList.remove('day-selected');
                }
            });
        } catch (error) {
            console.error('Error al limpiar días seleccionados:', error);
        }
    }

    const Calendar_EsDiaSeleccionado = function(var_anio, var_mes, var_dia) {
        let mismoDia = var_dia === datoDia;
        let mismoMes = var_mes === datoMes;
        let mismoAnio = var_anio === datoAnio;
        return mismoDia && mismoMes && mismoAnio ? true : false;
    }

    const Calendar_NuevoDiaSeleccionado = function(dia_obj, nuevo_anio, nuevo_mes, nuevo_dia) {
        setDatoDia(nuevo_dia);
        setDatoMes(nuevo_mes);
        setDatoAnio(nuevo_anio);
        document.querySelectorAll('.day').forEach(d => d.classList.remove('day-selected'));
        dia_obj.classList.add('day-selected');
        let dia_tarde = new Date(CurrentDate(nuevo_dia, Number(nuevo_mes+1), nuevo_anio)) > new Date();
        let sangrado = dia_obj.querySelector('.day-number').classList.contains('day-period') ||
            dia_obj.querySelector('.day-number').classList.contains('day-period--estimated');
        setEstadoSangradoDia(dia_tarde ? null : sangrado);
    }

    const Calendar_TieneInformacionDiaria = function(var_anio, var_mes, var_dia) {
        if (informacionDiaria !== null && informacionDiaria !== undefined) {
            let existe = informacionDiaria.find(i => i.fecha == CurrentDate(var_dia, var_mes, var_anio));
            return existe !== null && existe !== undefined ? existe : null;
        }     
        return null;
    }

    useEffect(() => {
        // Selecciona el día actual y le agrega la clase day-selected
        const currentDay = document.querySelector('.day--current');
        if (currentDay) {
            Calendar_NuevoDiaSeleccionado(currentDay, mesSeleccionado.anio, mesSeleccionado.mes, currentDay.textContent);
        }
    }, []);

    const popoverInformacionDiaria = (info) => {
        let emociones = info.emociones
        .map(id => Emotions().find(e => e.id === Number(id))) 
        .filter(e => e !== undefined).map(e => e.label).join(", "); 
        
        let molestias = info.molestias
        .map(id => BodyParts().find(e => e.id === Number(id))) 
        .filter(e => e !== undefined).map(e => e.label).join(", ");  

        let sintomas = info.sintomas
        .map(id => Symptoms().find(e => e.id === Number(id))) 
        .filter(e => e !== undefined).map(e => e.label).join(", "); 

        let fluido = info.fluidoFemenino
        .map(id => FemFluid().find(e => e.id === Number(id))) 
        .filter(e => e !== undefined).map(e => e.label).join(", "); 

        return (
            <Popover>
                <Popover.Body className="d-flex flex-column gap-2">
                    <strong className="txt-rosa-oscuro">{SpanishDateString(info.fecha)}</strong>
                    <hr className="separator my-2"></hr>
                    <div className="d-flex flex-column gap-2">
                        <p className="m-0">
                            <span className="fw-bold txt-azul-oscuro">Emociones: </span>
                            {emociones !== "" ? emociones : <span className="text-danger fw-bold">No hay emociones registradas.</span>}
                        </p>
                        <p className="m-0">
                            <span className="fw-bold txt-azul-oscuro">Molestias: </span>
                            {molestias !== "" ? molestias : <span className="text-danger fw-bold">No hay molestias registradas.</span>}
                        </p>
                        <p className="m-0">
                            <span className="fw-bold txt-azul-oscuro">Síntomas: </span>
                            {sintomas !== "" ? sintomas : <span className="text-danger fw-bold">No hay sintomas registrados.</span>}
                        </p>
                        <p className="m-0">
                            <span className="fw-bold txt-azul-oscuro">Fluido femenino: </span>
                            {fluido !== "" ? fluido : <span className="text-danger fw-bold">No hay fluido femenino registrado.</span>}
                        </p>
                        <p className="m-0">
                            <span className="fw-bold txt-azul-oscuro">Prueba de embarazo: </span>
                            {info.pruebaEmbarazo}
                        </p>
                        <p className="m-0">
                            <span className="fw-bold txt-azul-oscuro">Notas: </span>
                            {info.notas !== "" ? info.notas : <span className="text-danger fw-bold">No hay nota escrita.</span>}
                        </p>
                    </div>
                </Popover.Body>
            </Popover>
        )
    };


    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="d-flex justify-content-center align-items-end">
                    <span className={`month ${Calendar_CompararMesSeleccionado(calendar_obj.anterior.mes)}`} 
                    onClick={() => Calendar_ControlarMesSeleccionado(calendar_obj.anterior)} 
                    month={calendar_obj.anterior.mes}>
                        {calendar_obj.anterior.nombre} 
                        <span className="year"> {calendar_obj.anterior.anio}</span>
                    </span>
                    <HorizontalRuleRounded />
                    <span className={`month ${Calendar_CompararMesSeleccionado(calendar_obj.actual.mes)}`} 
                    onClick={() => Calendar_ControlarMesSeleccionado(calendar_obj.actual)} 
                    month={calendar_obj.actual.mes}>
                        {calendar_obj.actual.nombre} 
                        <span className="year"> {calendar_obj.actual.anio}</span>
                    </span>
                    <HorizontalRuleRounded />
                    <span className={`month ${Calendar_CompararMesSeleccionado(calendar_obj.siguiente.mes)}`}
                    onClick={() => Calendar_ControlarMesSeleccionado(calendar_obj.siguiente)} 
                    month={calendar_obj.siguiente.mes}>
                        {calendar_obj.siguiente.nombre} 
                        <span className="year"> {calendar_obj.siguiente.anio}</span>
                    </span>
                </div>       
            </div>
            <div className="calendar">
                <span className="day-name">Lunes</span>
                <span className="day-name">Martes</span>
                <span className="day-name">Miércoles</span>
                <span className="day-name">Jueves</span>
                <span className="day-name">Viernes</span>
                <span className="day-name">Sábado</span>
                <span className="day-name">Domingo</span>               
                {Days(mesSeleccionado).map((day, index) => (    
                    day == 0 ? 
                    (
                        <div key={index} className="day day--disabled"></div>
                    ) 
                    : 
                    (
                        <div key={index}
                        onClick={(e) => Calendar_NuevoDiaSeleccionado(e.currentTarget, mesSeleccionado.anio, mesSeleccionado.mes, String(day))}
                        className={`
                                day 
                                ${IsCurrentDay(mesSeleccionado, day) ? 'day--current' : ''} 
                                ${Calendar_EsDiaSeleccionado(mesSeleccionado.anio, mesSeleccionado.mes, String(day)) ? 'day-selected' : ''}
                            `}>
                            <span className={`
                                day-number
                                ${EsDiaDeSangrado(String(day), mesSeleccionado.mes, mesSeleccionado.anio, sangrados) ? ClaseSangrado(String(day), mesSeleccionado.mes, mesSeleccionado.anio, sangrados) : ''}
                            `}>{day}</span>
                            <div className="day-alerts">
                            {Calendar_TieneInformacionDiaria(mesSeleccionado.anio, Number(mesSeleccionado.mes+1), String(day)) !== null && 
                                (
                                    <OverlayTrigger 
                                    trigger="click" 
                                    placement="right" 
                                    overlay={popoverInformacionDiaria(Calendar_TieneInformacionDiaria(mesSeleccionado.anio, Number(mesSeleccionado.mes+1), String(day)))}>
                                        <div 
                                        className="day--daily-info" 
                                        onClick={(e) => e.stopPropagation()}>
                                            <i class="fi fi-br-information text-white"></i>
                                        </div> 
                                    </OverlayTrigger>             
                                )
                            }
                            </div>
                        </div>
                    ) 
                ))}
            </div>
        </div>
    );
}