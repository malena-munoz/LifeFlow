import React, { Component } from "react";
import icono_app from '../../assets/img/lifeflow-full-filled.png';
import titulo_app from '../../assets/img/lifeflow-text-rosa.png';

export default function Nav(props) {
    const user = props.user;
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
            <div class="col d-flex align-items-center justify-content-end gap-3">
                <span>¡Hola, {user.given_name}!</span>
                <img id="icono-perfil" class="rounded-circle" src={user.picture} alt="" />
            </div>  
        </nav>
    )
}
