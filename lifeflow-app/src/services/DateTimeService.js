const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export function CalendarObject() {
    const hoy = new Date(); 

    // JS maneja automáticamente los overflow de meses
    const fechaActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1); // día 1
    const fechaAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
    const fechaSiguiente = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
    
    const calendar_obj = {
        actual: {
            anio: fechaActual.getFullYear(),
            mes: fechaActual.getMonth(),
            nombre: meses[fechaActual.getMonth()]
        },
        anterior: {
            anio: fechaAnterior.getFullYear(),
            mes: fechaAnterior.getMonth(),
            nombre: meses[fechaAnterior.getMonth()]
        },
        siguiente: {
            anio: fechaSiguiente.getFullYear(),
            mes: fechaSiguiente.getMonth(),
            nombre: meses[fechaSiguiente.getMonth()]
        }
    };
    
    return calendar_obj;
}

export function Days(date) {
    let primer_dia_numero = new Date(date.anio, date.mes, 1);
    let primer_dia_semana = primer_dia_numero.getDay() == 0 ? 7 : primer_dia_numero.getDay();
    let dias_mes = new Date(date.anio, date.mes + 1, 1); 
    dias_mes.setDate(dias_mes.getDate() - 1);
    dias_mes = dias_mes.getDate();
    
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

export function IsCurrentDay(fecha, day) {
    let fechaActual = new Date();
    let fechaParaComparar = new Date(fecha.anio, fecha.mes, day);

    return fechaActual.getFullYear() == fechaParaComparar.getFullYear() 
        && fechaActual.getMonth() == fechaParaComparar.getMonth() 
        && fechaActual.getDate() == fechaParaComparar.getDate() ? true : false;
}

export function CurrentDate(dia, mes, anio) {
    return `${anio}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}