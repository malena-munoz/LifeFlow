export function SpanishDateString (date, incluirHora = false){
    const fecha = new Date(date);
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...(incluirHora && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // formato 24h
        })
    };

    const fechaFormateada = fecha.toLocaleString('es-ES', opciones);
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}