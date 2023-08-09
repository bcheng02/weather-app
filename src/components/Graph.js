import React, { useRef } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Chart, getElementAtEvent, Bar } from 'react-chartjs-2';
import { format, getHours, parseISO } from 'date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartComponent = ({ weatherData, selectedTab, selectedCard, arrOfSetStates }) => {
    // Create a ref to the chart
    const chartRef = useRef();

    // only do ALL of the logic if you have the weatherData obj
    if (weatherData[0]) {
        let arrOf24hr

        if (selectedCard == 0) {
            // depending on the time weather is accessed for the current day, 24hrs can seep to the next day, 
            // which is why we need to search to the next day, concat them, the slice out the future 24hrs
            let arrOf48hr = weatherData[0].forecast.forecastday[selectedCard].hour.concat(weatherData[0].forecast.forecastday[selectedCard + 1].hour)
            let currentHour = getHours(parseISO(weatherData[0].current.last_updated))
            let start = currentHour
            let end = currentHour + 24
            arrOf24hr = arrOf48hr.slice(start, end)
        } else {
            arrOf24hr = weatherData[0].forecast.forecastday[selectedCard].hour
        }

        let arrOf24hrTime = arrOf24hr.map((hour) => format((parseISO(hour.time)), "h aaaa"))

        const onClick = (event) => {
            if (selectedTab === 0) {
                let element = getElementAtEvent(chartRef.current, event)

                // it's a vaid data point if getElementAtEvent returns a non-empty array
                let isDataPoint = element.length !== 0
                if (isDataPoint) {
                    let selectedHourObj = arrOf24hr[element[0].index]

                    arrOfSetStates[0](selectedHourObj.condition.icon)
                    arrOfSetStates[1](Math.round(selectedHourObj.temp_c))
                    arrOfSetStates[2](selectedHourObj.chance_of_rain)
                    arrOfSetStates[3](selectedHourObj.humidity)
                    arrOfSetStates[4](Math.round(selectedHourObj.wind_kph))
                    let selectedDate = parseISO(selectedHourObj.time)
                    arrOfSetStates[5](format(selectedDate, "EEEE h:00 aaaa"))
                    arrOfSetStates[6](selectedHourObj.condition.text)


                    if (selectedCard === 0) {
                        // not messing with setSelectedCard since state updates the graph,
                        // but I really want it to stay on the same graph, just apply 
                        // different styling to show that you've crossed over to next day
                        let selectedDateWeekDay = format(selectedDate, "E")
                        let currentDayWeekDay = format(parseISO(weatherData[0].forecast.forecastday[0].date), "E")
                        if (selectedDateWeekDay !== currentDayWeekDay) {
                            document.getElementById('card-0').classList.remove('active')
                            document.getElementById('card-1').classList.add('active')
                        } else {
                            document.getElementById('card-0').classList.add('active')
                            document.getElementById('card-1').classList.remove('active')
                        }
                    }
                }
            }
        }

        let data = {
            labels: arrOf24hrTime,
            datasets: [
                {
                    label: "placeholder label",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    backgroundColor: 'rgb(255, 245, 204)',
                    borderColor: 'rgb(255,204,0)',
                    tension: 0.1,
                    datalabels: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                {
                    label: "placeholder label",
                    data: [65, 59, 80, 81, 56, 55, 24],
                    fill: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgba(0,0,0,0)',
                    tension: 0.1,
                },
            ],
        }
        let options = {
            events: [],
            hover: { mode: null },
            elements: {
                point: {
                    pointStyle: 'rect',
                    borderWidth: 0,
                    pointBackgroundColor: 'rgba(0,0,0,0)',
                    radius: (context) => {
                        return (context.dataIndex % 3 === 0) ? 40 : 0
                    },
                    hoverRadius: (context) => {
                        return (context.dataIndex % 3 === 0) ? 40 : 0
                    },
                    hoverBackgroundColor: 'rgba(0,0,0,0)'
                },
            },
            plugins: {
                legend: {
                    display: false, // Hide legend
                },
                datalabels: {
                    // I've spent over 2 hours trying to push the labels to the top right and I CAN'T FIGURE IT OUT. I'VE TRIED EVERYTHING
                    // THIS LIBRARY IS SO AWFUL I WANT TO RUN INTO TRAFFIC
                    align: 'right',
                    anchor: 'center',
                    offset: -5,
                    formatter: (value, context) => {
                        // Round the data value to 2 decimal places after it is displayed
                        return (context.dataIndex % 3 === 0) ? Math.round(value) : ''
                    },
                    color: (context) => {
                        if (context.dataIndex === -1) return 'red'
                    }
                },
            },
            scales: {
                y: {
                    display: false,
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    // stacked: true,

                },
                x: {
                    ticks: {
                        callback: function (val, index) {
                            // show all labels starting from 2nd and then + 3
                            if ((index - 1) % 3 === 0) {
                                return this.getLabelForValue(val)
                            } else return ''
                        },
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    border: {
                        // HAHAHA IT ACTUALLY WORKED I FINALLY FOUND IT 
                        // AFTER AN HOUR OF SEARCHING THIS LIBRARY SUCKS
                        color: 'white'
                    },
                    // stacked: true,
                }
            },
            maintainAspectRatio: false,
        };



        if (selectedTab === 0) {
            // set tab specific data
            let arrOf24hrTemp = arrOf24hr.map((hour) => hour.temp_c)
            data.datasets[0].data = arrOf24hrTemp

            // scaled up as a trick to get higher data labels 
            // (hide old data labels, show new data labels, hide new graph)
            data.datasets[1].data = arrOf24hrTemp.map(temp => temp * 1.07)


            // config
            let yMax = Math.max(...arrOf24hrTemp)
            let yMin = Math.min(...arrOf24hrTemp)
            let yMargin = yMax * 0.05
            options.scales.y.max = Math.round(yMax + yMargin)
            options.scales.y.min = Math.round(yMin - yMargin)
            // options.scales.y.ticks.stepSize = 100
            options.scales.y.ticks.beginAtZero = false

            return <Line
                data={data}
                plugins={[ChartDataLabels]}
                options={options}
                ref={chartRef} // Add the ref here
                onClick={onClick}
            />;

        } else if (selectedTab === 1) {
            let arrOf24hrPrecip = arrOf24hr.map((hour) => hour.chance_of_rain)
            data.datasets[0].data = arrOf24hrPrecip
            data.datasets[1].data = []
            console.log(arrOf24hrPrecip)
            return <Bar
                data={data}
                plugins={[ChartDataLabels]}
                options={options}
            />;
        } else {
            data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'third tab',
                        data: [85, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            };
        }





        return <Line
            data={data}
            plugins={[ChartDataLabels]}
            options={options}
            ref={chartRef} // Add the ref here
            onClick={onClick}
        />;
    }
};

export default ChartComponent;
