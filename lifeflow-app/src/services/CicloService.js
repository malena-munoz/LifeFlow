import { Notyf } from 'notyf';
import { CurrentDate } from './DateTimeService';
export const notyf = new Notyf();

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function CiclosTrimestre(id, nombre, apellidos) {

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
        const response = await fetch(`https://localhost:7245/api/ciclos/trimestre/${id}`, opciones);

        if (!response.ok) {
            const error = await response.json();
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        notyf.error("Error del servidor al recoger los ciclos.");
        return [];
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function Embarazo(id, nombre, apellidos) {

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
        const response = await fetch(`https://localhost:7245/api/ciclos/embarazo/${id}`, opciones);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        return null;
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function BorrarEmbarazo(id, nombre, apellidos, id_embarazo) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nombre: nombre,
            Apellidos: apellidos,
            IdEmbarazo: id_embarazo
        })
    };

    try {
        const response = await fetch(`https://localhost:7245/api/ciclos/borrar-embarazo/${id}`, opciones);

        if (!response.ok) {
            const error = await response.json();
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return;
        }

        notyf.success("Embarazo borrado.");

    } catch (error) {
        notyf.error("Error del servidor al borrar el embarazo.");
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function TerminarEmbarazo(id, nombre, apellidos, id_embarazo, parto) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nombre: nombre,
            Apellidos: apellidos,
            IdEmbarazo: id_embarazo,
            Parto: parto
        })
    };

    try {
        const response = await fetch(`https://localhost:7245/api/ciclos/terminar-embarazo/${id}`, opciones);

        if (!response.ok) {
            const error = await response.json();
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return;
        }

        notyf.success("Embarazo terimando. ¡Felicidades!");

    } catch (error) {
        notyf.error("Error del servidor al terminar el embarazo.");
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function RegistrarSangrado(id, nombre, apellidos, fecha) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nombre: nombre,
            Apellidos: apellidos,
            Fecha: fecha
        })
    };

    try {
        const response = await fetch(`https://localhost:7245/api/ciclos/agregar-sangrado/${id}`, opciones);

        if (!response.ok) {
            const error = await response.json();
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return;
        }

        notyf.success("Sangrado registrado.");

    } catch (error) {
        notyf.error("Error del servidor al registrar el sangrado.");
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function BorrarSangrado(id, nombre, apellidos, fecha) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nombre: nombre,
            Apellidos: apellidos,
            Fecha: fecha
        })
    };

    try {
        const response = await fetch(`https://localhost:7245/api/ciclos/borrar-sangrado/${id}`, opciones);

        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return;
        }

        notyf.success("Sangrado borrado.");

    } catch (error) {
        notyf.error("Error del servidor al borrar el sangrado.");
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export function DiasDeSangrado(ciclos) {
    let dias = [];

    if (Array.isArray(ciclos) && ciclos.length > 0) {
        ciclos.forEach(c => {
            let fechaInicio = new Date(c.inicioCiclo);

            if (c.duracionMenstruacion > 0) {
                for (let i = 0; i < c.duracionMenstruacion; i++) {
                    let fecha = new Date(fechaInicio); // Copiar fecha original
                    fecha.setDate(fecha.getDate() + i); // Sumarle días correctamente
                    dias.push({ 
                        dia: CurrentDate(fecha.getDate(), fecha.getMonth(), fecha.getFullYear()), 
                        esPrediccion: c.esPrediccion 
                    });
                }
            } else {
                dias.push({ 
                    dia: CurrentDate(fechaInicio.getDate(), fechaInicio.getMonth(), fechaInicio.getFullYear()), 
                    esPrediccion: false
                });
            }
        });
    }

    dias.sort((a, b) => new Date(a.dia) - new Date(b.dia));

    return dias;
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export function DiasFertiles(ciclos) {
    const fechasFertiles = [];

    if (Array.isArray(ciclos) && ciclos.length > 0) {
        ciclos.filter(ciclo =>
            ciclo.duracionCiclo > 0 && ciclo.duracionMenstruacion > 0
        )
        .forEach(ciclo => {
            const inicio = new Date(ciclo.inicioCiclo);
            const ovulacion = new Date(inicio);
            ovulacion.setDate(ovulacion.getDate() + ciclo.duracionCiclo - 14);

            const inicioFertilidad = new Date(ovulacion);
            inicioFertilidad.setDate(inicioFertilidad.getDate() - 5);

            for (let i = 0; i <= 5; i++) {
                const diaFertil = new Date(inicioFertilidad);
                diaFertil.setDate(diaFertil.getDate() + i);

                fechasFertiles.push(CurrentDate(diaFertil.getDate(), diaFertil.getMonth() + 1, diaFertil.getFullYear()));
            }
        });
    } 

    return fechasFertiles;
}

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export function EsDiaDeSangrado(dia, mes, anio, sangrados) {
    let fecha = CurrentDate(dia, mes, anio);

    if (sangrados !== null && sangrados !== undefined && sangrados.length > 0) { 
        let existe = sangrados.find(s => s.dia === fecha);
        return existe !== null && existe !== undefined ? true : false;
    } else {
        return false;
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export function ClaseSangrado(dia, mes, anio, sangrados) {
    let fecha = new Date(CurrentDate(dia, Number(mes+1), anio));
    let actual = new Date();

    let sangrado = sangrados.find(s => s.dia === CurrentDate(dia, mes, anio));

    if (sangrado !== null && sangrado !== undefined) {
        if (sangrado.esPrediccion) {  // Si es predicción
            let esFechaPasada = fecha < actual;
            return esFechaPasada ? 'day-period--estimated' : 'day-period';
        } else {
            return 'day-period--estimated';
        }
    } else {
        return '';
    }   
}