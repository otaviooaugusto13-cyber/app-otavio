/* ================= BANCO DE DADOS (LISTA DE EXERCÍCIOS) ================= */
const todosExercicios = [
  { id: 101, nome: "Agachamento Livre", grupo: "Perna" },
  { id: 102, nome: "Leg Press 45", grupo: "Perna" },
  { id: 103, nome: "Cadeira Extensora", grupo: "Perna" },
  { id: 104, nome: "Mesa Flexora", grupo: "Perna" },
  { id: 105, nome: "Supino Reto", grupo: "Peito" },
  { id: 106, nome: "Supino Inclinado", grupo: "Peito" },
  { id: 107, nome: "Crucifixo Máquina", grupo: "Peito" },
  { id: 108, nome: "Puxada Alta", grupo: "Costas" },
  { id: 109, nome: "Remada Baixa", grupo: "Costas" },
  { id: 110, nome: "Elevação Lateral", grupo: "Ombro" },
  { id: 111, nome: "Desenvolvimento", grupo: "Ombro" },
  { id: 112, nome: "Rosca Direta", grupo: "Bíceps" },
  { id: 113, nome: "Tríceps Pulley", grupo: "Tríceps" },
  { id: 114, nome: "Prancha Abdominal", grupo: "Abs" },
  { id: 115, nome: "Esteira (Cardio)", grupo: "Cardio" }
];

/* ================= ESTADO GLOBAL ================= */
let listaDeAlunos = []; // Dados virão da nuvem
let alunoLogado = null; 
let alunoEmEdicaoId = null; 
let moduloEmEdicao = 'A'; 
const MODULOS_DISPONIVEIS = ['A', 'B', 'C', 'D', 'E']; 

// Gráficos
let chartPeso = null;
let chartCarga = null;

/* ================= INICIALIZAÇÃO E FIREBASE ================= */
// Aguarda o carregamento do Firebase no HTML
setTimeout(() => {
    carregarDadosDaNuvem().then(() => {
        verificarSessao();
    });
}, 1000);

async function carregarDadosDaNuvem() {
    if (!window.db) {
        console.error("ERRO: Firebase não detetado. Verifique o index.html.");
        return;
    }
    
    try {
        const querySnapshot = await window.f_getDocs(window.f_collection(window.db, "alunos"));
        listaDeAlunos = [];
        querySnapshot.forEach((doc) => {
            listaDeAlunos.push(doc.data());
        });
        console.log("Dados da nuvem:", listaDeAlunos.length, "alunos.");
        
        // Se estiver no painel admin, atualiza a lista
        const dash = document.getElementById('dashProfessor');
        if (dash && dash.classList.contains('active')) {
            renderizarListaAlunosAdmin();
        }
    } catch (e) {
        console.error(e);
        // Não alerta erro de conexão para não assustar, apenas loga
    }
}

async function salvarNaNuvem(aluno) {
    if (!window.db) return;
    try {
        // Usa o telefone como ID único do documento
        await window.f_setDoc(window.f_doc(window.db, "alunos", aluno.telefone), aluno);
    } catch (e) {
        console.error("Erro ao guardar:", e);
    }
}

async function apagarDaNuvem(tel) {
    if (!window.db) return;
    await window.f_deleteDoc(window.f_doc(window.db, "alunos", tel));
}

/* ================= SESSÃO ================= */
function verificarSessao() {
    const sessaoSalva = localStorage.getItem("usuarioLogado");
    if (sessaoSalva) {
        const usuario = JSON.parse(sessaoSalva);
        if (usuario.tipo === 'admin') {
            autenticarAdmin();
        } else {
            // Busca dados frescos da memória (vindos da nuvem)
            const dados = listaDeAlunos.find(a => a.telefone === usuario.telefone);
            if(dados) { 
                alunoLogado = dados; 
                carregarInterfaceAluno(); 
            } else { 
                logout(); 
            }
        }
    }
}

