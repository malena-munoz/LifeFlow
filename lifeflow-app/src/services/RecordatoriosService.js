import { RRule } from 'rrule';

function formatearDuracion(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = Math.round(minutos % 60);
    return `${horas}h ${mins}min`;
}

function formatearHora(fecha) {
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`; 
}


export function AgruparRecordatoriosPorDia(eventos) {
    const eventosPorDia = {};

    if (eventos !== null && eventos !== undefined && eventos.length > 0) {
        eventos.forEach(evento => {
            const inicio = new Date(evento.start.dateTime || evento.start.date);
            const fin = new Date(evento.end.dateTime || evento.end.date);
            const duracionMin = (fin - inicio) / (1000 * 60);
            const duracionFormateada = formatearDuracion(duracionMin);

            const detallesEvento = {
                title: evento.summary,
                colorId: evento.colorId || null,
                duration: duracionFormateada,
                time: formatearHora(inicio)
            };

            if (evento.recurrence && evento.recurrence.length > 0) {
            const textoRegla = evento.recurrence.find(r => r.startsWith('RRULE'));
            const regla = RRule.fromString(textoRegla.replace('RRULE:', ''));
            const rrule = new RRule({
                ...regla.origOptions,
                dtstart: inicio,
            });

            const fechas = rrule.all();
            fechas.forEach(fecha => {
                const dia = fecha.toISOString().split('T')[0];
                if (!eventosPorDia[dia]) eventosPorDia[dia] = [];
                eventosPorDia[dia].push({ ...detallesEvento });
            });
            } else {
            const dia = inicio.toISOString().split('T')[0];
            if (!eventosPorDia[dia]) eventosPorDia[dia] = [];
            eventosPorDia[dia].push({ ...detallesEvento });
            }
        });
    }

    for (const dia in eventosPorDia) {
        eventosPorDia[dia].sort((a, b) => a.time.localeCompare(b.time));
    }

    return eventosPorDia;
}