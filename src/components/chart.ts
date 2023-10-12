import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export class TemperatureChart {
    private ctx: CanvasRenderingContext2D | null;
    private data: any[];

    constructor(data: any[]) {
        this.ctx = null;
        this.data = data;
    }

    // Méthode pour initialiser le graphique
    public initChart() {
        if (this.ctx) {
            const temperaturesInKelvin = this.data.map((dayData) => dayData.main.temp);
            const temperaturesInCelsius = temperaturesInKelvin.map((tempInKelvin) => tempInKelvin - 273.15);
            const dates = this.data.map((dayData) => new Date(dayData.dt_txt));

            new Chart(this.ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Température (°C)',
                            data: temperaturesInCelsius,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
                options: {
                  maintainAspectRatio: true,
                  responsive:true,
                    scales: {

                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                            },
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }

    // Méthode pour définir le contexte du graphique
    public setContext(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
}