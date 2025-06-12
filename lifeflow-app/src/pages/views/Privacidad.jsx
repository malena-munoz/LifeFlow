import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { Close } from '@mui/icons-material'; 

export default function Privacidad(props) {
    return (
        <Modal show={props.display} centered='true' dialogClassName='modal-xl modal-dialog-scrollable'>
            <ModalHeader>
                <ModalTitle>Privacidad</ModalTitle>
                <Close onClick={() => props.setDisplay(false)}/>
            </ModalHeader>
            <ModalBody>
                <div className="d-flex flex-column gap-4 px-4 py-2">
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Introducción</h2>
                        <p className="mb-1">
                        En el presente Trabajo Fin de Curso (TFC), titulado <strong>"LifeFlow"</strong>, se ha desarrollado una aplicación de seguimiento de ciclos menstruales. Durante el desarrollo de este proyecto se ha contemplado el tratamiento de datos personales con el único fin de permitir el correcto funcionamiento y validación del sistema.
                        </p>
                        <p className="m-0">
                        La presente política de privacidad tiene como objetivo informar sobre la recopilación, uso y protección de dichos datos en el marco del proyecto académico.
                        </p>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Responsable del tratamiento</h2>
                        <ul className="m-0">
                        <li><strong>Responsable:</strong> Malena Muñoz</li>
                        <li><strong>Centro de Formación Profesional:</strong> CFP Juan XXIII</li>
                        <li><strong>Correo electrónico:</strong> malena.munoz.dev@gmail.com</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Finalidad del tratamiento de datos</h2>
                        <p className="mb-1">Los datos personales tratados durante el desarrollo de LifeFlow tienen las siguientes finalidades:</p>
                        <ul className="mb-1">
                        <li>Permitir el correcto funcionamiento de las funcionalidades de la aplicación.</li>
                        <li>Realizar pruebas de validación y verificación del sistema.</li>
                        <li>Evaluar el rendimiento de los algoritmos de predicción de ciclos menstruales.</li>
                        <li>Cumplir los objetivos académicos establecidos para el TFC.</li>
                        </ul>
                        <p className="m-0">En ningún caso los datos se utilizarán para fines comerciales ni serán cedidos a terceros.</p>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Base legal para el tratamiento</h2>
                        <p className="mb-1">El tratamiento de los datos se realiza exclusivamente en el contexto académico del TFC, amparado por:</p>
                        <ul className="m-0">
                        <li>El consentimiento informado de los participantes (en caso de haber realizado pruebas reales).</li>
                        <li>El interés legítimo en el desarrollo, prueba y validación técnica del sistema.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Tipo de datos recogidos</h2>
                        <p className="mb-1">En el marco de este proyecto se pueden tratar los siguientes tipos de datos:</p>
                        <ul className="m-0">
                        <li><strong>Datos identificativos (si aplica):</strong> edad, género.</li>
                        <li><strong>Datos de salud:</strong> fechas de inicio de ciclo, duración de los periodos menstruales, síntomas asociados.</li>
                        <li><strong>Datos de uso de la aplicación:</strong> información técnica relacionada con el uso de las funcionalidades.</li>
                        <li><strong>Datos simulados:</strong> en caso de pruebas con datos generados artificialmente.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Medidas de seguridad</h2>
                        <p className="m-0">Se han adoptado medidas técnicas y organizativas para garantizar la seguridad de los datos:</p>
                        <ul className="m-0">
                        <li>Acceso limitado a la información únicamente por parte de la responsable del proyecto y tutores académicos.</li>
                        <li>Almacenamiento seguro de los datos durante el desarrollo.</li>
                        <li>Eliminación de los datos tras la finalización y defensa del TFC.</li>
                        <li>No almacenamiento en servidores de terceros fuera del ámbito académico (salvo en casos controlados para pruebas).</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Cesión de datos</h2>
                        <p className="m-0">No se realizará cesión de datos a terceros. Toda la información tratada permanece en el ámbito estrictamente académico.</p>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Conservación de los datos</h2>
                        <p className="m-0">Los datos personales se conservarán únicamente durante el tiempo necesario para la realización, evaluación y defensa del TFC. Finalizado este periodo, serán eliminados de forma segura.</p>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Derechos de los interesados</h2>
                        <p className="m-0">En caso de participación de personas reales, los interesados podrán ejercer sus derechos de acceso, rectificación, supresión, limitación del tratamiento y oposición, contactando con la responsable mediante el correo electrónico facilitado.</p>
                    </div>
                    <div>
                        <h2 className="fw-bold txt-azul-oscuro">Contacto</h2>
                        <p className="mb-2">Para cualquier cuestión relacionada con la protección de datos en el marco de este TFC, se puede contactar con:</p>
                        <div className='bg-rosa-muy-oscuro rounded text-white d-flex p-3 flex-column'>
                            <strong>Malena Muñoz </strong> Correo electrónico: malena.munoz.dev@gmail.com
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
