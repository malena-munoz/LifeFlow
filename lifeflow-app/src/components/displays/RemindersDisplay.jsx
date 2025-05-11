import React from 'react';
import { Circle, LocationOn, CalendarMonth } from '@mui/icons-material';
import { GetGoogleColorById, GetTimeDifference } from '../../services/Methods';
import { SpanishDateString, GetInformationRRULE } from '../../services/Methods';

export default function RemindersDisplay(props){
    const user = props.user;
    const reminder = props.reminder;
    const duration = GetTimeDifference(reminder?.start?.dateTime, reminder?.end?.dateTime);
    const recurrence = GetInformationRRULE(reminder);

    return (
        <section id="reminder-editor" className='d-flex flex-column gap-3 p-5'>
            {reminder ?
            <>
                <div className="d-flex align-items-center gap-3">
                    <Circle htmlColor={GetGoogleColorById(reminder.colorId)}/>
                    <h2 className='m-0'>{reminder.summary}</h2>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <LocationOn className='icon-btn--single location-icon'/>
                    <span className='property-label'>Localización:</span>
                    <h4 className='m-0'>{reminder.location}</h4>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <CalendarMonth className='icon-btn--single calendar-icon'/>
                    <h4 className='m-0'>
                        {SpanishDateString(reminder?.start?.dateTime)}
                        <span className='fw-bold ms-2'>({duration.hours}h {duration.minutes}min)</span>
                    </h4>
                </div>
                <hr className='separator'></hr>
                <div className="d-flex align-items-center gap-3">
                    <span className='property-label'>Descripción:</span>
                    <p className={`m-0`}>
                        {reminder.description ? 
                            reminder.description 
                        :
                            <span className='text-danger fw-bold'>No hay descripción del recordatorio.</span>
                        }
                    </p>
                </div>
                <div className={`d-flex ${reminder.attendees !== null && reminder.attendees.length > 0 ? 'flex-column gap-2' : 'align-items-center gap-3'}`}>
                    <span className='property-label'>Invitados:</span>
                    <div className='d-flex flex-column gap-2'>
                        {reminder.attendees !== null && reminder.attendees.length > 0 ? 
                            reminder.attendees.filter((att) => att.email != user.email).map((att) => <span className='new-guest btn-pink'>{att.email}</span>)
                        : 
                            <span className='text-danger fw-bold'>No hay invitados al evento.</span>
                        }
                    </div>
                </div>
                <hr className='separator'></hr>
                <div className={`d-flex ${reminder.recurrence !== null ? 'flex-column gap-2' : 'align-items-center gap-3'}`}>
                    <span className='property-label'>Recurrencia:</span>
                    {reminder.recurrence !== null ? 
                        <table className='mini-table'>
                            <tbody>
                                <tr>
                                    <td className='td-label'>Frecuencia</td>
                                    <td>{recurrence.frequency}</td>
                                </tr>
                                {recurrence.frequency == 'Semanal' ? 
                                    <tr>
                                        <td className='td-label'>Dias de la semana</td>
                                        <td>{recurrence.days_week.join(', ')}</td>
                                    </tr>
                                :
                                    <></>
                                }
                                <tr>
                                    <td className='td-label'>Cantidad de repeticiones</td>
                                    <td>{recurrence.count}</td>
                                </tr>
                            </tbody>
                        </table>
                    :
                        <span className='text-danger fw-bold'>No se repite.</span>
                    }
                </div>
            </> 
            :
            <div className='h-100 d-flex align-items-center justify-content-center p-5'>
                <h3 className='text-danger fw-bold m-0 text-center'>Selecciona un recordatorio para ver su información.</h3>
            </div>
            }
        </section>
    );
}