import React, { useState } from "react";
import icono_app from '../../assets/img/lifeflow-full-filled.png';
import titulo_app from '../../assets/img/lifeflow-text-rosa.png';
import LogoutIcon from '@mui/icons-material/Logout';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { GoogleLogout } from '../logic/Google';

export default function Nav(props) {
    const [iconClicked, setIconClicked] = useState(false);
    const user = props.user;
    console.log(user);

    const toggleIconClicked = () => {
        setIconClicked(prev =>  prev === true ? false : true);
    };

    return (
        <nav>
            <div class="col d-flex align-items-center justify-content-start gap-3">
                <img id="icono-app" src={icono_app} alt="" />
                <img id="titulo-app" src={titulo_app} alt="" />
            </div>
            <div class="col d-flex align-items-center justify-content-center gap-4">
                <ul>
                    <li><a>Calendario</a></li>
                    <li><a>Recordatorios</a></li>
                    <li><a>Estadísticas</a></li>
                    <li><a>Guía</a></li>
                    <li><a>Privacidad</a></li>
                </ul> 
            </div>
            <div className="col d-flex align-items-center justify-content-end gap-3">
                <span>¡Hola, {user.given_name}!</span>
                <div className={`h-100 ${iconClicked ? 'open-settings' : '' }`} onClick={() => toggleIconClicked()}>
                    <img id="icono-perfil" className="rounded-circle" src={user.picture} alt="" />
                    {iconClicked && (
                        <div className="settings">
                            <a><EditCalendarIcon/> Valores menstruales</a>
                            <a onClick={() => GoogleLogout(props.setLoginStatus)}><LogoutIcon/> Cerrar sesión</a>
                        </div>
                    )}
                </div>
            </div>  
        </nav>
    )
}
