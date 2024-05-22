
const fetchProxy = new Proxy(fetch, {
  apply: function (target, thisArg, args) {
    const url = args[0]; 
    // Erişim kontrolü veya istek öncesi işlemleri burada gerçekleştirilebilir

    // fetch işlemini gerçekleştiriyoruz ve sonucu döndürüyoruz
    return fetch(...args)
      .then(response => {
    
        return response.json();
      })
      .catch(error => {
       
        throw error;
      });
  }
});

// fetchProxy'i kullanarak isteklerinizi yapabilirsiniz
document.addEventListener('DOMContentLoaded', function () {
  addClickListeners(); 
  addMouseEvents(); 
});

// İl tıklama işlemleri için listener'ları eklemek için addClickListeners fonksiyonu
function addClickListeners() {
  const element = document.querySelector('#svg-turkiye-haritasi');
  const info = document.querySelector('.il-isimleri');

  if (!element || !info) return;

  element.addEventListener('click', function (event) {
    if (event.target.tagName === 'path') {
      const parent = event.target.parentNode;
      const ilAdi = parent.getAttribute('data-iladi');
      
      fetchData(ilAdi);
    }
  });
  document.addEventListener('click', function (event) {
    const modal = document.getElementById('modal');
    if (
      event.target.classList.contains('close') || 
      event.target === modal ||
      event.target.classList.contains('modal-content')
    ) {
      closeModal();
    }
  });
}

// Mouse olayları için listener'ları eklemek için addMouseEvents fonksiyonu
function addMouseEvents() {
  const element = document.querySelector('#svg-turkiye-haritasi');
  const info = document.querySelector('.il-isimleri');

  if (!element || !info) return;

  element.addEventListener('mouseover', function (event) {
    if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
      info.innerHTML = `<div>${event.target.parentNode.getAttribute('data-iladi')}</div>`;
    }
  });

  element.addEventListener('mousemove', function (event) {
    info.style.top = event.pageY + 25 + 'px';
    info.style.left = event.pageX + 'px';
  });

  element.addEventListener('mouseout', function () {
    info.innerHTML = '';
  });
}

// fetchData fonksiyonunu kullanarak istek yapılabilir
function fetchData(ilAdi) {
  fetchProxy('/getVeri', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ilAdi: ilAdi }),
  })
    .then(data => {
      const modalContent = document.querySelector('.modal-content');
      const { istihdamSayilari, istihdam } = data;

      modalContent.innerHTML = `


      <table class="table table-hover">

      <tbody>            

          <span class="close">&times;</span>
       
        <h2>${ilAdi}</h2>
        <h5>2023 Yılında Şehre Ait Sektöre Göre İstihdam Verileri</h5>   
          <thead>
              <tr>
                  
                  <th scope="col">Toplam (Kişi)</th>
                 
                  <th scope="col">Tarım (Kişi)</th>
                
                  <th scope="col">Sanayi (Kişi)</th>
                
                  <th scope="col">Hizmet (Kişi)</th>
              </tr>
          </thead>
          <tr>

              
              <td>${istihdamSayilari[0]['Toplam']}</td>
             
              <td>${istihdamSayilari[0]['Tarım']}</td>
            
              <td>${istihdamSayilari[0]['Sanayi']}</td>
            
              <td>${istihdamSayilari[0]['Hizmet']}</td>
          </tr>

          
      </tbody>
  </table>
    
    

        <select class="form-select form-select-sm" id="grafikSecimi">
          <option value="pie">Pasta Grafiği</option>
          <option value="bar">Çubuk Grafiği</option>
          <option value="radar">Radar Grafiği</option>
        </select>
        
      `;

      createChart(
        istihdam[0]['Tarım'],
        istihdam[0]['Sanayi'],
        istihdam[0]['Hizmet']
      );

      openModal();
      

      event.preventDefault();
    })
    .catch(error => {
      console.error('Bir hata oluştu:', error);
    });
}

// Modal işlemleri için openModal ve closeModal fonksiyonları buraya eklenebilir
function openModal() {
  const modal = document.getElementById('modal');
  const body = document.body;

  modal.style.display = 'block';
  body.style.overflowX = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  const body = document.body;

  modal.style.display = 'none';
  body.style.overflowX = '';
}

// createChart fonksiyonu ve grafik işlemleri buraya eklenebilir
function createChart(istihdamTarim, istihdamSanayi, istihdamHizmet) {
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML += `
    <canvas id="istihdamGrafik" width="400" height="400"></canvas>
  `;

  const ctx = document.getElementById('istihdamGrafik').getContext('2d');
  let chartType = 'pie'; // Varsayılan grafik türü

  const updateChart = () => {
    const secilenGrafik = document.getElementById('grafikSecimi');
    chartType = secilenGrafik.value;

    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: ['Tarım', 'Sanayi', 'Hizmet'],
        datasets: [{
          label: 'İstihdam',
          data: [istihdamTarim, istihdamSanayi, istihdamHizmet],
          backgroundColor: [
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 206, 86, 0.3)',
            'rgba(255, 156, 210, 0.3)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'İstihdam Grafiği',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  updateChart();

  document.getElementById('grafikSecimi').addEventListener('change', updateChart);
}
