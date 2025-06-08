import { CalendarObject, Days, IsCurrentDay, CurrentDate } from "../../services/DateTimeService";
import { Emotions, BodyParts, Symptoms, FemFluid } from "../../services/Objects";
import { useState, useMemo, useEffect } from "react";
import { HorizontalRuleRounded, Circle } from '@mui/icons-material';
import { OverlayTrigger, Popover, FormCheck } from 'react-bootstrap';
import { SpanishDateString, GetGoogleColorById } from '../../services/Methods'; 
import { DiasDeSangrado, EsDiaDeSangrado, ClaseSangrado, BorrarEmbarazo, TerminarEmbarazo } from "../../services/CicloService";
import MomIcon from '../../assets/img/mom.png';

export default function Calendar (props) {

    // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    //  Variables para acceso a datos
    // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

    const calendar_obj = props.calendarObj;
    const mesSeleccionado = props.mesSeleccionado;
    const setMesSeleccionado = props.setMesSeleccionado;
    const setEstadoSangradoDia = props.setEstadoSangradoDia;
    const setInfoActual = props.setInfoActual;

    const datoDia = props.dia;
    const setDatoDia = props.setDia;
    const datoMes = props.mes;
    const setDatoMes = props.setMes;
    const datoAnio = props.anio;
    const setDatoAnio = props.setAnio;

    const informacionDiaria = props.informacionDiaria;
    const user = props.user;

    const ciclos = props.ciclos;
    const sangrados = props.sangrados;
    const embarazo = props.embarazo;

    const [parto, setParto] = useState(null);

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

        let info = informacionDiaria?.find(i => i.fecha == CurrentDate(nuevo_dia, Number(nuevo_mes + 1), nuevo_anio));
        setInfoActual(info);
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

    const handleModoEmbarazo = (e) => {
        const isChecked = e.target.checked;
        toggleModo(isChecked);
    };

    const toggleModo = function(isChecked) {
        const contenedoresCiclo = document.querySelectorAll('[modo="ciclo"]');
        const contenedoresEmbarazo = document.querySelectorAll('[modo="embarazo"]');
        const infoDiaria = document.getElementById('daily-data-nav');
        const calendario = document.querySelector('.calendar-container');

        contenedoresCiclo.forEach(el => {
            if (isChecked) {
                el.setAttribute("hidden", "");
                if (el.classList.contains('d-flex')) {
                    el.classList.remove("d-flex");
                    el.classList.add("d-none");
                }
            } else {
                el.removeAttribute("hidden");
                if (el.classList.contains('d-none')) {
                    el.classList.add("d-flex");
                    el.classList.remove("d-none");
                }
            }
        });

        if (isChecked) {
            infoDiaria.classList.remove("d-flex");
            infoDiaria.classList.add("d-none");
            calendario.style.flex = '1';
            calendario.style.maxWidth = 'none';
        } else {
            infoDiaria.classList.add("d-flex");
            infoDiaria.classList.remove("d-none");
            calendario.style.flex = 'none';
            calendario.style.maxWidth = '1200px';
        }

        contenedoresEmbarazo.forEach(el => {
            if (isChecked) {
                el.removeAttribute("hidden");
                if (el.classList.contains('d-none')) {
                    el.classList.add("d-flex");
                    el.classList.remove("d-none");
                }
            } else {
                el.setAttribute("hidden", "");
                if (el.classList.contains('d-flex')) {
                    el.classList.remove("d-flex");
                    el.classList.add("d-none");
                }
            }
        });
    }

    useEffect(() => {
        if (embarazo !== null) {
            toggleModo(true);
        }      
    }, [embarazo]);

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="flex-fill"></div>
                <div className="d-flex justify-content-center align-items-end" modo="ciclo">
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
                <div className="d-none justify-content-center align-items-end" modo="embarazo">
                    <h5 className="m-0 fw-bold txt-azul-oscuro">Embarazo</h5>
                </div>
                <div>
                    {embarazo && (
                        <FormCheck onChange={(e) => handleModoEmbarazo(e)} defaultChecked
                        type="switch" label="Modo embarazo" className="m-0 float-end"/> 
                    )}
                </div>
            </div>
            <div className="calendar">
                <span className="day-name" modo="ciclo">Lunes</span>
                <span className="day-name" modo="ciclo">Martes</span>
                <span className="day-name" modo="ciclo">Miércoles</span>
                <span className="day-name" modo="ciclo">Jueves</span>
                <span className="day-name" modo="ciclo">Viernes</span>
                <span className="day-name" modo="ciclo">Sábado</span>
                <span className="day-name" modo="ciclo">Domingo</span>               
                {Days(mesSeleccionado).map((day, index) => (    
                    day == 0 ? 
                    (
                        <div key={index} className="day day--disabled" modo="ciclo"></div>
                    ) 
                    : 
                    (
                        <div key={index} modo="ciclo"
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
                {embarazo && (
                    <div hidden className="pregnancy" modo="embarazo">   
                        <div className="d-flex align-items-center gap-4">
                            <img src={MomIcon} alt="" />
                            <div className="d-flex flex-column gap-2">
                                <p className="m-0">¡Felicades {user.given_name} por tu embarazo! Nos gustaría informate de que esta bonita gestación pudo ocurrir el día <strong>{SpanishDateString(embarazo.estimacionFecundacion)}</strong> o alrededor.</p>
                                <p className="m-0">Aun así, <span className="txt-rosa-muy-oscuro">puedes seguir tu hipotético ciclo mestrual quitando el modo embarazo. Queremos darte toda la información que sea de tu apoyo <i class="fi fi-rr-smile-beam d-inline-block"></i>.</span></p>
                                <p>El día del parto puede rondar por el día <strong>{SpanishDateString(embarazo.estimacionParto)}</strong>.</p>
                                <form id="parto" className="d-flex gap-3 flex-row align-items-center">
                                    <label className="form-check-label txt-azul-oscuro fw-bold" htmlFor="pregnancy-test-1">¿En qué fecha realizaste tu parto?</label>
                                    <input className="form-control w-auto"
                                    type="date" 
                                    onChange={(e) => setParto(e.currentTarget.value)}/>     
                                    <button className="btn-pink"
                                    onClick={() => TerminarEmbarazo(user.sub, user.given_name, user.family_name, embarazo.id, parto)}
                                    >Guardar</button> 
                                    <HorizontalRuleRounded/>   
                                    <button className="btn-blue" 
                                    onClick={() => BorrarEmbarazo(user.sub, user.given_name, user.family_name, embarazo.id)}>Eliminar embarazo</button>         
                                </form>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <p className="m-0">Aquí tienes unos enlaces de interés de información y artículos relacionados con el embarazo para que obtengas más información:</p>
                            <ul className="list-inline">
                                <li className="d-flex align-items-center gap-2">
                                    <i class="fi fi-rr-browser me-1"></i><strong>Cómo mantenerte sana durante el embarazo - </strong><span className="txt-rosa-oscuro">MedlinePlus</span>: <a target="_blank" href="https://kidshealth.org/es/parents/preg-health.html">https://kidshealth.org/es/parents/preg-health.html</a>
                                </li>
                                <li className="d-flex align-items-center gap-2">
                                    <i class="fi fi-rr-browser me-1"></i><strong>El embarazo - </strong><span className="txt-rosa-oscuro">MedlinePlus</span>: <a target="_blank" href="https://medlineplus.gov/spanish/pregnancy.html">https://medlineplus.gov/spanish/pregnancy.html</a>
                                </li>
                                <li className="d-flex align-items-center gap-2">
                                    <i class="fi fi-rr-browser me-1"></i><strong>Etapas del embarazo - </strong><span className="txt-rosa-oscuro">OASH</span>: <a target="_blank" href="https://espanol.womenshealth.gov/pregnancy/youre-pregnant-now-what/stages-pregnancy">https://espanol.womenshealth.gov/pregnancy/youre-pregnant-now-what/stages-pregnancy</a>
                                </li>
                                <li className="d-flex align-items-center gap-2">
                                    <i class="fi fi-rr-browser me-1"></i><strong>Articulos sobre el embarazo (ENG) - </strong><span className="txt-rosa-oscuro">Flo</span>: <a target="_blank" href="https://flo.health/pregnancy">https://flo.health/pregnancy</a>
                                </li>
                                <li className="d-flex align-items-center gap-2">
                                    <i class="fi fi-rr-film me-1"></i><strong>8 tips para empezar el embarazo con buen pie - </strong><span className="txt-rosa-oscuro"> FisioOnline</span>: <a target="_blank" href="https://youtu.be/MINAxk2pszk?si=mcLZSUFMSGWfyh5z">https://youtu.be/MINAxk2pszk?si=mcLZSUFMSGWfyh5z</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}