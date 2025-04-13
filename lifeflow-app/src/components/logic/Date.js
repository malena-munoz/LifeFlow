const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export function CalendarObject() {
    let fechaActual = new Date();
    let fechaAnterior = new Date(fechaActual.getMonth()-1 === 11 ? fechaActual.getFullYear()-1 : fechaActual.getFullYear(), fechaActual.getMonth()-1, 1);
    let fechaSiguiente = new Date(fechaActual.getMonth()+1 === 0 ? fechaActual.getFullYear()+1 : fechaActual.getFullYear(), fechaActual.getMonth()+1, 1);

    const calendar_obj = {
        actual: {
            objeto: fechaActual,
            nombre: meses[fechaActual.getMonth()]
        },
        anterior: {
            objeto: fechaAnterior,
            nombre: meses[fechaAnterior.getMonth()]
        },
        siguiente: {
            objeto: fechaSiguiente,
            nombre: meses[fechaSiguiente.getMonth()]
        }
    };
    
    return calendar_obj;
}

export function Days(date) {
    let primer_dia_numero = new Date(date.getFullYear(), date.getMonth(), 1);
    let primer_dia_semana = primer_dia_numero.getDay() == 0 ? 7 : primer_dia_numero.getDay();
    let dias_mes = new Date(date.getMonth() === 12 ? date.getFullYear()+1 : date.getFullYear(), date.getMonth() === 12 ? 1 : date.getMonth(), 0).getDate(); 
    
    let dias = [];

    for (let index = 0; index < primer_dia_semana - 1; index++) {
        dias.push(0);  // Representa un día vacío
    }
    
    for (let index = 1; index <= dias_mes; index++) {
        dias.push(index);  // Añadir los días del mes
    }
    
    while (dias.length < 42) {
        dias.push(0); // Añadir días vacíos al final si es necesario
    }

    return dias;
}

export function IsCurrentDay(day) {
    let fechaComparar = new Date().setDate(day);
    return new Date() === fechaComparar ? 'day--current' : '';
}