/* ================= AUTENTICAÇÃO ================= */
function autenticar() {
  const loginInput = document.getElementById('userEmail').value.trim();
  if (!loginInput) return alert("Digite o seu telefone ou 'admin'.");

  if (loginInput.toLowerCase() === 'admin') {
    localStorage.setItem("usuarioLogado", JSON.stringify({ tipo: 'admin' }));
    autenticarAdmin();
  } else {
    const aluno = listaDeAlunos.find(a => a.telefone === loginInput);
    if (aluno) {
      alunoLogado = aluno;
      localStorage.setItem("usuarioLogado", JSON.stringify({ tipo: 'aluno', telefone: aluno.telefone }));
      carregarInterfaceAluno();
    } else {
      alert("Usuário não encontrado. (Se acabou de cadastrar, recarregue a página)");
    }
  }
}

function autenticarAdmin() {
    mostrarTela('dashProfessor');
    renderizarListaAlunosAdmin();
}

function carregarInterfaceAluno() {
    const hora = new Date().getHours();
    let saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
    const primeiroNome = alunoLogado.nome.split(' ')[0];
    const h1 = document.querySelector('.header-student h1');
    if(h1) h1.innerHTML = `${saudacao}, <span style="color:#10b981">${primeiroNome}</span>`;

    renderizarCardsTreinoAluno();
    atualizarDisplayFogo();
    atualizarDisplayVencimentoPerfil();
    
    document.getElementById('nomePerfil').innerText = alunoLogado.nome;
    document.getElementById('telPerfil').innerText = alunoLogado.telefone;
    document.getElementById('pesoInicialInput').value = alunoLogado.pesoInicial || "";
    document.getElementById('pesoAtualInput').value = alunoLogado.pesoAtual || "";

    mostrarTela('treinos');
    document.getElementById('mainNav').style.display = 'flex';
}

function logout() {
  alunoLogado = null;
  localStorage.removeItem("usuarioLogado");
  document.getElementById('userEmail').value = "";
  mostrarTela('login');
  document.getElementById('mainNav').style.display = 'none';
}

/* ================= NAVEGAÇÃO ================= */
function mostrarTela(idTela) {
  document.querySelectorAll('.screen').forEach(t => t.classList.remove('active'));
  const tela = document.getElementById(idTela);
  if(tela) tela.classList.add('active');
  const nav = document.getElementById('mainNav');
  if(!nav) return;
  
  if(idTela === 'login' || idTela === 'dashProfessor' || idTela === 'painelPersonal') {
    nav.style.display = 'none';
  } else if (alunoLogado) {
    nav.style.display = 'flex';
    document.querySelectorAll('.nav-item').forEach(btn => btn.style.color = '#64748b');
    
    if (idTela === 'estatisticas') {
        carregarEstatisticas(); 
        const btn = document.querySelector('.nav-item:first-child');
        if(btn) btn.style.color = '#f8fafc';
    }
    if (idTela === 'conta') {
        const btn = document.querySelector('.nav-item:last-child');
        if(btn) btn.style.color = '#f8fafc';
    }
  }
}

/* ================= ADMIN ================= */
function toggleFormulario() { 
    const form = document.getElementById('formCadastroAluno');
    if(form) form.classList.toggle('hidden'); 
}

async function cadastrarAluno() {
  const nome = document.getElementById('novoNome').value;
  const tel = document.getElementById('novoTel').value;
  const dataVenc = document.getElementById('novoVencimento').value;

  if (!nome || !tel) return alert("Preencha nome e telefone.");
  if (listaDeAlunos.some(a => a.telefone === tel)) return alert("Telefone já cadastrado!");

  const novoAluno = {
    nome: nome,
    telefone: tel,
    vencimento: dataVenc,
    pesoInicial: "",
    pesoAtual: "",
    historicoPeso: [],
    historicoCargas: {}, 
    registros: {}, 
    treinos: { A: { exercicios: [] }, B: { exercicios: [] }, C: { exercicios: [] }, D: { exercicios: [] }, E: { exercicios: [] } }
  };

  listaDeAlunos.push(novoAluno);
  await salvarNaNuvem(novoAluno);
  
  renderizarListaAlunosAdmin();
  toggleFormulario();
  alert("Aluno salvo na nuvem!");
}

