import Calendar from "../../modules/Calendar";
import { Emotions, BodyParts, Symptoms, FemFluid } from "../../logic/DailyData";
import { useState } from "react";
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

export default function Index(){
    const [selected, setSelected] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);
    const [symtoms, setSymtoms] = useState([]);
    const [fluidoFemenino, setFluidoFemenino] = useState([]);

    const toggleSeleccion = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const toggleBodyParts = (id) => {
        setBodyParts(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const toggleSymtoms = (id) => {
        setSymtoms(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const toggleFluidoFemenino = (id) => {
        setFluidoFemenino(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    return (
        <article>
            <Calendar />
            <div className="flex-grow-1 d-flex flex-column">
                <form id="daily-data" className="overflow-auto">
                    <div className="form-property property-contained">
                        <div className="d-flex flex-row gap-1">
                            <h5>Emociones</h5>
                            <HorizontalRuleRoundedIcon/>
                            <span>¿Cómo te sientes?</span>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                        {Emotions().map((emocion) => (
                            <div
                            key={emocion.id}
                            className={`icon-item ${selected.includes(emocion.id) ? 'selected' : ''}`}
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
                            <HorizontalRuleRoundedIcon/>
                            <span>¿Sientes dolor en alguna de estas zonas?</span>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                            {BodyParts().map((parte) => (
                                <div
                                key={parte.id}
                                className={`icon-item ${bodyParts.includes(parte.id) ? 'selected' : ''}`}
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
                            <HorizontalRuleRoundedIcon/>
                            <span>¿Has sentido alguna de estas condiciones?</span>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                            {Symptoms().map((parte) => (
                                <div
                                key={parte.id}
                                className={`icon-item ${symtoms.includes(parte.id) ? 'selected' : ''}`}
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
                            <HorizontalRuleRoundedIcon/>
                            <span>¿Cómo era su aspecto?</span>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-2">
                        {FemFluid().map((fluido) => (
                            <div
                            key={fluido.id}
                            className={`icon-item ${fluidoFemenino.includes(fluido.id) ? 'selected' : ''}`}
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
                            <HorizontalRuleRoundedIcon/>
                            <span>¿Cuál fue el resultado?</span>
                        </div>
                        <div className="d-flex flex-column flex-wrap gap-2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-1"/>
                                <label class="form-check-label" for="pregnancy-test-1"> No realizado </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-2"  />
                                <label class="form-check-label" for="pregnancy-test-2"> Positivo </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-3"  />
                                <label class="form-check-label" for="pregnancy-test-3"> Negativo </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-4"  />
                                <label class="form-check-label" for="pregnancy-test-4"> Línea débil </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="pregnancy-test" id="pregnancy-test-5"  />
                                <label class="form-check-label" for="pregnancy-test-5"> No válido </label>
                            </div>
                        </div>
                    </div>
                </form>
                <button id="save-day-stats" className="btn-pink">Guardar cambios</button>
                

            </div>
        </article>
    );
}