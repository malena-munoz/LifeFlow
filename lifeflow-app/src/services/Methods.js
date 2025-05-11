import { GooogleColors } from "./Objects";
import { RRule } from 'rrule';
import { Filter1Recurrency, Filter2Recurrency } from "./Objects";

export function SpanishDateString (date, incluirHora = false){
    const fecha = new Date(date);
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...(incluirHora && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // formato 24h
        })
    };

    const fechaFormateada = fecha.toLocaleString('es-ES', opciones);
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}

export function GetGoogleColorById(id) {
    let color =  GooogleColors().find(r => r.value === parseInt(id));
    return color === null || color === undefined ? '#000000' : color.color;
}

export function GetTimeDifference(inicio_string, fin_string) {

    if (inicio_string === null || fin_string === null) {
        return { hours: 0, minutes: 0 };
    }

    const inicio = new Date(inicio_string);
    const fin = new Date(fin_string);
    const diferencia = fin - inicio;

    if (isNaN(diferencia)) {
        return { hours: 0, minutes: 0 };
    }

    const minutos_totales = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(minutos_totales / 60);
    const minutos = minutos_totales % 60;
    return { hours: horas, minutes: minutos };
}

export function GetInformationRRULE(reminder, default_values = false) {
    let rrule_obj = reminder?.recurrence;

    if (rrule_obj !== null && rrule_obj !== undefined) {
        let rrule = RRule.fromString(rrule_obj[0].replace('RRULE:', ''));

        let rrule_frequency = rrule.options.freq == RRule.DAILY ? "Diaria" : 
            rrule.options.freq == RRule.WEEKLY ? "Semanal" :
            rrule.options.freq == RRule.MONTHLY ? "Mensual" : "???";
            
        let rrule_daysweek = rrule.options.byweekday.map(day => Filter2Recurrency()[day] ? Filter2Recurrency()[day].label : '???');

        return {
            frequency: default_values ? Filter1Recurrency()[Math.abs(rrule.options.freq-3)]?.value : rrule_frequency,
            days_week: default_values ? rrule.options.byweekday.map(day => Filter2Recurrency()[day]?.value) : rrule_daysweek,
            count: rrule.options.count
        }
    } else {
        return {
            frequency: '???',
            days_week: '???',
            count: '???'
        }
    }
}

export function GetReminderInfoToEdit(user, reminder) {
    let duration =  GetTimeDifference(reminder?.start?.dateTime, reminder?.end?.dateTime);
    let recurrence = GetInformationRRULE(reminder, true);

    let info_reminder = {
        summary: reminder?.summary,
        location: reminder?.location,
        description: reminder?.description,
        colorId: String(reminder?.colorId),
        start: reminder?.start?.dateTime.slice(0, 16),
        attendees: reminder?.attendees !== null ? reminder?.attendees.filter((att) => att.email != user.email).map((att) => att.email) : [],
        hours: duration.hours,
        minutes: duration.minutes,
        display_frequency: recurrence.frequency != '???' ? true : false,
        frequency: recurrence.frequency,
        days_week: recurrence.days_week != '???' ? recurrence.days_week : [],
        frequency_infinite: recurrence.frequency == 'Diaria' ? true : false,
        count: recurrence.count
    };

    return info_reminder
}