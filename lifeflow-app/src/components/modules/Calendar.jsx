import { CalendarObject, Days, IsCurrentDay } from "../logic/Date";
import { useState, useMemo } from "react";
import { HorizontalRuleRounded } from '@mui/icons-material';

export default function Calendar () {

    const calendar_obj = useMemo(() => CalendarObject(), []);
    const [mesSeleccionado, setMesSeleccionado] = useState(calendar_obj.actual);

    const compareMesSeleccionado = (fecha) => {
        return (
            mesSeleccionado.mes === fecha
        ) ? 'selected' : '';
    };  

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="d-flex justify-content-center align-items-end">
                    <span className={`month ${compareMesSeleccionado(calendar_obj.anterior.mes)}`} 
                    onClick={() => setMesSeleccionado(calendar_obj.anterior)} 
                    month={calendar_obj.anterior.mes}>
                        {calendar_obj.anterior.nombre} 
                        <span className="year"> {calendar_obj.anterior.anio}</span>
                    </span>
                    <HorizontalRuleRounded />
                    <span className={`month ${compareMesSeleccionado(calendar_obj.actual.mes)}`} 
                    onClick={() => setMesSeleccionado(calendar_obj.actual)} 
                    month={calendar_obj.actual.mes}>
                        {calendar_obj.actual.nombre} 
                        <span className="year"> {calendar_obj.actual.anio}</span>
                    </span>
                    <HorizontalRuleRounded />
                    <span className={`month ${compareMesSeleccionado(calendar_obj.siguiente.mes)}`}
                    onClick={() => setMesSeleccionado(calendar_obj.siguiente)} 
                    month={calendar_obj.siguiente.mes}>
                        {calendar_obj.siguiente.nombre} 
                        <span className="year"> {calendar_obj.siguiente.anio}</span>
                    </span>
                </div>       
            </div>
            <div class="calendar">
                <span className="day-name">Lunes</span>
                <span className="day-name">Martes</span>
                <span className="day-name">Miércoles</span>
                <span className="day-name">Jueves</span>
                <span className="day-name">Viernes</span>
                <span className="day-name">Sábado</span>
                <span className="day-name">Domingo</span>               
                {Days(mesSeleccionado).map((day, index) => (    
                    day == 0 ? (
                        <div className="day day--disabled"></div>
                    ) 
                    : 
                    (
                        <div className={`day ${IsCurrentDay(mesSeleccionado, day)}`}>
                            <span className="day-number">{day}</span>
                        </div>
                    ) 
                ))}
            </div>
        </div>
    );
}