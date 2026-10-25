/**
 * ============================================================================
 * ANÁLISE ELEITORAL BRASIL - TSE (PRESIDENCIAIS)
 * Arquitetura Frontend: JavaScript Vanilla ES6+ & Leaflet Map & Chart.js
 * Autor: @brendan (Desenvolvedor Frontend Sênior)
 * ============================================================================
 */

(function () {
  'use strict';

  // Base de dados simulada de Seções Eleitorais do Brasil com coordenadas, votos, região e status de mudança de endereço
  const secoesData = [
    {
      id: "sec-01",
      uf: "SP",
      regiao: "Sudeste",
      municipio: "São Paulo",
      zona: "0013",
      secao: "0124",
      local: "Escola Estadual Dom Pedro II",
      endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      coords: [-23.5615, -46.6559],
      aptos: 400,
      comparecimento: 340,
      abstencoes: 60,
      votosLula: 210,
      votosBolso: 110,
      outros: 10,
      brancos: 6,
      nulos: 4,
      vencedor: "Lula",
      mudancaEndereco: false,
      enderecoAnterior: null
    },
    {
      id: "sec-02",
      uf: "SP",
      regiao: "Sudeste",
      municipio: "São Paulo",
      zona: "0250",
      secao: "0088",
      local: "Faculdade de Direito USP",
      endereco: "Largo São Francisco, 95 - Centro Histórico, São Paulo - SP",
      coords: [-23.5505, -46.6333],
      aptos: 450,
      comparecimento: 390,
      abstencoes: 60,
      votosLula: 260,
      votosBolso: 105,
      outros: 12,
      brancos: 8,
      nulos: 5,
      vencedor: "Lula",
      mudancaEndereco: true,
      enderecoAnterior: "Escola Municipal Rui Barbosa (Rua Direita, 45)"
    },
    {
      id: "sec-03",
      uf: "RJ",
      regiao: "Sudeste",
      municipio: "Rio de Janeiro",
      zona: "0154",
      secao: "0012",
      local: "Colégio Pedro II",
      endereco: "Av. Mal. Floriano, 83 - Centro, Rio de Janeiro - RJ",
      coords: [-22.9068, -43.1729],
      aptos: 380,
      comparecimento: 310,
      abstencoes: 70,
      votosLula: 180,
      votosBolso: 110,
      outros: 10,
      brancos: 6,
      nulos: 4,
      vencedor: "Lula",
      mudancaEndereco: false,
      enderecoAnterior: null
    },
    {
      id: "sec-04",
      uf: "RJ",
      regiao: "Sudeste",
      municipio: "Rio de Janeiro",
      zona: "0200",
      secao: "0310",
      local: "Escola Municipal Copacabana",
      endereco: "Rua Barata Ribeiro, 200 - Copacabana, Rio de Janeiro - RJ",
      coords: [-22.9691, -43.1868],
      aptos: 420,
      comparecimento: 350,
      abstencoes: 70,
      votosLula: 140,
      votosBolso: 190,
      outros: 10,
      brancos: 6,
      nulos: 4,
      vencedor: "Bolsonaro",
      mudancaEndereco: true,
      enderecoAnterior: "Centro Comunitário Atlântica (Rua Siqueira Campos, 50)"
    },
    {
      id: "sec-05",
      uf: "BA",
      regiao: "Nordeste",
      municipio: "Salvador",
      zona: "0001",
      secao: "0045",
      local: "Universidade Federal da Bahia (UFBA)",
      endereco: "Rua Dr. Augusto Viana, s/n - Canela, Salvador - BA",
      coords: [-12.9922, -38.5205],
      aptos: 350,
      comparecimento: 295,
      abstencoes: 55,
      votosLula: 220,
      votosBolso: 60,
      outros: 8,
      brancos: 4,
      nulos: 3,
      vencedor: "Lula",
      mudancaEndereco: false,
      enderecoAnterior: null
    },
    {
      id: "sec-06",
      uf: "BA",
      regiao: "Nordeste",
      municipio: "Salvador",
      zona: "0005",
      secao: "0112",
      local: "Colégio Estadual Odorico Tavares",
      endereco: "Av. Sete de Setembro, 2185 - Vitória, Salvador - BA",
      coords: [-12.9961, -38.5273],
      aptos: 390,
      comparecimento: 320,
      abstencoes: 70,
      votosLula: 235,
      votosBolso: 70,
      outros: 7,
      brancos: 5,
      nulos: 3,
      vencedor: "Lula",
      mudancaEndereco: true,
      enderecoAnterior: "Antigo Pavilhão de Aulas da Graça (Rua da Graça, 120)"
    },
    {
      id: "sec-07",
      uf: "MG",
      regiao: "Sudeste",
      municipio: "Belo Horizonte",
      zona: "0032",
      secao: "0211",
      local: "Escola Estadual Afonso Pena",
      endereco: "Rua da Bahia, 1716 - Lourdes, Belo Horizonte - MG",
      coords: [-19.9292, -43.9386],
      aptos: 410,
      comparecimento: 345,
      abstencoes: 65,
      votosLula: 175,
      votosBolso: 150,
      outros: 10,
      brancos: 6,
      nulos: 4,
      vencedor: "Lula",
      mudancaEndereco: false,
      enderecoAnterior: null
    },
    {
      id: "sec-08",
      uf: "RS",
      regiao: "Sul",
      municipio: "Porto Alegre",
      zona: "0158",
      secao: "0089",
      local: "Instituto Federal do Rio Grande do Sul (IFRS)",
      endereco: "Rua Cel. Vicente, 281 - Centro Histórico, Porto Alegre - RS",
      coords: [-30.0277, -51.2287],
      aptos: 370,
      comparecimento: 315,
      abstencoes: 55,
      votosLula: 160,
      votosBolso: 135,
      outros: 10,
      brancos: 6,
      nulos: 4,
      vencedor: "Lula",
      mudancaEndereco: true,
      enderecoAnterior: "Escola Estadual Júlio de Castilhos (Av. Venâncio Aires, 93)"
    },
    {
      id: "sec-09",
      uf: "CE",
      regiao: "Nordeste",
      municipio: "Fortaleza",
      zona: "0383",
      secao: "0104",
      local: "Universidade Federal do Ceará (UFC)",
      endereco: "Av. da Universidade, 2853 - Benfica, Fortaleza - CE",
      coords: [-3.7436, -38.5414],
      aptos: 400,
      comparecimento: 335,
      abstencoes: 65,
      votosLula: 250,
      votosBolso: 70,
      outros: 8,
      brancos: 4,
      nulos: 3,
      vencedor: "Lula",
      mudancaEndereco: false,
      enderecoAnterior: null
    },
    {
      id: "sec-10",
      uf: "PA",
      regiao: "Norte",
      municipio: "Belém",
      zona: "0030",
      secao: "0015",
      local: "Escola Estadual Paes de Carvalho",
      endereco: "Av. Conselheiro Furtado, 80 - Nazaré, Belém - PA",
      coords: [-1.4558, -48.4902],
      aptos: 360,
      comparecimento: 290,
      abstencoes: 70,
      votosLula: 170,
      votosBolso: 100,
      outros: 10,
      brancos: 6,
      nulos: 4,
      vencedor: "Lula",
      mudancaEndereco: false,
      enderecoAnterior: null
    }
  ];

  // Estado atual da aplicação
  let selectedSection = secoesData[0];
  let map = null;
  let markersLayer = null;

  // Inicialização do Mapa Leaflet
  function initMap() {
    map = L.map('map').setView([-14.2350, -51.9253], 4); // Centro do Brasil

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> | Dados TSE',
      subdomains: 'abcd',
      maxZoom: 18
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
    renderMapMarkers(secoesData);
  }

  function renderMapMarkers(dataList) {
    if (!markersLayer) return;
    markersLayer.clearLayers();

    dataList.forEach(sec => {
      const color = sec.vencedor === 'Lula' ? '#f97316' : (sec.vencedor === 'Bolsonaro' ? '#22c55e' : '#eab308');
      
      const circleMarker = L.circleMarker(sec.coords, {
        radius: 9,
        fillColor: color,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      });

      circleMarker.on('click', () => {
        selectSection(sec);
      });

      circleMarker.bindTooltip(`<b>${sec.municipio} (${sec.uf})</b><br>Zona: ${sec.zona} | Seção: ${sec.secao}<br>Vencedor: <b>${sec.vencedor}</b>`, {
        direction: 'top'
      });

      markersLayer.addLayer(circleMarker);
    });

    document.getElementById('map-counter-badge').textContent = `Mostrando ${dataList.length} seções`;
  }

  function selectSection(sec) {
    selectedSection = sec;

    // Atualizar HTML do Painel Lateral
    document.getElementById('det-local-name').textContent = sec.local;
    document.getElementById('det-address').textContent = sec.endereco;
    document.getElementById('det-zona').textContent = sec.zona;
    document.getElementById('det-secao').textContent = sec.secao;

    const badgeStatus = document.getElementById('detail-badge-status');
    if (sec.mudancaEndereco) {
      badgeStatus.textContent = 'Mudança de Endereço';
      badgeStatus.className = 'px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30';
    } else {
      badgeStatus.textContent = 'Seção Regular';
      badgeStatus.className = 'px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    }

    const validos = sec.votosLula + sec.votosBolso + sec.outros;
    const pctLula = validos > 0 ? ((sec.votosLula / validos) * 100).toFixed(1) : 0;
    const pctBolso = validos > 0 ? ((sec.votosBolso / validos) * 100).toFixed(1) : 0;

    document.getElementById('det-lula-val').textContent = `${sec.votosLula} votos (${pctLula}%)`;
    document.getElementById('det-lula-bar').style.width = `${pctLula}%`;

    document.getElementById('det-bolso-val').textContent = `${sec.votosBolso} votos (${pctBolso}%)`;
    document.getElementById('det-bolso-bar').style.width = `${pctBolso}%`;

    document.getElementById('det-outros').textContent = sec.outros;
    document.getElementById('det-brancos').textContent = sec.brancos;
    document.getElementById('det-nulos').textContent = sec.nulos;

    document.getElementById('det-aptos').textContent = sec.aptos;
    const pctComp = ((sec.comparecimento / sec.aptos) * 100).toFixed(1);
    const pctAbs = ((sec.abstencoes / sec.aptos) * 100).toFixed(1);
    document.getElementById('det-comparecimento').textContent = `${sec.comparecimento} (${pctComp}%)`;
    document.getElementById('det-abstencoes').textContent = `${sec.abstencoes} (${pctAbs}%)`;

    // Centralizar mapa
    if (map) {
      map.setView(sec.coords, 14);
    }
  }

  // Tabela de Seções com Mudança de Endereço
  function renderRelocatedTable(filterText = '') {
    const tbody = document.getElementById('relocated-table-body');
    if (!tbody) return;

    const relocated = secoesData.filter(s => s.mudancaEndereco);
    const filtered = relocated.filter(s => {
      const q = filterText.toLowerCase();
      return s.municipio.toLowerCase().includes(q) ||
             s.zona.toLowerCase().includes(q) ||
             s.secao.toLowerCase().includes(q) ||
             s.local.toLowerCase().includes(q) ||
             s.uf.toLowerCase().includes(q);
    });

    document.getElementById('badge-relocated-count').textContent = relocated.length;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-500">Nenhuma seção encontrada com os critérios.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(sec => {
      const vencedorColor = sec.vencedor === 'Lula' ? 'text-orange-400' : 'text-emerald-400';
      return `
        <tr class="hover:bg-slate-800/40 transition-colors">
          <td class="py-3 px-3 font-semibold text-white">${sec.uf} - ${sec.municipio}</td>
          <td class="py-3 px-3 font-mono text-slate-300">Z: ${sec.zona} | S: ${sec.secao}</td>
          <td class="py-3 px-3 text-slate-400 text-xs">${sec.enderecoAnterior || 'Endereço original'}</td>
          <td class="py-3 px-3 text-amber-300 text-xs font-medium">${sec.endereco}</td>
          <td class="py-3 px-3 font-bold ${vencedorColor}">${sec.vencedor}</td>
          <td class="py-3 px-3 text-right">
            <button class="btn-goto-sec px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors" data-id="${sec.id}">
              Ver no Mapa
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-goto-sec').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const sec = secoesData.find(s => s.id === id);
        if (sec) {
          switchTab('map');
          selectSection(sec);
        }
      });
    });
  }

  // Gráficos Chart.js
  let nationalChart = null;
  let regionChart = null;

  function initCharts() {
    // 1. Gráfico Nacional
    const ctxNat = document.getElementById('chart-national-votes');
    if (ctxNat) {
      nationalChart = new Chart(ctxNat, {
        type: 'doughnut',
        data: {
          labels: ['Lula (PT)', 'Bolsonaro (PL)', 'Brancos', 'Nulos'],
          datasets: [{
            data: [60345999, 58206354, 1964777, 3557962],
            backgroundColor: ['#f97316', '#22c55e', '#64748b', '#f43f5e'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#cbd5e1', font: { size: 11 } }
            }
          }
        }
      });
    }

    // 2. Gráfico por Região
    const ctxReg = document.getElementById('chart-region-votes');
    if (ctxReg) {
      regionChart = new Chart(ctxReg, {
        type: 'bar',
        data: {
          labels: ['Nordeste', 'Norte', 'Centro-Oeste', 'Sudeste', 'Sul'],
          datasets: [
            {
              label: 'Lula (PT) %',
              data: [69.3, 55.2, 40.1, 47.8, 43.3],
              backgroundColor: '#f97316',
              borderRadius: 6
            },
            {
              label: 'Bolsonaro (PL) %',
              data: [30.7, 44.8, 59.9, 52.2, 56.7],
              backgroundColor: '#22c55e',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' }, max: 100 }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#cbd5e1', font: { size: 11 } }
            }
          }
        }
      });
    }
  }

  // Abas
  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-view').forEach(v => v.classList.add('hidden'));

    if (tabId === 'map') {
      document.getElementById('tab-map').classList.add('active');
      document.getElementById('view-map').classList.remove('hidden');
      if (map) map.invalidateSize();
    } else if (tabId === 'relocated') {
      document.getElementById('tab-relocated').classList.add('active');
      document.getElementById('view-relocated').classList.remove('hidden');
    } else if (tabId === 'analytics') {
      document.getElementById('tab-analytics').classList.add('active');
      document.getElementById('view-analytics').classList.remove('hidden');
    }
  }

  // Filtros geográficos
  function setupFilters() {
    const filterRegion = document.getElementById('filter-region');
    const filterUf = document.getElementById('filter-uf');
    const filterMunicipio = document.getElementById('filter-municipio');

    function applyFilters() {
      const reg = filterRegion.value;
      const uf = filterUf.value;
      const mun = filterMunicipio.value;

      let filtered = secoesData.filter(sec => {
        if (reg !== 'all' && sec.regiao !== reg) return false;
        if (uf !== 'all' && sec.uf !== uf) return false;
        if (mun !== 'all' && sec.municipio !== mun) return false;
        return true;
      });

      renderMapMarkers(filtered);
    }

    if (filterRegion) filterRegion.addEventListener('change', applyFilters);
    if (filterUf) filterUf.addEventListener('change', applyFilters);
    if (filterMunicipio) filterMunicipio.addEventListener('change', applyFilters);

    // Busca de Mudanças de Endereço
    const searchRelocated = document.getElementById('search-relocated');
    if (searchRelocated) {
      searchRelocated.addEventListener('input', (e) => {
        renderRelocatedTable(e.target.value);
      });
    }

    // Botões de aba
    document.getElementById('tab-map').addEventListener('click', () => switchTab('map'));
    document.getElementById('tab-relocated').addEventListener('click', () => switchTab('relocated'));
    document.getElementById('tab-analytics').addEventListener('click', () => switchTab('analytics'));

    // Exportar JSON
    document.getElementById('btn-export-report').addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(secoesData, null, 2));
      const anchor = document.createElement('a');
      anchor.setAttribute("href", dataStr);
      anchor.setAttribute("download", "analise_eleitoral_tse_brasil.json");
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    initMap();
    selectSection(secoesData[0]);
    renderRelocatedTable();
    initCharts();
    setupFilters();
  });

})();
