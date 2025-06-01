import { Notyf } from 'notyf';
export const notyf = new Notyf();

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function EsNuevoUsuario(id, nombre, apellidos) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nombre: nombre,
            Apellidos: apellidos
        })
    };

    try {
        
        const response = await fetch(`https://localhost:7245/api/usuario/${id}`, opciones);

        if (!response.ok) { return true; }

        const data = await response.json();

        return data.id == "-1" ? true : false;

    } catch (error) {
        return true;
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function GuardarDatosCicloBase(id, nombre, apellidos, ciclo) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nombre: nombre,
            Apellidos: apellidos,
            DatosCiclo: ciclo
        })
    };

    try {

        const response = await fetch(`https://localhost:7245/api/usuario/guardar-datos-ciclo-base/${id}`, opciones);

        if (!response.ok) {
            return response.text().then(errorText => {
                notyf.error(`Error del servidor (${response.status}): ${errorText}`);
                throw new Error(errorText);
            });
        }

        notyf.success("Datos guardados. Se recargará la página en breve.");

        setTimeout(() => {
            window.location.reload();
        }, 2000);

    } catch (error) {
        notyf.error("No se han guardado los datos debido a un error durante el proceso.");
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

