import { useState, useEffect } from "react";
import '../../assets/styles/Estadisticas.css';
import { ExcelOpcion1, ReporteOpcion1, ReporteOpcion2, ReporteOpcion3, ExcelOpcion3 } from "../../services/ReportesService";
import { SpanishDateString } from "../../services/Methods";
import { Container, Row, Col, ListGroup, Table, Collapse, Button } from "react-bootstrap";
import BarChartComparativo from "../../components/graphs/BarChartComparativo";
import { Emotions, BodyParts, Symptoms, FemFluid } from "../../services/Objects";
import CicloIcon from '../../assets/img/fases-ciclo.png';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

export default function Estadisticas(props) {
    // Datos del usuario
    const user = props.user;
    const token = props.token;

    const [reporte, setReporte] = useState(null);
    const [indiceReporte, setIndiceReporte] = useState(null);
    const [fuentesOpcion2, setFuentesOpcion2] = useState(false);
    const [eggs, setEggs] = useState([]);

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const ElegirReporte = async function(opcion) {
        if (opcion != 0) {
            if (opcion == 1) {
                try {
                    document.querySelector('#loader').style.display = 'flex';
                    const [opcion_1] = await Promise.all([
                        ReporteOpcion1(user.sub),
                        delay(2000)
                    ]);
                    setReporte(opcion_1);
                    setIndiceReporte(1);
                    console.log(opcion_1);
                } catch (error) {} finally {
                    document.querySelector('#loader').style.display = 'none';
                }
            } else if (opcion == 2) {
                try {
                    document.querySelector('#loader').style.display = 'flex';
                    const [opcion_2] = await Promise.all([
                        ReporteOpcion2(user.sub),
                        delay(2000)
                    ]);
                    setReporte(opcion_2);
                    setIndiceReporte(2);
                    console.log(opcion_2);
                } catch (error) {} finally {
                    document.querySelector('#loader').style.display = 'none';
                }
            } else {
                try {
                    document.querySelector('#loader').style.display = 'flex';
                    const [opcion_3] = await Promise.all([
                        ReporteOpcion3(user.sub),
                        delay(2000)
                    ]);
                    setReporte(opcion_3);
                    setIndiceReporte(3);
                    console.log(opcion_3);
                    DataTable.use(DT);
                } catch (error) {} finally {
                    document.querySelector('#loader').style.display = 'none';
                }
            }
        }
    }

    const GenerarExcel = async function() {
        if (indiceReporte == 1) {
            document.querySelector('#loader').style.display = 'flex';
            try {
                await Promise.all([
                    ExcelOpcion1(user.sub, user.given_name),
                    delay(2000)
                ]);
            } catch (error) {} finally {
                document.querySelector('#loader').style.display = 'none';
            }   
        } else if (indiceReporte == 3) {
            document.querySelector('#loader').style.display = 'flex';
            try {
                await Promise.all([
                    ExcelOpcion3(user.sub, user.given_name),
                    delay(2000)
                ]);
            } catch (error) {} finally {
                document.querySelector('#loader').style.display = 'none';
            }   
        }
    }

    useEffect(() => {
        const newEggs = Array.from({ length: 25 }, () => {
            const size = Math.random() * 30 + 20; // 20px - 50px
            const maxTop = 100 - (size / window.innerHeight) * 100;
            const maxLeft = 100 - (size / window.innerWidth) * 100;

            return {
                top: Math.random() * maxTop,
                left: Math.random() * maxLeft,
                size
            };
        });

        setEggs(newEggs);
    }, []);

    const options = {
        columnDefs: [
            { targets: 0, width: '500px' }
        ],          
        pageLength: 5,
        lengthChange: false,
        language :{
            emptyTable: "No hay ciclos ni sangrados registrados.",
            entries: "Entradas",
            info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            infoEmpty: "Mostrando 0 a 0 de 0 entradas",
            infoFiltered: "(filtrado de _MAX_ entradas totales)",
            infoPostFix: "",
            decimal: ",",
            thousands: ".",
            lengthMenu: "Mostrar _MENU_ entradas",
            loadingRecords: "Cargando...",
            processing: "Procesando...",
            search: '<i class="fi fi-rr-search"></i>',
            searchPlaceholder: "",
            zeroRecords: "No se encontraron registros coincidentes",
            paginate: {
                first: '<i class="fi fi-rr-angle-double-small-left"></i>',
                last: '<i class="fi fi-rr-angle-double-small-right"></i>',
                next: '<i class="fi fi-rr-angle-small-right"></i>',
                previous: '<i class="fi fi-rr-angle-small-left"></i>'
            },
            aria: {
                orderable: "Ordenable",
                orderableReverse: "Ordenable inverso",
                orderableRemove: "Eliminar ordenable",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior",
                    number: "Número"
                }
            },
            url: "",
        },
        ordering: false,
        pagingType: 'full',
        info: false,
        rowCallback: function (row, data, index) {
            
        }        
    };

    return (
        <article page="estadisticas">
            {!reporte && (
                eggs.map((egg, i) => (
                    <div
                    key={i}
                    className="egg"
                    style={{
                        top: `${egg.top}%`,
                        left: `${egg.left}%`,
                        width: `${egg.size}px`,
                        height: `${egg.size}px`,
                    }}>
                        <div className="nucleus" />
                    </div>
                ))
            )}
            <div className={`d-flex flex-column w-100 ${!reporte ? 'justify-content-center' : 'h-100 pb-5'}`}>
                <div className="estadisticas-header container d-flex flex-column gap-3 align-items-center">
                    {!reporte && (
                        <>
                            <h1 className="m-0 fw-bold txt-rosa-oscuro">Estadísticas</h1>
                            <p className="m-0 fw-bold">A partir de la elección de un tipo de reporte, se generará los módulos y gráficas correspondientes. Podrás descargar algunos de los reportes generados vía Excel <i class="fi fi-rr-file-spreadsheet d-inline-block"></i></p>
                        </>
                    )}
                    <select id='informe' className='form-control form-select w-50' onChange={(e) => ElegirReporte(e.currentTarget.value)}>
                        <option value={0} selected disabled> -- Elige una opción --</option>
                        <option value={1}>Comparación del último ciclo y el ciclo actual</option>
                        <option value={2}>Correlación entre síntomas y etapas del ciclo actual</option>
                        <option value={3}>Historial de ciclos</option>
                    </select>
                </div>
                {(reporte !== null && reporte !== undefined && reporte.opcion == 1) &&
                (
                    <div className="estadisticas-reporte container d-flex flex-column gap-3 align-items-center">
                        <h2 className="estadisticas-reporte--titulo">Comparación del último ciclo y el ciclo actual</h2>
                        <Container className="mt-5">
                            <Row>
                                <Col className="d-flex justify-content-center ps-3 pe-0"><h5 className="fw-bold m-0">{SpanishDateString(reporte.ultimoCicloReal.inicioCiclo)}</h5></Col>
                                <Col md="auto"><span className="txt-rosa-medio">vs.</span></Col>
                                <Col className="d-flex justify-content-center pe-3 ps-0"><h5 className="fw-bold m-0">{SpanishDateString(reporte.primerCicloPrediccion.inicioCiclo)}</h5></Col>
                            </Row>
                        </Container>
                        <div className="d-flex flex-column gap-2 justify-content-center align-items-center w-100 mt-3">
                            <strong className="txt-rosa-muy-oscuro">Duración de la menstruación</strong>
                            <Container className="bg-azul-muy-claro p-3 rounded">
                                <Row>
                                    <Col className="d-flex justify-content-center p-0">
                                        {reporte.ultimoCicloReal.duracionMenstruacion}
                                    </Col>
                                    <Col className="d-flex justify-content-center p-0">
                                        {reporte.primerCicloPrediccion.duracionMenstruacion}
                                    </Col>
                                </Row>
                            </Container>
                            {
                                (() => {
                                    const diferencia_duracion_menstruacion = reporte.primerCicloPrediccion.duracionMenstruacion - reporte.ultimoCicloReal.duracionMenstruacion;
                                    const color_diferencia_duracion_menstruacion = diferencia_duracion_menstruacion < 0 ? 'text-danger' : diferencia_duracion_menstruacion > 0 ? 'text-success' : '';

                                    return (
                                        <p>
                                            Diferencia en duración de la menstruación: 
                                            &nbsp;
                                            <span className={`fw-bold ${color_diferencia_duracion_menstruacion}`}>{diferencia_duracion_menstruacion} días</span>
                                            
                                        </p>
                                    );
                                })()
                            }
                        </div>
                        <div className="d-flex flex-column gap-2 justify-content-center align-items-center w-100 mt-3">
                            <strong className="txt-rosa-muy-oscuro">Duración del ciclo</strong>
                            <Container className="bg-azul-muy-claro p-3 rounded">
                                <Row>
                                    <Col className="d-flex justify-content-center p-0">
                                        {reporte.ultimoCicloReal.duracionCiclo}
                                    </Col>
                                    <Col className="d-flex justify-content-center p-0">
                                        {reporte.primerCicloPrediccion.duracionCiclo} (puede variar)
                                    </Col>
                                </Row>
                            </Container>
                            {
                                (() => {
                                    const diferencia_duracion_ciclo = reporte.primerCicloPrediccion.duracionCiclo - reporte.ultimoCicloReal.duracionCiclo;
                                    const color_diferencia_duracion_ciclo = diferencia_duracion_ciclo < 0 ? 'text-danger' : diferencia_duracion_ciclo > 0 ? 'text-success' : '';

                                    return (
                                        <p>
                                            Diferencia en duración del ciclo menstrual: 
                                            &nbsp;
                                            <span className={`fw-bold ${color_diferencia_duracion_ciclo}`}>{diferencia_duracion_ciclo} días (puede variar)</span>
                                            
                                        </p>
                                    );
                                })()
                            }
                        </div>
                        <BarChartComparativo
                        title={"Emociones registradas durante el ciclo actual y el último ciclo"}
                        x={"Días"} y={null}
                        exception={"No hay emociones registradas entre ambos ciclos."}
                        dataObj={reporte.rankingEmociones}
                        objects={Emotions()}/>
                        <BarChartComparativo
                        title={"Molestias registradas durante el ciclo actual y el último ciclo"}
                        x={"Días"} y={null}
                        exception={"No hay molestias registradas entre ambos ciclos."}
                        dataObj={reporte.rankingMolestias}
                        objects={BodyParts()}/>
                        <BarChartComparativo
                        title={"Síntomas registrados durante el ciclo actual y el último ciclo"}
                        x={"Días"} y={null}
                        exception={"No hay síntomas registrados entre ambos ciclos."}
                        dataObj={reporte.rankingSintomas}
                        objects={Symptoms()}/>
                        <BarChartComparativo
                        title={"Tipos de fluido registrados durante el ciclo actual y el último ciclo"}
                        x={"Días"} y={null}
                        exception={"No hay tipos de fluido registrados entre ambos ciclos."}
                        dataObj={reporte.rankingMolestias}
                        objects={FemFluid()}/>
                        <BarChartComparativo
                        title={"Pruebas de embarazo registradas durante el ciclo actual y el último ciclo"}
                        x={"Días"} y={null}
                        exception={"No hay pruebas de embarazo registradas entre ambos ciclos."}
                        dataObj={reporte.pruebasEmbarazo}
                        objects={null}/>
                    </div>
                )}
                {(reporte !== null && reporte !== undefined && reporte.opcion == 2) &&
                (
                    <div className="estadisticas-reporte container d-flex flex-column gap-3 align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            <h2 className="estadisticas-reporte--titulo">Correlación entre síntomas y etapas del ciclo actual</h2>
                            <button
                            className="btn-pink d-flex align-items-center gap-2"
                            onClick={() => setFuentesOpcion2(!fuentesOpcion2)}>
                                Mostrar fuentes <i class="fi fi-rr-newspaper"></i>
                            </button>
                        </div>
                        <Collapse in={fuentesOpcion2}>
                            <div>
                                <ul>
                                    <li><a href="https://helloclue.com/es/articulos/emociones/cambios-de-humor-y-el-ciclo-menstrual-spm-y-tdpm">https://helloclue.com/es/articulos/emociones/cambios-de-humor-y-el-ciclo-menstrual-spm-y-tdpm</a></li>
                                    <li><a href="https://regenerahealth.com/blog/fases-del-ciclo-menstrual/#1_Fase_menstrual">https://regenerahealth.com/blog/fases-del-ciclo-menstrual/#1_Fase_menstrual</a></li>
                                    <li><a href="https://www.ginefiv.com/blog/sintomas-ovulacion/">https://www.ginefiv.com/blog/sintomas-ovulacion/</a></li>
                                </ul>
                            </div>
                        </Collapse>
                        <h4>Tu actual ciclo empezó el <strong>{SpanishDateString(reporte.cicloActual.inicioCiclo)}</strong></h4>
                        <img src={CicloIcon} alt="" className="w-75" />
                        <div className="d-flex flex-column gap-2 mb-3">
                            <p>Un ciclo menstrual femenino está divido por 4 fases distintas, en la que cada una tiene diferentes funciones: <strong>menstrual</strong>, donde se produce el sangrado; <strong>folicular</strong>, en la que se desarrolla el óvulo; <strong>ovulatoria</strong>, cuando el óvulo es liberado; y <strong>lútea</strong>, que prepara el cuerpo para un posible embarazo.</p>
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                            <h3 className="mb-2 fw-bold txt-rosa-oscuro">Fase menstrual <span className="text-black">(días 1–5 aprox.)</span></h3>
                            <p className="mb-1">La fase menstrual es la primera fase del ciclo y la más visible. Comúnmente lo sabes porque es cuando sangras por la vagina durante varios días. La cantidad y el color de la sangre también pueden ser diferentes en cada caso. Lo normal es que al principio sea más abundante y roja y que luego disminuya y se vuelva más oscura o marrón.
                            </p>
                            <p className="mb-1">Esto ocurre porque el recubrimiento interno del útero, llamado endometrio, se desprende y se expulsa junto con sangre y otros fluidos.</p>
                            <p className="mb-2">En esta fase, bajan bruscamente los niveles de estrógeno y progesterona, lo que provoca el desprendimiento del revestimiento uterino (menstruación). Esta caída hormonal puede causar tristeza, irritabilidad, fatiga y dolor (cólicos). El cuerpo está más sensible física y emocionalmente.</p>
                            <p>Además, el fluido se presenta como sangrado menstrual (de color rojo, con posible presencia de coágulos); no hay moco cervical.</p>
                            <h5 className="fw-bold">Algunos de los sintomas asociados a la fase menstrual son...</h5>
                            <ListGroup className="mb-3">
                                <ListGroup.Item variant="info">Dolor abdominal</ListGroup.Item>
                                <ListGroup.Item variant="info">Cólicos</ListGroup.Item>
                                <ListGroup.Item variant="info">Hinchazón</ListGroup.Item>
                                <ListGroup.Item variant="info">Dolor de espalda</ListGroup.Item>
                                <ListGroup.Item variant="info">Dolor de cabeza / migrañas</ListGroup.Item>
                                <ListGroup.Item variant="info">Sensibilidad en el pecho</ListGroup.Item>
                                <ListGroup.Item variant="info">Cambios de humor / irritabilidad</ListGroup.Item>
                                <ListGroup.Item variant="info">Fatiga</ListGroup.Item>
                            </ListGroup>
                            <h5 className="fw-bold">Ahora hablemos de ti...</h5>
                            <p className="m-0">Según tu ciclo actual, tu fase menstrual ocurrió u ocurre entre el <span className="text-decoration-underline txt-azul-muy-oscuro">{SpanishDateString(reporte.faseMenstruacion.desde)}</span> y el <span className="text-decoration-underline txt-azul-muy-oscuro">{SpanishDateString(reporte.faseMenstruacion.hasta)}</span>.</p>
                            <p>Durante ese periodo, has registrado la siguiente información:</p>
                            {
                                (() => {

                                    let existeInfoFaseMenstruacion = Array.isArray(reporte.infoFaseMenstruacion) && reporte.infoFaseMenstruacion.length > 0; 

                                    let emociones = [];
                                    if (existeInfoFaseMenstruacion) {
                                        emociones = [...new Set(reporte.infoFaseMenstruacion.flatMap(r => r.emociones))].map(id => {
                                            const emocion = Emotions().find(e => e.id === Number(id));
                                            return emocion ? emocion.label : 'Desconocida';
                                        });
                                    }

                                    let molestias = [];
                                    if (existeInfoFaseMenstruacion) {
                                        molestias = [...new Set(reporte.infoFaseMenstruacion.flatMap(r => r.molestias))].map(id => {
                                            const molestia = BodyParts().find(e => e.id === Number(id));
                                            return molestia ? molestia.label : 'Desconocida';
                                        });
                                    }

                                    let sintomas = [];
                                    if (existeInfoFaseMenstruacion) {
                                        sintomas = [...new Set(reporte.infoFaseMenstruacion.flatMap(r => r.sintomas))].map(id => {
                                            const sintoma = Symptoms().find(e => e.id === Number(id));
                                            return sintoma ? sintoma.label : 'Desconocida';
                                        });
                                    }

                                    let fluidos = [];
                                    if (existeInfoFaseMenstruacion) {
                                        fluidos = [...new Set(reporte.infoFaseMenstruacion.flatMap(r => r.fluidoFemenino))].map(id => {
                                            const fluido = FemFluid().find(e => e.id === Number(id));
                                            return fluido ? fluido.label : 'Desconocida';
                                        });
                                    }

                                    return (
                                        <Table className="estadisticas-reporte--mini-tabla" size="sm">
                                            <tbody>
                                                <tr>
                                                    <td>Emociones</td>
                                                    <td>{emociones.length > 0 ? emociones.join(',') : <span className="text-danger fw-bold">No hay emociones registradas</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Molestias</td>
                                                    <td>{molestias.length > 0 ? molestias.join(',') : <span className="text-danger fw-bold">No hay molestias registradas</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Síntomas</td>
                                                    <td>{sintomas.length > 0 ? sintomas.join(',') : <span className="text-danger fw-bold">No hay síntomas registrados</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fluido</td>
                                                    <td>{fluidos.length > 0 ? fluidos.join(',') : <span className="text-danger fw-bold">No hay tipos de flujo registrados</span>}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    );
                                })()
                            }
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                            <h3 className="mb-2 fw-bold txt-rosa-oscuro">Fase folicular <span className="text-black">(desde el final del sangrado hasta la ovulación)</span></h3>
                            <p className="mb-1">En esta fase, se produce la maduración de un óvulo en uno de los ovarios. Este óvulo se encuentra dentro de una estructura llamada folículo, que crece gracias a la acción de una hormona llamada FSH (u hormona folículo estimulante). Al mismo tiempo, el endometrio se empieza a regenerar y engrosar para prepararse para recibir al óvulo si este es fecundado.</p>
                            <p className="mb-1">La fase folicular suele durar entre 10 y 14 días (dependiendo de la duración del ciclo) y termina cuando se produce la ovulación. En esta fase, puedes notar un aumento de tu libido o deseo sexual, así como un cambio en tu flujo vaginal, que se vuelve más claro, elástico y resbaladizo. </p>
                            <p className="mb-1">Comienza con niveles bajos de hormonas, pero el estrógeno empieza a subir de forma gradual. Esta subida mejora el ánimo, genera más energía, motivación y claridad mental, ya que el estrógeno tiene un efecto positivo en el cerebro, aumentando la dopamina y serotonina (neurotransmisores del bienestar).</p>
                            <p>Al principio el flujo es escaso o seco, pero va aumentando en cantidad y elasticidad, tornándose blanco o cremoso, señal del aumento del estrógeno.</p>
                            <h5 className="fw-bold">Algunos de los sintomas asociados a la fase folicular son...</h5>
                            <ListGroup className="mb-3">
                                <ListGroup.Item variant="info">Acné</ListGroup.Item>
                                <ListGroup.Item variant="info">Piel grasa</ListGroup.Item>
                                <ListGroup.Item variant="info">Aumento del apetito / antojos</ListGroup.Item>
                                <ListGroup.Item variant="info">Sensibilidad en el pecho</ListGroup.Item>
                                <ListGroup.Item variant="info">Dolor pélvico</ListGroup.Item>
                                <ListGroup.Item variant="info">Calambres</ListGroup.Item>
                            </ListGroup>
                            <h5 className="fw-bold">Ahora hablemos de ti...</h5>
                            <p className="m-0">Según tu ciclo actual, tu fase folicular ocurrió u ocurre entre el <span className="text-decoration-underline txt-azul-muy-oscuro">{SpanishDateString(reporte.faseFolicular.desde)}</span> y el <span className="text-decoration-underline txt-azul-muy-oscuro">{SpanishDateString(reporte.faseFolicular.hasta)}</span>.</p>
                            <p>Durante ese periodo, has registrado la siguiente información:</p>
                            {
                                (() => {

                                    let existeinfoFaseFolicular = Array.isArray(reporte.infoFaseFolicular) && reporte.infoFaseFolicular.length > 0; 

                                    let emociones = [];
                                    if (existeinfoFaseFolicular) {
                                        emociones = [...new Set(reporte.infoFaseFolicular.flatMap(r => r.emociones))].map(id => {
                                            const emocion = Emotions().find(e => e.id === Number(id));
                                            return emocion ? emocion.label : 'Desconocida';
                                        });
                                    }

                                    let molestias = [];
                                    if (existeinfoFaseFolicular) {
                                        molestias = [...new Set(reporte.infoFaseFolicular.flatMap(r => r.molestias))].map(id => {
                                            const molestia = BodyParts().find(e => e.id === Number(id));
                                            return molestia ? molestia.label : 'Desconocida';
                                        });
                                    }

                                    let sintomas = [];
                                    if (existeinfoFaseFolicular) {
                                        sintomas = [...new Set(reporte.infoFaseFolicular.flatMap(r => r.sintomas))].map(id => {
                                            const sintoma = Symptoms().find(e => e.id === Number(id));
                                            return sintoma ? sintoma.label : 'Desconocida';
                                        });
                                    }

                                    let fluidos = [];
                                    if (existeinfoFaseFolicular) {
                                        fluidos = [...new Set(reporte.infoFaseFolicular.flatMap(r => r.fluidoFemenino))].map(id => {
                                            const fluido = FemFluid().find(e => e.id === Number(id));
                                            return fluido ? fluido.label : 'Desconocida';
                                        });
                                    }

                                    return (
                                        <Table className="estadisticas-reporte--mini-tabla" size="sm">
                                            <tbody>
                                                <tr>
                                                    <td>Emociones</td>
                                                    <td>{emociones.length > 0 ? emociones.join(',') : <span className="text-danger fw-bold">No hay emociones registradas</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Molestias</td>
                                                    <td>{molestias.length > 0 ? molestias.join(',') : <span className="text-danger fw-bold">No hay molestias registradas</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Síntomas</td>
                                                    <td>{sintomas.length > 0 ? sintomas.join(',') : <span className="text-danger fw-bold">No hay síntomas registrados</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fluido</td>
                                                    <td>{fluidos.length > 0 ? fluidos.join(',') : <span className="text-danger fw-bold">No hay tipos de flujo registrados</span>}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    );
                                })()
                            }
                        </div>
                        <div className="d-flex flex-column gap-2 mb-3">
                            <h3 className="mb-2 fw-bold txt-rosa-oscuro">Fase ovulatioria <span className="text-black">(alrededor del día 14)</span></h3>
                            <p className="mb-1"> Es cuando se libera el óvulo maduro del ovario hacia la trompa de Falopio. Esto ocurre debido a un aumento en la concentración de hormonas luteinizante y foliculoestimulante que provoca la rotura del folículo y la expulsión del óvulo.</p>
                            <p className="mb-1">La fase ovulatoria es un momento clave en el ciclo menstrual. Durante esta fase, el óvulo maduro es liberado de uno de los folículos. Esta fase dura generalmente un par de días y representa el período más fértil para una mujer.</p>
                            <p>Aquí el estrógeno alcanza su punto máximo, y se produce un aumento de la hormona luteinizante (LH), que desencadena la ovulación. Estos cambios provocan un aumento en la autoestima, mayor deseo sexual, y más sociabilidad, ya que el cuerpo está biológicamente preparado para la fecundación y responde con bienestar y confianza. El moco cervical está en su punto máximo: claro, elástico y resbaloso como clara de huevo, lo que facilita el paso de los espermatozoides.</p>
                            <h5 className="fw-bold">Algunos de los sintomas asociados a la fase ovulatoria son...</h5>
                            <ListGroup className="mb-3">
                                <ListGroup.Item variant="info">Aumento del flujo vaginal</ListGroup.Item>
                                <ListGroup.Item variant="info">Cambio en el color o el olor de la orina</ListGroup.Item>
                                <ListGroup.Item variant="info">Sensibilidad en el pecho</ListGroup.Item>
                                <ListGroup.Item variant="info">Hinchazón o retención de líquidos</ListGroup.Item>
                                <ListGroup.Item variant="info">Calambres</ListGroup.Item>
                                <ListGroup.Item variant="info">Cambios emocionales</ListGroup.Item>
                                <ListGroup.Item variant="info">Dolor intermenstrual (síndrome de Mittelschmerz)</ListGroup.Item>
                            </ListGroup>
                            <h5 className="fw-bold">Ahora hablemos de ti...</h5>
                            <p className="m-0">Según tu ciclo actual, tu fase ovulatoria ocurrió u ocurre entre el <span className="text-decoration-underline txt-azul-muy-oscuro">{SpanishDateString(reporte.faseOvulacion.desde)}</span> y el <span className="text-decoration-underline txt-azul-muy-oscuro">{SpanishDateString(reporte.faseOvulacion.hasta)}</span>.</p>
                            <p>Durante ese periodo, has registrado la siguiente información:</p>
                            {
                                (() => {

                                    let existeinfoFaseOvulacion = Array.isArray(reporte.infoFaseOvulacion) && reporte.infoFaseOvulacion.length > 0; 

                                    let emociones = [];
                                    if (existeinfoFaseOvulacion) {
                                        emociones = [...new Set(reporte.infoFaseOvulacion.flatMap(r => r.emociones))].map(id => {
                                            const emocion = Emotions().find(e => e.id === Number(id));
                                            return emocion ? emocion.label : 'Desconocida';
                                        });
                                    }

                                    let molestias = [];
                                    if (existeinfoFaseOvulacion) {
                                        molestias = [...new Set(reporte.infoFaseOvulacion.flatMap(r => r.molestias))].map(id => {
                                            const molestia = BodyParts().find(e => e.id === Number(id));
                                            return molestia ? molestia.label : 'Desconocida';
                                        });
                                    }

                                    let sintomas = [];
                                    if (existeinfoFaseOvulacion) {
                                        sintomas = [...new Set(reporte.infoFaseOvulacion.flatMap(r => r.sintomas))].map(id => {
                                            const sintoma = Symptoms().find(e => e.id === Number(id));
                                            return sintoma ? sintoma.label : 'Desconocida';
                                        });
                                    }

                                    let fluidos = [];
                                    if (existeinfoFaseOvulacion) {
                                        fluidos = [...new Set(reporte.infoFaseOvulacion.flatMap(r => r.fluidoFemenino))].map(id => {
                                            const fluido = FemFluid().find(e => e.id === Number(id));
                                            return fluido ? fluido.label : 'Desconocida';
                                        });
                                    }

                                    return (
                                        <Table className="estadisticas-reporte--mini-tabla" size="sm">
                                            <tbody>
                                                <tr>
                                                    <td>Emociones</td>
                                                    <td>{emociones.length > 0 ? emociones.join(',') : <span className="text-danger fw-bold">No hay emociones registradas</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Molestias</td>
                                                    <td>{molestias.length > 0 ? molestias.join(',') : <span className="text-danger fw-bold">No hay molestias registradas</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Síntomas</td>
                                                    <td>{sintomas.length > 0 ? sintomas.join(',') : <span className="text-danger fw-bold">No hay síntomas registrados</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fluido</td>
                                                    <td>{fluidos.length > 0 ? fluidos.join(',') : <span className="text-danger fw-bold">No hay tipos de flujo registrados</span>}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    );
                                })()
                            }
                        </div>
                        <div className="d-flex flex-column gap-2 mb-4">
                            <h3 className="mb-2 fw-bold txt-rosa-oscuro">Fase lútea <span className="text-black">(después de la ovulación hasta la menstruación)</span></h3>
                            <p className="mb-1">La fase lútea es la cuarta y última de las fases del ciclo menstrual y empieza después de la ovulación. En esta fase, el folículo roto se transforma en una estructura llamada cuerpo lúteo, que produce progesterona.</p>
                            <p className="mb-1">Esta hormona tiene como función mantener el endometrio grueso y vascularizado por si el óvulo es fecundado e implantado. Si esto ocurre, el cuerpo lúteo sigue produciendo progesterona hasta que la placenta se forma y se hace cargo de la producción hormonal. Si no hay fecundación ni implantación, el cuerpo lúteo se degenera y deja de producir progesterona, lo que provoca el desprendimiento del endometrio y el inicio de un nuevo ciclo menstrual.</p>
                            <p>El moco cervical se vuelve más pegajoso, espeso y blanquecino, y puede disminuir hasta estar casi seco antes de la regla.</p>
                            <h5 className="fw-bold">Algunos de los sintomas asociados a la fase lútea son...</h5>
                            <ListGroup className="mb-3">
                                <ListGroup.Item variant="info">Cambios de humor</ListGroup.Item>
                                <ListGroup.Item variant="info">Depresión</ListGroup.Item>
                                <ListGroup.Item variant="info">Ansiedad</ListGroup.Item>
                                <ListGroup.Item variant="info">Nerviosismo</ListGroup.Item>
                                <ListGroup.Item variant="info">Insomnio</ListGroup.Item>
                                <ListGroup.Item variant="info">Calambres</ListGroup.Item>
                                <ListGroup.Item variant="info">Dolor de espalda o muscular</ListGroup.Item>
                                <ListGroup.Item variant="info">Acné</ListGroup.Item>
                                <ListGroup.Item variant="info">Piel seca</ListGroup.Item>
                                <ListGroup.Item variant="info">Cambios de peso</ListGroup.Item>
                            </ListGroup>
                            <h5 className="fw-bold">Ahora hablemos de ti...</h5>
                            <p className="m-0">Según tu ciclo actual, tu fase lútea ocurrió u ocurre entre el <span className="text-decoration-underline txt-azul-muy-oscuro">{SpanishDateString(reporte.faseLutea.desde)}</span> y el <span className="text-decoration-underline txt-azul-muy-oscuro">{SpanishDateString(reporte.faseLutea.hasta)}</span>.</p>
                            <p>Durante ese periodo, has registrado la siguiente información:</p>
                            {
                                (() => {

                                    let existeinfoFaseLutea = Array.isArray(reporte.infoFaseLutea) && reporte.infoFaseLutea.length > 0; 

                                    let emociones = [];
                                    if (existeinfoFaseLutea) {
                                        emociones = [...new Set(reporte.infoFaseLutea.flatMap(r => r.emociones))].map(id => {
                                            const emocion = Emotions().find(e => e.id === Number(id));
                                            return emocion ? emocion.label : 'Desconocida';
                                        });
                                    }

                                    let molestias = [];
                                    if (existeinfoFaseLutea) {
                                        molestias = [...new Set(reporte.infoFaseLutea.flatMap(r => r.molestias))].map(id => {
                                            const molestia = BodyParts().find(e => e.id === Number(id));
                                            return molestia ? molestia.label : 'Desconocida';
                                        });
                                    }

                                    let sintomas = [];
                                    if (existeinfoFaseLutea) {
                                        sintomas = [...new Set(reporte.infoFaseLutea.flatMap(r => r.sintomas))].map(id => {
                                            const sintoma = Symptoms().find(e => e.id === Number(id));
                                            return sintoma ? sintoma.label : 'Desconocida';
                                        });
                                    }

                                    let fluidos = [];
                                    if (existeinfoFaseLutea) {
                                        fluidos = [...new Set(reporte.infoFaseLutea.flatMap(r => r.fluidoFemenino))].map(id => {
                                            const fluido = FemFluid().find(e => e.id === Number(id));
                                            return fluido ? fluido.label : 'Desconocida';
                                        });
                                    }

                                    return (
                                        <Table className="estadisticas-reporte--mini-tabla" size="sm">
                                            <tbody>
                                                <tr>
                                                    <td>Emociones</td>
                                                    <td>{emociones.length > 0 ? emociones.join(',') : <span className="text-danger fw-bold">No hay emociones registradas</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Molestias</td>
                                                    <td>{molestias.length > 0 ? molestias.join(',') : <span className="text-danger fw-bold">No hay molestias registradas</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Síntomas</td>
                                                    <td>{sintomas.length > 0 ? sintomas.join(',') : <span className="text-danger fw-bold">No hay síntomas registrados</span>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fluido</td>
                                                    <td>{fluidos.length > 0 ? fluidos.join(',') : <span className="text-danger fw-bold">No hay tipos de flujo registrados</span>}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    );
                                })()
                            }
                        </div>
                    </div>
                )}
                {(reporte !== null && reporte !== undefined && reporte.opcion == 3) && (
                    
                    <div className="estadisticas-reporte reporte-tabla container d-flex flex-column gap-3 align-items-center">
                        <div className="d-flex flex-column align-items-center gap-3">
                            <h2 className="estadisticas-reporte--titulo">Historial de ciclos</h2>
                            <h5>El historial tiene incluido los ciclos predicción hasta la fecha.</h5>
                        </div>
                        <DataTable
                        id="historial-ciclos"      
                        className="display" 
                        options={options}
                        data={reporte.menstruacionesFilas}
                        width="100%"
                        >
                            <thead>
                                <tr>
                                    <th>Inicio del ciclo</th>
                                    <th>Duración de la menstruación</th>
                                    <th>Duración del ciclo</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                )}
            </div>
            {(() => {
                if (reporte) {
                    if (reporte.opcion != 2) {
                        return (
                            <div className="estadisticas-exportar">
                                <button className="btn-blue" onClick={() => GenerarExcel()}>
                                    Exportar a Excel <i class="fi fi-rr-file-spreadsheet d-inline-block"></i>
                                </button>
                            </div>
                        );
                    } else {
                        return (
                            <div className="estadisticas-exportar">
                                <button className="btn btn-secondary">
                                    Este reporte no se puede descargar.
                                </button>
                            </div>
                        );
                    }
                }
            })()}
        </article>
    );
}