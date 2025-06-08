import { Notyf } from 'notyf';
import { CurrentDate } from './DateTimeService';
export const notyf = new Notyf();

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function ReporteOpcion1(id) {

    const opciones = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "IdUsuario": id
        }
    };

    try {
        const response = await fetch(`https://localhost:7245/api/reporte/opcion-1`, opciones);

        if (!response.ok) {
            const error = await response.json();
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return null;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        notyf.error("Error del servidor al generar el reporte.");
        return null;
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function ExcelOpcion1(id, nombre) {

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    };

    try {
        const response = await fetch(`https://localhost:7245/api/reporte/excel-opcion-1/${id}`, opciones);

        if (!response.ok) {
            const contentType = response.headers.get("Content-Type") || "";
            if (contentType.includes("application/json")) {
                const error = await response.json();
                notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            } else {
                const errorText = await response.text(); // ← maneja respuestas en texto o HTML
                notyf.error(`Error del servidor: ${errorText}`);
                console.log(errorText);
            }
            return;
        }

        const data = await response.arrayBuffer();
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Crear y descargar el archivo
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download =  `Excel_Opcion1 - ${nombre} (${new Date().toISOString().split('T')[0]}).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.log(error);
        notyf.error("Error del servidor al exportar el excel.");
    }
}
// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
export async function ReporteOpcion2(id) {

    const opciones = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "IdUsuario": id
        }
    };

    try {
        const response = await fetch(`https://localhost:7245/api/reporte/opcion-2`, opciones);

        if (!response.ok) {
            const error = await response.json();
            notyf.error(`Error del servidor (${error.status}): ${error.title}`);
            return null;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        notyf.error("Error del servidor al generar el reporte.");
        return null;
    }
}