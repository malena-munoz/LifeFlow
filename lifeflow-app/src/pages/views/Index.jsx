import { CalendarObject, CurrentDate } from "../../services/DateTimeService";
import Calendar from "../../components/custom/Calendar";
import { Emotions, BodyParts, Symptoms, FemFluid } from "../../services/Objects";
import { useState, useRef, useEffect, useMemo } from "react";
import { HorizontalRuleRounded } from '@mui/icons-material';
import { Form } from 'react-bootstrap';
import { GuardarInformacionDiaria, InformacionDiariaTrimestre } from "../../services/InformacionDiariaService";
import { SpanishDateString } from "../../services/Methods";
import { ReactComponent as BloodCellsIcon } from 'healthicons/public/icons/svg/filled/body/blood_cells.svg';
import { ReactComponent as CleaningIcon } from 'healthicons/public/icons/svg/filled/objects/cleaning.svg';
import { RegistrarSangrado, BorrarSangrado } from "../../services/CicloService";

export default function Index(props){
    // Datos del usuario
    const user = props.user;
    const token = props.token;

    const recordatorios = props.reminders;
    const ciclos = props.ciclos;
    const sangrados = props.sangrados;
    const calendar_obj = useMemo(() => CalendarObject(), []);
    const [mesSeleccionado, setMesSeleccionado] = useState(calendar_obj.actual);

    const [estadoSangradoDia, setEstadoSangradoDia] = useState(true);

    // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    //  Variables para acceso a datos
    // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

    // Emociones
    const [datoEmociones, setDatoEmociones] = useState([]);
    // Molestias 
    const [datoMolestias, setDatoMolestias] = useState([]);
    // Síntomas 
    const [datoSintomasCuerpo, setDatoSintomasCuerpo] = useState([]);
    // Fluido femenino 
    const [datoFluidoFemenino, setDatoFluidoFemenino] = useState([]);
    // Prueba de embarazo 
    const [datoPruebaEmbarazo, setDatoPruebaEmbarazo] = useState('No realizado');
    // Notas
    const [datoNotas, setDatoNotas] = useState('');
    // Día
    const [datoDia, setDatoDia] = useState(1);
    // Mes
    const [datoMes, setDatoMes] = useState('');
    // Año
    const [datoAnio, setDatoAnio] = useState(2025);
    // Información diaria actual
    const [infoActual, setInfoActual] = useState(null);

    // Efectos
    const notasRef = useRef(null);
    useEffect(() => {
        const textarea = notasRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }, [datoNotas]);

    const [informacionDiaria, setInformacionDiaria] = useState(null);
    useEffect(() => {
        async function fetchInformacion() {
            const data = await InformacionDiariaTrimestre(user.sub, user.given_name, user.family_name);
            setInformacionDiaria(data); 
        }

        if (user) { fetchInformacion(); }
        
    }, [user]);


    const toggleSeleccion = (id) => {
        setDatoEmociones(prev =>
            prev.includes(String(id)) ? prev.filter(itemId => itemId !== String(id)) : [...prev, String(id)]
        );
    };

    const toggleBodyParts = (id) => {
        setDatoMolestias(prev =>
            prev.includes(String(id)) ? prev.filter(itemId => itemId !== String(id)) : [...prev, String(id)]
        );
    };

    const toggleSymtoms = (id) => {
        setDatoSintomasCuerpo(prev =>
            prev.includes(String(id)) ? prev.filter(itemId => itemId !== String(id)) : [...prev, String(id)]
        );
    };

    const toggleFluidoFemenino = (id) => {
        setDatoFluidoFemenino(prev =>
            prev.includes(String(id)) ? prev.filter(itemId => itemId !== String(id)) : [...prev, String(id)]
        );
    };

    const toggleDatoPruebaEmbarazo = (check) => {
        let opcion = check.parentNode.querySelector('label').textContent;
        setDatoPruebaEmbarazo(opcion);
    };

    const RegistrarDatosDiarios = function() {
        let informacion_diaria = {
            Id: infoActual?.id,
            IdUsuario: user.sub,
            Fecha: CurrentDate(datoDia, String(datoMes+1), datoAnio),
            PruebaEmbarazo: datoPruebaEmbarazo.trim(),
            Notas: datoNotas,
            Sintomas: datoSintomasCuerpo,
            Emociones: datoEmociones,
            FluidoFemenino: datoFluidoFemenino,
            Molestias: datoMolestias,
        }; 

        GuardarInformacionDiaria(user.sub, user.given_name, user.family_name, informacion_diaria);
    }

    const RegistrarDiaSangrado = function() {
        RegistrarSangrado(user.sub, user.given_name, user.family_name, CurrentDate(datoDia, String(datoMes+1), datoAnio));
    }

    const BorrarDiaSangrado = function() {
        BorrarSangrado(user.sub, user.given_name, user.family_name, CurrentDate(datoDia, String(datoMes+1), datoAnio));
    }

    useEffect(() => {
        if (infoActual !== null && infoActual !== undefined) {
            setDatoEmociones(infoActual?.emociones);
            setDatoMolestias(infoActual?.molestias);
            setDatoSintomasCuerpo(infoActual?.sintomas);
            setDatoFluidoFemenino(infoActual?.fluidoFemenino);
            setDatoPruebaEmbarazo(infoActual?.pruebaEmbarazo);
        } else {
            setDatoEmociones([]);
            setDatoMolestias([]);
            setDatoSintomasCuerpo([]);
            setDatoFluidoFemenino([]);
            setDatoPruebaEmbarazo('No realizado');
        }
    }, [infoActual]);


    return (
        <article>
            <Calendar 
            dia={datoDia} setDia={setDatoDia} 
            mes={datoMes} setMes={setDatoMes} 
            anio={datoAnio} setAnio={setDatoAnio}
            informacionDiaria={informacionDiaria}
            calendarObj={calendar_obj}
            ciclos={ciclos}
            sangrados={sangrados}
            mesSeleccionado={mesSeleccionado}
            setMesSeleccionado={setMesSeleccionado}
            setEstadoSangradoDia={setEstadoSangradoDia}
            setInfoActual={setInfoActual}
            />
            <div className="flex-grow-1 d-flex flex-column">
                <div className="bg-azul-medio rounded-1 p-3 d-flex flex-column gap-3">
                    <div className="selected-day--info">
                        <i className="fi fi-rr-daily-calendar me-1"></i>
                        <span className="text-decoration-underline">Día seleccionado: </span>
                        {SpanishDateString(CurrentDate(datoDia, Number(datoMes + 1), datoAnio))}
                    </div>
                    {estadoSangradoDia != null && (
                        <div className="selected-day--controller">
                            {estadoSangradoDia ? (
                                <button className="blood-delete"
                                onClick={() => BorrarDiaSangrado()}>
                                    <CleaningIcon/>
                                    Borrar sangrado
                                </button>
                            ) : (
                                <button className="blood-confirm" 
                                onClick={() => RegistrarDiaSangrado()}>
                                    <BloodCellsIcon/>
                                    Registrar sangrado
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <form id="daily-data" className="overflow-auto" onSubmit={(e) => {e.preventDefault();} }>
                    <div className="form-property property-contained">
                        <div className="d-flex flex-row gap-1">
                            <h5>Emociones</h5>
                            <HorizontalRuleRounded/>
                            <span>¿Cómo te sientes?</span>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                        {Emotions().map((emocion) => (
                            <div
                            key={emocion.id}
                            className={`icon-item 
                                ${datoEmociones.includes(String(emocion.id)) ? 'selected' : ''}
                            `}
                            onClick={() => toggleSeleccion(emocion.id)}
                            >
                                <i className={emocion.icon}></i> {emocion.label}
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="form-property property-contained">
                        <div className="d-flex flex-row gap-1">
                            <h5>Molestias</h5>
                            <HorizontalRuleRounded/>
                            <span>¿Sientes dolor en alguna de estas zonas?</span>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                            {BodyParts().map((parte) => (
                                <div
                                key={parte.id}
                                className={`icon-item 
                                    ${datoMolestias.includes(String(parte.id)) ? 'selected' : ''}
                                `}
                                onClick={() => toggleBodyParts(parte.id)}
                                >
                                <parte.icon height={20} width={20} /> {parte.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-property property-contained">
                        <div className="d-flex flex-row gap-1">
                            <h5>Síntomas</h5>
                            <HorizontalRuleRounded/>
                            <span>¿Has sentido alguna de estas condiciones?</span>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                            {Symptoms().map((parte) => (
                                <div
                                key={parte.id}
                                className={`icon-item 
                                    ${datoSintomasCuerpo.includes(String(parte.id)) ? 'selected' : ''}
                                `}
                                onClick={() => toggleSymtoms(parte.id)}
                                >
                                <parte.icon height={20} width={20} /> {parte.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-property property-contained">
                        <div className="d-flex flex-row gap-1">
                            <h5>Fluido femenino</h5>
                            <HorizontalRuleRounded/>
                            <span>¿Cómo era su aspecto?</span>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                        {FemFluid().map((fluido) => (
                            <div
                            key={fluido.id}
                            className={`icon-item 
                                ${datoFluidoFemenino.includes(String(fluido.id)) ? 'selected' : ''}
                            `}
                            onClick={() => toggleFluidoFemenino(fluido.id)}
                            >
                            <i className={fluido.icon}></i> {fluido.label}
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="form-property property-contained">
                        <div className="d-flex flex-row gap-1">
                            <h5>Prueba de embarazo</h5>
                            <HorizontalRuleRounded/>
                            <span>¿Cuál fue el resultado?</span>
                        </div>
                        <div className="d-flex flex-column flex-wrap gap-2">
                            <div className="form-check">
                                <input onChange={(e) => toggleDatoPruebaEmbarazo(e.target)}
                                className="form-check-input" type="radio" defaultChecked checked={datoPruebaEmbarazo.trim() == 'No realizado'}
                                name="pregnancy-test" id="pregnancy-test-1"/>
                                <label className="form-check-label" htmlFor="pregnancy-test-1"> No realizado </label>
                            </div>
                            <div className="form-check">
                                <input onChange={(e) => toggleDatoPruebaEmbarazo(e.target)} checked={datoPruebaEmbarazo.trim() == 'Positivo'}
                                className="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-2"  />
                                <label className="form-check-label" htmlFor="pregnancy-test-2"> Positivo </label>
                            </div>
                            <div className="form-check">
                                <input onChange={(e) => toggleDatoPruebaEmbarazo(e.target)} checked={datoPruebaEmbarazo.trim() == 'Negativo'}
                                className="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-3"  />
                                <label className="form-check-label" htmlFor="pregnancy-test-3"> Negativo </label>
                            </div>
                            <div className="form-check">
                                <input onChange={(e) => toggleDatoPruebaEmbarazo(e.target)} checked={datoPruebaEmbarazo.trim() == 'Línea débil'}
                                className="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-4"  />
                                <label className="form-check-label" htmlFor="pregnancy-test-4"> Línea débil </label>
                            </div>
                            <div className="form-check">
                                <input onChange={(e) => toggleDatoPruebaEmbarazo(e.target)} checked={datoPruebaEmbarazo.trim() == 'No válido'}
                                className="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-5"  />
                                <label className="form-check-label" htmlFor="pregnancy-test-5"> No válido </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-property property-contained">
                        <div className="d-flex flex-row gap-1">
                            <h5>Notas</h5>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                            <Form.Control 
                            ref={notasRef}
                            className="overflow-hidden res"
                            id="notes" 
                            as='textarea' 
                            placeholder='Escribe alguna nota adicional.' 
                            defaultValue={infoActual?.notas}
                            multiple
                            onChange={(e) => setDatoNotas(e.target.value)}/>
                        </div>
                    </div>
                </form>
                <button 
                id="save-day-stats" 
                className="btn-pink"
                onClick={() => RegistrarDatosDiarios()}
                >Guardar cambios</button>
            </div>
        </article>
    );
}