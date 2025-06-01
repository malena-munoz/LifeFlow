import { Notyf } from 'notyf';

export const notyf = new Notyf();

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function GuardarInformacionDiaria(id, nombre, apellidos, informacion_diaria) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nombre: nombre,
            Apellidos: apellidos,
            InformacionDiaria: informacion_diaria
        })
    };

    try {
        const response = await fetch(`https://localhost:7245/api/info-diaria/guardar/${id}`, opciones);

        if (!response.ok) {
            const error = await response.json();
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return;
        }

        notyf.success("Síntomas registrados con éxito. Recarga la página para reflejar los cambios.");
    } catch (error) {
        notyf.error("No se han registrado los síntomas debido a un error durante el proceso.");
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function InformacionDiariaTrimestre(id, nombre, apellidos) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nombre: nombre,
            Apellidos: apellidos,
        })
    };

    try {
        const response = await fetch(`https://localhost:7245/api/info-diaria/trimestre/${id}`, opciones);

        if (!response.ok) {
            const error = await response.json();
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        notyf.error("No se han registrado los síntomas debido a un error durante el proceso.");
        return [];
    }
}