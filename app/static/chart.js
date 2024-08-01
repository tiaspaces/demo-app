function createBubbleChart(chartId, title, data, unit) {
    new Chart(document.getElementById(chartId), {
        type: 'bubble',
        data: {
            datasets: [{
                label: title,
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw.y + ' ' + unit;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'X-axis'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y-axis'
                    }
                }
            }
        }
    });
}

function createBarChart(chartId, title, data, unit) {
    new Chart(document.getElementById(chartId), {
        type: 'bar',
        data: {
            labels: ['Bytes Sent', 'Bytes Received'],
            datasets: [{
                label: title,
                data: [data.bytes_sent, data.bytes_recv],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw + ' ' + unit;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value (' + unit + ')'
                    }
                }
            }
        }
    });
}

function fetchCpuHistory() {
    fetch('/cpu_history')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('cpuHistoryChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: data.length }, (_, i) => i + 1),
                    datasets: [{
                        label: 'CPU Usage (%)',
                        data: data,
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'CPU Usage Over Time'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'CPU Usage (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time (s)'
                            }
                        }
                    }
                }
            });
        });
}

function createRadarChart(chartId, title, data, labels) {
    new Chart(document.getElementById(chartId), {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}




function createDerivedBubbleChart(cpuUsage, memoryUsage, netStats) {
    new Chart(document.getElementById('derivedBubbleChart'), {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'CPU Usage',
                data: [{ x: 1, y: cpuUsage, r: 10 }],
                backgroundColor: 'rgba(255, 159, 64, 0.4)',
                borderColor: 'rgba(255, 159, 64, 0.8)',
                borderWidth: 1
            },
            {
                label: 'Memory Usage',
                data: [{ x: 2, y: memoryUsage, r: 10 }],
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 0.8)',
                borderWidth: 1
            },
            {
                label: 'Bytes Sent',
                data: [{ x: 3, y: netStats.bytes_sent, r: 10 }],
                backgroundColor: 'rgba(153, 102, 255, 0.4)',
                borderColor: 'rgba(153, 102, 255, 0.8)',
                borderWidth: 1
            },
            {
                label: 'Bytes Received',
                data: [{ x: 4, y: netStats.bytes_recv, r: 10 }],
                backgroundColor: 'rgba(255, 206, 86, 0.4)',
                borderColor: 'rgba(255, 206, 86, 0.8)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Intelligent Metrics'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let metric;
                            switch (context.raw.x) {
                                case 1:
                                    metric = 'CPU Usage: ';
                                    break;
                                case 2:
                                    metric = 'Memory Usage: ';
                                    break;
                                case 3:
                                    metric = 'Bytes Sent: ';
                                    break;
                                case 4:
                                    metric = 'Bytes Received: ';
                                    break;
                                default:
                                    metric = '';
                            }
                            return metric + context.raw.y;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Metric'
                    },
                    ticks: {
                        callback: function(value) {
                            switch (value) {
                                case 1:
                                    return 'CPU Usage';
                                case 2:
                                    return 'Memory Usage';
                                case 3:
                                    return 'Bytes Sent';
                                case 4:
                                    return 'Bytes Received';
                                default:
                                    return '';
                            }
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}