function renderizarListaAlunosAdmin(filtro = "") {
  const container = document.getElementById('listaAlunosCoach');
  const total = document.getElementById('totalAlunos');
  if(!container) return;
  
  total.innerText = listaDeAlunos.length;
  container.innerHTML = "";

  const listaFiltrada = listaDeAlunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(filtro.toLowerCase()) || 
    aluno.telefone.includes(filtro)
  );

  listaFiltrada.forEach(aluno => {
    container.innerHTML += `
      <div class="student-card">
        <div class="student-info"><h3>${aluno.nome}</h3><p>Login: ${aluno.telefone}</p></div>
        <div class="student-actions">
          <button class="btn-icon btn-edit" onclick="abrirEditorTreino('${aluno.telefone}')"><span class="material-icons-round">edit_note</span></button>
          <button class="btn-icon btn-delete" onclick="excluirAluno('${aluno.telefone}')"><span class="material-icons-round">delete</span></button>
        </div>
      </div>
    `;
  });
}

async function excluirAluno(tel) {
    const telefoneStr = String(tel);
    const aluno = listaDeAlunos.find(a => a.telefone === telefoneStr);
    if(aluno && confirm(`Apagar ${aluno.nome}?`)) {
        listaDeAlunos = listaDeAlunos.filter(a => a.telefone !== telefoneStr);
        renderizarListaAlunosAdmin();
        await apagarDaNuvem(telefoneStr);
    }
}

function abrirEditorTreino(tel) {
  alunoEmEdicaoId = tel;
  const aluno = listaDeAlunos.find(a => a.telefone === tel);
  document.getElementById('alunoSendoEditado').innerText = aluno.nome;
  
  const containerBtns = document.getElementById('botoesModulosAdmin');
  containerBtns.innerHTML = "";
  MODULOS_DISPONIVEIS.forEach(letra => {
      containerBtns.innerHTML += `<button onclick="trocarModuloEdicao('${letra}')" id="btnModulo${letra}" class="mod-btn">${letra}</button>`;
  });
  trocarModuloEdicao('A');
  mostrarTela('painelPersonal');
}

