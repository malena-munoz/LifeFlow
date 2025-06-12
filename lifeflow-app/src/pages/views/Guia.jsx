import { HorizontalRuleOutlined } from "@mui/icons-material";
import Img1 from '../../assets/img/1.png';
import Img2 from '../../assets/img/2.png';
import Img3 from '../../assets/img/3.png';
import Img4 from '../../assets/img/4.png';
import Img5 from '../../assets/img/5.png';
import Img6 from '../../assets/img/6.png';
import Img7 from '../../assets/img/7.png';
import Img8 from '../../assets/img/8.png';
import Img9 from '../../assets/img/9.png';
import Img10 from '../../assets/img/10.png';
import Img11 from '../../assets/img/11.png';
import Img12 from '../../assets/img/12.png';
import Img13 from '../../assets/img/13.png';
import Img14 from '../../assets/img/14.png';
import Img15 from '../../assets/img/15.png';
import Img16 from '../../assets/img/16.png';

export default function Guia() {
    return (
        <article page="estadisticas"className="container d-flex flex-column gap-4">
            <div className="d-flex align-items-center gap-2">
                <h1 className="txt-rosa-oscuro fw-bold m-0">Guía</h1>
                <HorizontalRuleOutlined/>
                <h5 className="m-0">Esta página recoge el manual de usuario oficial del proyecto.</h5>
            </div>
            <hr className="separator"/>
            <div className="d-flex flex-column gap-2">
                <h4 className="txt-azul-oscuro">Inicio de sesión</h4>
                <p>Al iniciar la aplicación, lo primero que sale es la página de bienvenida con un botón superior derecho para iniciar sesión. Esta página define la aplicación, las tecnologías usadas durante el desarrollo y la finalidad de esta.</p>
                <img src={Img1} className="w-50" />
                <p className="mt-3">Al hacer clic al botón de iniciar sesión con Google, aparecerá una ventana modal en el centro de la pantalla para seleccionar una de tus cuentas de Google iniciadas previamente. Como actualmente el cliente está en modo de prueba, el acceso está habilitado para las personas que están configuradas dentro de Google Cloud.</p>
                <img src={Img2} className="w-50" />
                <img src={Img3} className="w-50" />
                <p className="mt-3">Si continuamos, Google nos pedirá dar permisos para que LifeFlow pueda utilizar los servicios de Google Calendar hacia ti.</p>
                <img src={Img4} className="w-50" />
            </div>
            <hr className="separator"/>
            <div className="d-flex flex-column gap-2">
                <h4 className="txt-azul-oscuro">Página principal "Calendario"</h4>
                <p>Al terminar de iniciar sesión con Google, LifeFlow nos va a pedir unos datos acerca de nuestro anterior ciclo para así hacer las predicciones iniciales.</p>
                <img src={Img5} className="w-50" />
                <p className="mt-3">Al introducirlas, la página se recargará con el último ciclo registrado y los ciclos siguientes predichos, junto con posibles periodos de ovulación. Las predicciones son los días con bordes en guion y los días reales “que ocurrió sangrado”, aparecerá relleno.</p>
                <img src={Img6} className="w-50" />
                <p className="mt-3">Si queremos introducir datos diarios o sangrados sobre nuestro ciclo menstrual, se encuentra un formulario en el lateral derecho del calendario, en donde podrás registrar o borrar los sangrados, estados (emociones, molestias, síntomas y fluido femenino), prueba de embarazo y notas de texto. Para poder registrar alguna de estas características, se tiene que haber seleccionado el día previamente haciendo clic en él dentro del calendario (el día se bordearía de azul si está seleccionado, y aparecería señalado en el formulario).</p>
                <img src={Img7} className="w-50" />
                <p className="mt-3">Cuando guardamos los cambios, la página se recargará y ese día, le saldrá un icono de información, que haciéndole clic podremos ver la información registrada ese día.</p>
                <img src={Img8} className="w-50" />
                <p className="mt-3">
                    Pongamos el caso de que, registramos una prueba de embarazo positiva. En ese caso, cuando la página se recargue, el calendario habilitará el modo embarazo, que es una ventana con enlaces de interés e información sobre la posible concepción. En este modo, puedes tanto registrar el día del parto como eliminarlo por si fue un error de registro. El modo embarazo es una opción la cual no elimina la vista normal del calendario, el usuario podrá seguir viendo su calendario por si interesa saber su hipotético ciclo menstrual pese a estar embarazada.
                </p>
                <img src={Img9} className="w-50" />
            </div>
            <hr className="separator" />
            <div className="d-flex flex-column gap-2">
                <h4 className="txt-azul-oscuro">Recordatorios</h4>
                <p>Una parte de los ciclos menstruales, puede involucrar la toma de medicamentos o la visita del médico. LifeFlow puede crear recordatorios para cubrir esas necesidades. Para acceder al módulo de recordatorios, hacer clic en el apartado de “Recordatorios” en la navegación superior y una vez dentro, la página consiste en una tabla con todos los recordatorios registrados, una ventana derecha para mostrar su información al hacer clic en una, y un botón de registro.</p>
                <img src={Img10} className="w-50" />
                <p className="mt-3">
                    Cuando queramos crear un recordatorio, hacemos clic en el botón de agregar recordatorio. Aparecerá un modal con un formulario para rellenar datos acerca de la cita y cuando esté creado, aparecerá en la tabla de la página. Un recordatorio creado se podrá modificar desde un mismo modal y borrar con confirmación de acción.
                </p>
                <img src={Img11} className="w-50" />
                <img src={Img12} className="w-50" />
            </div>
            <hr className="separator" />
            <div className="d-flex flex-column gap-2">
                <h4 className="txt-azul-oscuro">Reportes (Estadisticas)</h4>
                <p>LifeFlow ofrece reportes al usuario para obtener más información acerca de sus ciclos a través del apartado de estadísticas en la navegación superior. Hay 3 modelos diferentes y 2 de ellos tienen la opción de exportarlo en Excel. Para ver el reporte, hay que seleccionar la opción que se desee.</p>
                <img src={Img13} className="w-50" />
                <p className="mt-3">
                    Si el reporte tiene la posibilidad de exportarlo a Excel, aparecerá indicado en la parte inferior derecha.
                </p>
                <img src={Img14} className="w-50" />
                <img src={Img15} className="w-50" />
            </div>
            <hr className="separator" />
            <div className="d-flex flex-column gap-2 pb-5">
                <h4 className="txt-azul-oscuro">Privacidad</h4>
                <p>El apartado de privacidad, que recoge la declaración de privacidad y los permisos del proyecto. Para verlo basta con hacer clic en su apartado de la navegación superior.</p>
                <img src={Img16} className="w-50" />
            </div>
        </article>
    );
}