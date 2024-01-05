// Tüm grafikleri gizleme fonksiyonu
function hideAllCharts() {
    document.querySelectorAll('.hidden-chart').forEach(chart => {
        chart.style.opacity = 0;
        chart.style.display = 'none';
    });
}

// İlgili grafikleri gösterme ve yavaşça görünür hale getirme işlevi
function toggleChart(chart1, chart2) {
    hideAllCharts(); // Önce tüm grafikleri gizle

    const firstChart = document.getElementById(chart1);
    const secondChart = document.getElementById(chart2);

    firstChart.style.display = 'block'; // İlgili birinci grafik görünür olacak
    secondChart.style.display = 'block'; // İlgili ikinci grafik görünür olacak

    // Yavaşça görünür hale getirmek için bir miktar gecikme ekleyelim
    setTimeout(() => {
        firstChart.style.opacity = 1;
        secondChart.style.opacity = 1;
    }, 100); // 100 milisaniye gibi bir gecikme süresi deneyebilirsiniz
}
function toggleChart2(chart1) {
    hideAllCharts(); // Önce tüm grafikleri gizle

    const firstChart = document.getElementById(chart1);
    

    firstChart.style.display = 'block'; // İlgili birinci grafik görünür olacak
   

    // Yavaşça görünür hale getirmek için bir miktar gecikme ekleyelim
    setTimeout(() => {
        firstChart.style.opacity = 1;
       
    }, 100); // 100 milisaniye gibi bir gecikme süresi deneyebilirsiniz
}

// Sayfa yüklendiğinde tüm grafikleri gizle
hideAllCharts();
