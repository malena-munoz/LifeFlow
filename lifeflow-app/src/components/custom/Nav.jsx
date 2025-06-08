import React, { useState } from "react";
import IconoLifeFlow from '../../assets/img/lifeflow-full-filled.png';
import TituloLifeFlow from '../../assets/img/lifeflow-text-rosa.png';
import DefaultUserIcon from '../../assets/img/default-user-icon.png';
import { EditCalendar, Logout } from '@mui/icons-material';
import { GoogleLogout } from '../../services/Google';

export default function Nav(props) {
    const user = props.user

    const [iconClicked, setIconClicked] = useState(false);
    const [userPicture, setUserPicture] = useState(user.picture);
    
    const toggleIconClicked = () => {
        setIconClicked(prev =>  prev === true ? false : true);
    };

    return (
        <>
            <nav>
                <div className="col d-flex align-items-center justify-content-start gap-3">
                    <img id="icono-app" src={IconoLifeFlow} alt="" />
                    <img id="titulo-app" src={TituloLifeFlow} alt="" />
                </div>
                <div className="col d-flex align-items-center justify-content-center gap-4">
                    <ul>
                        <li onClick={() => props.setPage(1)}><a>Calendario</a></li>
                        <li onClick={() => props.setPage(2)}><a>Recordatorios</a></li>
                        <li onClick={() => props.setPage(3)}><a>Estadísticas</a></li>
                        <li onClick={() => props.setPage(4)}><a>Guía</a></li>
                        <li onClick={() => props.setPage(5)}><a>Privacidad</a></li>
                    </ul> 
                </div>
                <div className="col d-flex align-items-center justify-content-end gap-3">
                    <span>¡Hola, {user.given_name.trim()}!</span>
                    <div className={`h-100 ${iconClicked ? 'open-settings' : '' }`} onClick={() => toggleIconClicked()}>
                        <img id="icono-perfil" 
                        className="rounded-circle" 
                        src={userPicture} onError={() => setUserPicture(DefaultUserIcon)}/>
                        {iconClicked && (
                            <div className="settings">
                                <a onClick={() => GoogleLogout(props.setLoginStatus)}><Logout/> Cerrar sesión</a>
                            </div>
                        )}
                    </div>
                </div>  
            </nav>
        </>
    )
}
