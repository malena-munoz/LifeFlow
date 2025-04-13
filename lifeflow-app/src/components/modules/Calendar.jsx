import { CalendarObject, Days, IsCurrentDay } from "../logic/Date";
import { useState } from "react";
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

export default function Calendar () {

    const calendar_obj = CalendarObject();
    const [mesSeleccionado, setMesSeleccioando] = useState(calendar_obj.actual.objeto);

    

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div class="d-flex justify-content-center align-items-end">
                    <span className="month" onClick={() => setMesSeleccioando(calendar_obj.anterior.objeto)} month={calendar_obj.anterior.objeto.getMonth()}>{calendar_obj.anterior.nombre} 
                        <span className="year"> {calendar_obj.anterior.objeto.getFullYear()}</span>
                    </span>
                    <HorizontalRuleRoundedIcon />
                    <span className="month selected" onClick={() => setMesSeleccioando(calendar_obj.actual.objeto)} month={calendar_obj.actual.objeto.getMonth()}>{calendar_obj.actual.nombre} 
                        <span className="year"> {calendar_obj.actual.objeto.getFullYear()}</span>
                    </span>
                    <HorizontalRuleRoundedIcon />
                    <span className="month" onClick={() => setMesSeleccioando(calendar_obj.siguiente.objeto)} month={calendar_obj.siguiente.objeto.getMonth()}>{calendar_obj.siguiente.nombre} 
                        <span className="year"> {calendar_obj.siguiente.objeto.getFullYear()}</span>
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
                    ) : 
                    (
                        <div className={`day ${IsCurrentDay(day)}`}>
                            <span class="day-number">{day}</span>
                        </div>
                    ) 
                ))}
            </div>
        </div>
    );
}