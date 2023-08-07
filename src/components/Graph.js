import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Chart } from 'react-chartjs-2';
import { format, getHours, parseISO } from 'date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartComponent = ({ weatherData, selectedTab, selectedCard }) => {
    // only do ALL of the logic if you have the weatherData obj
    if (weatherData[0]) {

        let data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: "placeholder label",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    backgroundColor: 'rgb(255, 245, 204)',
                    borderColor: 'rgb(255,204,0)',
                    tension: 0.1,
                },
            ],
        }
        let options = {
            plugins: {
                legend: {
                    display: false, // Hide legend
                },
            },
            scales: {
                y: {
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false
                    }

                },
                x: {
                    ticks: {
                        callback: function (val, index) {
                            // show all labels starting from 2nd and then + 3
                            if (index == 1 || ((index - 1) % 3 == 0)) {
                                return this.getLabelForValue(val)
                            } else return ''
                        },
                        autoSkip: false,
                        maxRotation: 0,
                        minRotation: 0
                    },
                    grid: {
                        display: false
                    }

                }
            },
            maintainAspectRatio: false,
        };

        if (selectedTab == 0) {

            let arrOf48hr = weatherData[0].forecast.forecastday[selectedCard].hour.concat(weatherData[0].forecast.forecastday[selectedCard + 1].hour)

            // 24 hours starting from current hour thru to the next day (that's why need 48hrs ^)
            let currentHour = getHours(parseISO(weatherData[0].current.last_updated))
            let start = currentHour
            let end = currentHour + 24
            let arrOf24hr = arrOf48hr.slice(start, end)

            let arrOf24hrTemp = arrOf24hr.map((hour) => hour.temp_c)
            let arrOf24hrTime = arrOf24hr.map((hour) => format((parseISO(hour.time)), "h aaaa"))

            data.labels = arrOf24hrTime
            data.datasets[0].data = arrOf24hrTemp

            let yMax = Math.max(...data.datasets[0].data)
            let yMin = Math.min(...data.datasets[0].data)
            let yMargin = yMax * 0.05

            options.scales.y.max = Math.round(yMax + yMargin)
            options.scales.y.min = Math.round(yMin - yMargin)
            options.scales.y.ticks.stepSize = 100
            options.scales.y.ticks.beginAtZero = false

        } else if (selectedTab == 1) {
            data = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'second tab',
                        data: [75, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            };
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





        return <Line data={data} plugins={[ChartDataLabels]} options={options} />;
    }
};

export default ChartComponent;
