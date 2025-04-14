import Calendar from "../../modules/Calendar";
import { Emotions, BodyParts } from "../../logic/DailyData";
import { useState } from "react";
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';

export default function Index(){
    const [selected, setSelected] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);

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
                                <i className={parte.icon}></i> {parte.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
                <button id="save-day-stats" className="btn-pink">Guardar cambios</button>
                

            </div>
        </article>
    );
}