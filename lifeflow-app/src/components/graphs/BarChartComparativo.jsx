import React from "react";
import { Alert } from "react-bootstrap";
import { Chart } from "react-google-charts";

export default function BarChartComparativo({ dataObj, objects, title, x, y, exception}) {
   // Mapear id a label para rápido acceso
    const idToLabel = objects ? objects.reduce((acc, cur) => {
        acc[cur.id] = cur.label;
        return acc;
    }, {}) : [];

    if (!dataObj || Object.keys(dataObj).length === 0) {
        return (
            <Alert key="danger" variant="danger" className="w-100 d-flex justify-content-center">
                {exception}
            </Alert>
        );
    }

    // Construir array para Google Charts
    const data = [["Estado", "Días"]];
    for (const key in dataObj) {
        if (dataObj.hasOwnProperty(key)) {
        const label = idToLabel[Number(key)] || `${key}`;
        const cantidad = dataObj[key]?.length || 0;
        data.push([label, cantidad]);
        }
    }

    const options = {
        title: title,
        titleTextStyle: {
            color: "#c2185b", 
            fontSize: 16,     
            bold: true,      
            italic: false,    
        },
        legend: { position: "none" },
        hAxis: {
            title: x,
            minValue: 0,
        },
        vAxis: {
            title: y,
        },
        bars: "horizontal",
        colors: ["#1976D2"],
    };

    return (
        <Chart
        chartType="BarChart"
        width="100%"
        height="500px"
        data={data}
        options={options}
        loader={<div>Cargando gráfico...</div>}
        />
    );
}
