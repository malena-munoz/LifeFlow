import { DeleteGoogleReminder } from "./Google";

export function ReminderButtonOptions(reminder_id, token, identifier, setDisplayEditReminderModal) {
    // Contenedor de los botones de opciones
    let contenedor_botones = document.createElement('div');
    contenedor_botones.className = 'd-none justify-content-center gap-2';

    // Botón de editar
    let btn_editar = document.createElement('i');
    btn_editar.className = 'icon-btn edit-icon expand-option';
    btn_editar.innerHTML = `<i class='fi fi-rr-pen-clip'></i>`;
    btn_editar.onclick = () => {
        setDisplayEditReminderModal(true);
    };

    // Botón de borrar
    let btn_borrar = document.createElement('i');
    btn_borrar.className = 'icon-btn delete-icon expand-option';
    btn_borrar.onclick = (e) => {
        e.currentTarget.classList.toggle('expanded');
    };

    let icono_borrar = document.createElement('i');
    icono_borrar.className = 'fi fi-rr-trash';

    // Contenedor de confirmar borrado
    let contenedor_confirmar_borrar = document.createElement('div');
    contenedor_confirmar_borrar.className = 'expanded-container';

    // Botón de borrar
    let btn_confirmar_borrar = document.createElement('button');
    btn_confirmar_borrar.className = 'fst-normal';
    btn_confirmar_borrar.textContent = 'Si';
    btn_confirmar_borrar.onclick = () => {
        DeleteGoogleReminder(reminder_id, token, identifier);
    };

    // Texto identificativo
    let span_confirmar_borrar = document.createElement('span');
    span_confirmar_borrar.className = 'fst-normal';
    span_confirmar_borrar.textContent = '¿De verdad quieres borrarlo?';

    contenedor_confirmar_borrar.appendChild(span_confirmar_borrar);
    contenedor_confirmar_borrar.appendChild(btn_confirmar_borrar);
    btn_borrar.appendChild(icono_borrar);
    btn_borrar.appendChild(contenedor_confirmar_borrar);
    contenedor_botones.appendChild(btn_editar);
    contenedor_botones.appendChild(btn_borrar);

    return contenedor_botones;
}