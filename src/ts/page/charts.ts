import Chart from 'chart.js/auto';
import { UserFormatted } from "../users-processing/interfaces";
import { appData } from "../app-data";

const charts = document.getElementById('charts');

export function renderCharts() {
    const teachers = appData.getDisplayedTeachers();
    if (teachers.length < 3) {
        charts.innerHTML = ``;
        return;
    }

    charts.innerHTML = `
        <div class="carousel">
            <div class="carousel-item">
                <canvas id="courseChart"></canvas>
            </div>
            <div class="carousel-item">
                <canvas id="genderChart"></canvas>
            </div>
            <div class="carousel-item">
                <canvas id="countryChart"></canvas>
            </div>
            <div class="carousel-item">
                <canvas id="ageChart"></canvas>
            </div>
        </div>
        <div class="carousel-controls">
            <button id="prev-slide" class="main-btn">Prev</button>
            <button id="next-slide" class="main-btn">Next</button>
        </div>
    `;
    const chartsConfig = [
        { id: 'courseChart', title: 'Specialty', field: 'course' },
        { id: 'genderChart', title: 'Gender', field: 'gender' },
        { id: 'countryChart', title: 'Nationality', field: 'country' },
        { id: 'ageChart', title: 'Age', field: 'age' },
    ];

    chartsConfig.forEach(({ id, title, field }) => {
        const data = generatePieData(teachers, field);
        createPieChart(id, title, data);
    });

    let currentSlide = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalSlides = items.length;

    function showSlide(index) {
        items.forEach((item, i) => {
            (item as HTMLElement).style.display = i === index ? 'block' : 'none';
        });
    }

    document.getElementById('next-slide').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });

    document.getElementById('prev-slide').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);
}

function createPieChart(id: string, title: string, data: any) {
    new Chart(document.getElementById(id) as HTMLCanvasElement, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                labels: {
                    font: {
                        size: 16
                    }
                }
                },
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 18
                    }
                }
            }
        }
    });
}

function generatePieData(teachers: UserFormatted[], field: string) {
    const dataMap = teachers.reduce((acc, teacher) => {
        const value = teacher[field];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const uniqueValuesCount = Object.keys(dataMap).length;
    const colors = generateColors(uniqueValuesCount);

    return {
        labels: Object.keys(dataMap),
        datasets: [{
            data: Object.values(dataMap),
            backgroundColor: colors,
        }]
    };
}

function generateColors(count: number) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = (i * 360 / count) % 360;
        colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
}
