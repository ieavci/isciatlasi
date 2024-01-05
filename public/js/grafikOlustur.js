

var chartDataTarim = JSON.parse('<%- chartDataTarim %>'); // Grafik verilerini alın
var chartDataSanayi = JSON.parse('<%- chartDataSanayi %>'); // Diğer grafik verilerini alın
var chartDatatemel15yiltoplam = JSON.parse('<%- chartDatatemel15yiltoplam %>'); // Diğer grafik verilerini alın
var chartDatatemel15yiltoplamBar = JSON.parse('<%- chartDatatemel15yiltoplam %>'); // Diğer grafik verilerini alın
var chartBolgeleregoreistihdam2022yuzdeleri = JSON.parse('<%- chartBolgeleregoreistihdam2022yuzdeleri %>'); // Diğer grafik verilerini alın
var chartSgietoperkekData = JSON.parse('<%- chartSgietoperkekData %>'); // Diğer grafik verilerini alın
var chartSgietopkadinData = JSON.parse('<%- chartSgietopkadinData %>'); // Diğer grafik verilerini alın

// JavaScript dosyasında Chart.js kullanarak grafikleri oluşturun ve ilgili canvas elementlerine yerleştirin
var ctxCubuk = document.getElementById('cubukGrafik').getContext('2d');
var ctxNoktali = document.getElementById('noktaliGrafik').getContext('2d');
var ctxNoktalitemel15yiltoplam = document.getElementById('Grafiktemel15yiltoplam').getContext('2d');
var ctxNoktalitemel15yiltoplamBar = document.getElementById('Grafiktemel15yiltoplamBar').getContext('2d');
var ctxcBolgeleregoreistihdam2022yuzdeleri = document.getElementById('chartBolgeleregoreistihdam2022yuzdeleri').getContext('2d');
var ctxSgietoperkekData = document.getElementById('chartSgietoperkekData').getContext('2d');
var ctxSgietopkadinData = document.getElementById('chartSgietopkadinData').getContext('2d');
// Diğer canvas elementleri için ctx ler oluşturun

var chartDataTarim = JSON.parse('<%- chartDataTarim %>'); // Grafik verilerini alın
var chartDataSanayi = JSON.parse('<%- chartDataSanayi %>'); // Diğer grafik verilerini alın
var chartDatatemel15yiltoplam = JSON.parse('<%- chartDatatemel15yiltoplam %>'); // Diğer grafik verilerini alın
var chartDatatemel15yiltoplamBar = JSON.parse('<%- chartDatatemel15yiltoplam %>'); // Diğer grafik verilerini alın
var chartBolgeleregoreistihdam2022yuzdeleri = JSON.parse('<%- chartBolgeleregoreistihdam2022yuzdeleri %>'); // Diğer grafik verilerini alın
var chartSgietoperkekData = JSON.parse('<%- chartSgietoperkekData %>'); // Diğer grafik verilerini alın
var chartSgietopkadinData = JSON.parse('<%- chartSgietopkadinData %>'); // Diğer grafik verilerini alın


var cubukGrafik = new Chart(ctxCubuk, {
    type: 'bar', // Grafik tipi (çubuk, çizgi, vs.)
    data: chartDataTarim, // Grafik için veri
    // Diğer grafik ayarları...
});

var noktaliGrafik = new Chart(ctxNoktali, {
    type: 'line', // Grafik tipi (çubuk, çizgi, vs.)
    data: chartDataSanayi, // Grafik için veri
    // Diğer grafik ayarları...
});
var Grafiktemel15yiltoplam = new Chart(ctxNoktalitemel15yiltoplam, {
    type: 'line', // Grafik tipi (çubuk, çizgi, vs.)
    data: chartDatatemel15yiltoplam, // Grafik için veri
    // Diğer grafik ayarları...
});
var Grafiktemel15yiltoplamBar = new Chart(ctxNoktalitemel15yiltoplamBar, {
    type: 'bar', // Grafik tipi (çubuk, çizgi, vs.)
    data: chartDatatemel15yiltoplamBar, // Grafik için veri
    // Diğer grafik ayarları...
});
var chartBolgeleregoreistihdam2022yuzdeleri = new Chart(ctxcBolgeleregoreistihdam2022yuzdeleri, {
    type: 'bar', // Grafik tipi (çubuk, çizgi, vs.)
    data: chartBolgeleregoreistihdam2022yuzdeleri, // Grafik için veri
    // Diğer grafik ayarları...
});

var chartSgietoperkekData = new Chart(ctxSgietoperkekData, {
    type: 'line', // Grafik tipi (çubuk, çizgi, vs.)
    data: chartSgietoperkekData, // Grafik için veri
    // Diğer grafik ayarları...
});


var chartSgietopkadinData = new Chart(ctxSgietopkadinData, {
    type: 'line', // Grafik tipi (çubuk, çizgi, vs.)
    data: chartSgietopkadinData, // Grafik için veri
    // Diğer grafik ayarları...
});

// Diğer grafikler için aynı şekilde ctx oluşturun ve grafikleri oluşturun


