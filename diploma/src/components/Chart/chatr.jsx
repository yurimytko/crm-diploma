import React, { useEffect, useState } from "react";
import chartService from "../../service/chartService";
import { AreaChart, Area, XAxis, YAxis } from "recharts";
import "./dist/chart.css";

export function Chart() {
    const [chart, setChart] = useState();

    const formatDateToDay = (dateString) => {
        const date = new Date(dateString);
        return date.getDate(); // Get the day of the month (1-31)
    };

    const chartFetch = async () => {
        const response = await chartService.getChart();
        console.log(response.data);
        const formattedData = response.data.map(item => ({
            ...item,
            day: formatDateToDay(item.date)
        }));
        setChart(formattedData);
    };

    useEffect(() => {
        chartFetch();
    }, []);

    return (
        <div className="chart_section">
            <p className="section_header">ПРИБУТОК</p>
            <div className="area_chart">
                <AreaChart width={500} height={350} data={chart}>
                        
                    <XAxis dataKey="day" />
                    <Area type="monotone" dataKey="income" stroke="#66FCF1" fill="#45A29E" />
                </AreaChart>
            </div>
        </div>
    );
}