function trocarModuloEdicao(modulo) {
  moduloEmEdicao = modulo;
  document.getElementById('moduloAtualNome').innerText = modulo;
  document.querySelectorAll('.mod-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById('btnModulo' + modulo);
  if(btn) btn.classList.add('active');
  renderizarCheckboxesExercicios();
}

// === LISTA DE EXERCÍCIOS AGRUPADA POR CATEGORIA (NOVO) ===
function renderizarCheckboxesExercicios() {
  const container = document.getElementById('listaSelecao');
  container.innerHTML = "";
  
  const aluno = listaDeAlunos.find(a => a.telefone === alunoEmEdicaoId);
  if (!aluno) return;

  const idsAtuais = aluno.treinos[moduloEmEdicao].exercicios.map(e => e.id);

  // 1. Agrupar os exercícios por categoria
  const grupos = {};
  todosExercicios.forEach(ex => {
    if (!grupos[ex.grupo]) {
      grupos[ex.grupo] = [];
    }
    grupos[ex.grupo].push(ex);
  });

  // 2. Renderizar grupos
  Object.keys(grupos).forEach(grupoNome => {
    // Cabeçalho da Categoria
    const icone = obterIconeGrupo(grupoNome);
    container.innerHTML += `
      <div class="group-header">
        <span>${icone}</span> ${grupoNome}
      </div>
    `;

    // Lista de Exercícios da Categoria
    grupos[grupoNome].forEach(ex => {
      const isChecked = idsAtuais.includes(ex.id) ? "checked" : "";
      container.innerHTML += `
        <label class="selection-item">
          <input type="checkbox" value="${ex.id}" ${isChecked}>
          <div style="flex:1">
            <strong style="color:white; font-size: 0.95rem;">${ex.nome}</strong>
          </div>
        </label>
      `;
    });
  });
}

function obterIconeGrupo(grupo) {
  const map = {
    'Perna': '🦵', 'Peito': '🏋️', 'Costas': '🦍', 'Ombro': '🥥',
    'Bíceps': '💪', 'Tríceps': '💪', 'Abs': '🔥', 'Cardio': '🏃'
  };
  return map[grupo] || '📋';
}

function salvarTreinoPersonal() {
  const checks = document.querySelectorAll('#listaSelecao input:checked');
  const novos = [];
  checks.forEach(c => novos.push(todosExercicios.find(e => e.id == c.value)));
  const idx = listaDeAlunos.findIndex(a => a.telefone === alunoEmEdicaoId);
  
  listaDeAlunos[idx].treinos[moduloEmEdicao].exercicios = novos;
  salvarNaNuvem(listaDeAlunos[idx]);
  alert(`Treino guardado na nuvem!`);
}

/* ================= ALUNO ================= */
function renderizarCardsTreinoAluno() {
    const grid = document.getElementById('containerTreinosAluno');
    if(!grid) return;
    grid.innerHTML = "";
    MODULOS_DISPONIVEIS.forEach(letra => {
        const treino = alunoLogado.treinos[letra];
        const qtd = treino ? treino.exercicios.length : 0;
        let corClass = (letra === 'B' || letra === 'E') ? "blue" : (letra === 'C') ? "purple" : "";
        if (qtd > 0) { grid.innerHTML += `<div class="treino-card" onclick="abrirTreino('${letra}')"><div class="icon-box ${corClass}">${letra}</div><div class="info"><h3>Treino ${letra}</h3><p>${qtd} exercícios</p></div><span class="material-icons-round">chevron_right</span></div>`; }
    });
}

function abrirTreino(modulo) {
  moduloTreinoAtual = modulo;
  const listaEx = alunoLogado.treinos[modulo].exercicios;
  mostrarTela('detalheTreino');
  document.getElementById('tituloTreino').innerText = `Treino ${modulo}`;
  const container = document.getElementById('listaExercicios');
  container.innerHTML = "";

  listaEx.forEach(ex => {
    if(!alunoLogado.registros) alunoLogado.registros = {};
    const keyCheck = `${modulo}_${ex.id}_check`;
    const keyPeso = `${modulo}_${ex.id}_peso`;
    const isChecked = alunoLogado.registros[keyCheck] ? "checked" : "";
    const pesoSalvo = alunoLogado.registros[keyPeso] || "";

    container.innerHTML += `
      <div class="exercise-item">
        <div class="exercise-header"><span class="exercise-name">${ex.nome}</span><div class="video-link" onclick="abrirVideo('${ex.nome}')"><span class="material-icons-round" style="font-size:18px">play_circle</span> Ver</div></div>
        <div class="exercise-controls"><div class="input-carga-wrapper"><div class="weight-history"><span class="label">Anterior</span><span class="value">${pesoSalvo}</span></div><input type="tel" class="input-carga" placeholder="kg" value="${pesoSalvo}" onblur="salvarPeso('${ex.id}', this.value)"></div><label class="check-wrapper"><input type="checkbox" onchange="toggleExercicio('${ex.id}', this.checked)" ${isChecked}></label></div>
      </div>
    `;
  });
  atualizarBarraProgresso();
}

function salvarPeso(exId, valor) {
  if(!valor) return;
  if(!alunoLogado.registros) alunoLogado.registros = {};
  alunoLogado.registros[`${moduloTreinoAtual}_${exId}_peso`] = valor;

  if(!alunoLogado.historicoCargas) alunoLogado.historicoCargas = {};
  if(!alunoLogado.historicoCargas[exId]) alunoLogado.historicoCargas[exId] = [];
  
  const hoje = new Date().toLocaleDateString('pt-BR').slice(0, 5);
  const hist = alunoLogado.historicoCargas[exId];
  const entry = hist.find(h => h.data === hoje);
  
  if(entry) entry.carga = parseFloat(valor);
  else hist.push({data: hoje, carga: parseFloat(valor)});

  salvarNaNuvem(alunoLogado);
}

function toggleExercicio(exId, checked) {
  if (navigator.vibrate) navigator.vibrate(40);
  if(!alunoLogado.registros) alunoLogado.registros = {};
  alunoLogado.registros[`${moduloTreinoAtual}_${exId}_check`] = checked;
  salvarNaNuvem(alunoLogado);
  const pct = atualizarBarraProgresso();
  if (pct === 100) registrarDiaDeFogo();
}

function atualizarBarraProgresso() {
  const total = document.querySelectorAll('#listaExercicios input[type="checkbox"]').length;
  if(total === 0) return 0;
  const checked = document.querySelectorAll('#listaExercicios input[type="checkbox"]:checked').length;
  let pct = Math.round((checked / total) * 100);
  document.getElementById('barraProgresso').style.width = `${pct}%`;
  document.getElementById('progressoPorcentagem').innerText = `${pct}%`;
  return pct;
}

function registrarDiaDeFogo() {
    const hoje = new Date().toLocaleDateString('pt-BR');
    if(!alunoLogado.historicoFogo) alunoLogado.historicoFogo = [];
    if (!alunoLogado.historicoFogo.includes(hoje)) {
        alunoLogado.historicoFogo.push(hoje);
        salvarNaNuvem(alunoLogado);
        alert("Treino completo! 🔥");
        atualizarDisplayFogo();
    }
}
function atualizarDisplayFogo() {
    const qtd = alunoLogado.historicoFogo ? alunoLogado.historicoFogo.length : 0;
    document.getElementById('streakCount').innerText = qtd;
}

/* ================= GRÁFICOS CHART.JS ================= */

function carregarEstatisticas() {
    if (!alunoLogado) return;
    gerarGraficoPesoChartJS();
    renderizarGraficoFrequenciaReal();
    povoarSelectExercicios();
}

function gerarGraficoPesoChartJS() {
    const ctx = document.getElementById('graficoPesoCanvas');
    if(!ctx) return;

    let labels = [];
    let dados = [];
    if(alunoLogado.pesoInicial) { labels.push("Início"); dados.push(alunoLogado.pesoInicial); }
    if(alunoLogado.historicoPeso) { alunoLogado.historicoPeso.forEach(h => { labels.push(h.data); dados.push(h.peso); }); }

    if(chartPeso) chartPeso.destroy(); 
    chartPeso = new Chart(ctx, {
        type: 'line',
        data: { labels: labels, datasets: [{ label: 'Peso (kg)', data: dados, borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 3, tension: 0.4, fill: true, pointBackgroundColor: '#020617', pointBorderColor: '#10b981', pointRadius: 5 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#64748b' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } } } }
    });
}

function povoarSelectExercicios() {
    const select = document.getElementById('selectExercicioGrafico');
    if(!select) return;
    let ids = [];
    if(alunoLogado.historicoCargas) ids = Object.keys(alunoLogado.historicoCargas);
    select.innerHTML = "";
    if (ids.length === 0) { select.innerHTML = "<option>Registe cargas para ver...</option>"; return; }
    ids.forEach(id => { const nome = todosExercicios.find(e => e.id == id)?.nome || "Ex " + id; select.innerHTML += `<option value="${id}">${nome}</option>`; });
    atualizarGraficoCarga();
}

function atualizarGraficoCarga() {
    const exId = document.getElementById('selectExercicioGrafico').value;
    if(!exId || !alunoLogado.historicoCargas) return;
    const hist = alunoLogado.historicoCargas[exId] || [];
    const ctx = document.getElementById('graficoCargaCanvas');
    const labels = hist.map(h => h.data);
    const dados = hist.map(h => h.carga);

    if(dados.length > 0) {
        document.getElementById('cargaInicialDisplay').innerText = dados[0] + "kg";
        document.getElementById('recordeDisplay').innerText = Math.max(...dados) + "kg";
    }

    if(chartCarga) chartCarga.destroy();
    chartCarga = new Chart(ctx, {
        type: 'line',
        data: { labels: labels, datasets: [{ label: 'Carga (kg)', data: dados, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.15)', borderWidth: 3, tension: 0.3, fill: true, pointBackgroundColor: '#020617', pointBorderColor: '#3b82f6', pointRadius: 5 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#64748b' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } } } }
    });
}

function renderizarGraficoFrequenciaReal() {
    let historico = alunoLogado.historicoFogo || [];
    const container = document.getElementById('graficoSemanal');
    container.innerHTML = "";
    const hoje = new Date();
    const diaSemana = hoje.getDay(); 
    const domingo = new Date(hoje);
    domingo.setDate(hoje.getDate() - diaSemana);
    const diasLabel = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    for (let i = 0; i < 7; i++) {
        const dataLoop = new Date(domingo);
        dataLoop.setDate(domingo.getDate() + i);
        const dia = String(dataLoop.getDate()).padStart(2, '0');
        const mes = String(dataLoop.getMonth() + 1).padStart(2, '0');
        const ano = dataLoop.getFullYear();
        const dataString = `${dia}/${mes}/${ano}`;
        const completou = historico.includes(dataString);
        let altura = "10%"; let classe = "";
        if(completou) { altura = "100%"; classe = "active"; }
        container.innerHTML += `<div class="chart-bar-wrapper"><div class="chart-bar ${classe}" style="height: ${altura}"></div><span class="week-day">${diasLabel[i]}</span></div>`;
    }
}

function salvarPesoCorporal(novoPeso) {
    if(!novoPeso) return;
    const pesoNum = parseFloat(novoPeso);
    if (!alunoLogado.pesoInicial) { alunoLogado.pesoInicial = novoPeso; document.getElementById('pesoInicialInput').value = novoPeso; }
    alunoLogado.pesoAtual = novoPeso;
    if(!alunoLogado.historicoPeso) alunoLogado.historicoPeso = [];
    const hoje = new Date().toLocaleDateString('pt-BR').slice(0, 5); 
    const registroHoje = alunoLogado.historicoPeso.find(h => h.data === hoje);
    if(registroHoje) registroHoje.peso = pesoNum;
    else alunoLogado.historicoPeso.push({ data: hoje, peso: pesoNum });
    salvarNaNuvem(alunoLogado); carregarEstatisticas();
}

function atualizarDisplayVencimentoPerfil() {
    const elPerfilData = document.getElementById('vencimentoPerfil');
    const elStatus = document.getElementById('statusPagamento');
    if(!alunoLogado.vencimento) { elPerfilData.innerText = "--/--"; elStatus.innerText = "N/A"; return; }
    const partes = alunoLogado.vencimento.split('-');
    const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
    elPerfilData.innerText = dataFormatada;
    const hoje = new Date();
    const dataVenc = new Date(alunoLogado.vencimento);
    dataVenc.setHours(23, 59, 59);
    if (hoje > dataVenc) { elStatus.innerText = "Atrasado"; elStatus.style.color = "#f87171"; elStatus.style.background = "rgba(239, 68, 68, 0.2)"; } 
    else { elStatus.innerText = "Em dia"; elStatus.style.color = "#10b981"; elStatus.style.background = "rgba(16, 185, 129, 0.2)"; }
}

function voltarTreinos() { mostrarTela('treinos'); }
function abrirVideo(t) { document.getElementById('videoModal').classList.add('active'); document.getElementById('videoTitulo').innerText = t; }
function fecharVideo() { document.getElementById('videoModal').classList.remove('active'); }
function filtrarAlunos() { renderizarListaAlunosAdmin(document.getElementById('inputBusca').value); }
