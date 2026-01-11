/* ================= BANCO DE DADOS COMPLETO ================= */
const todosExercicios = [
  // PERNA
  { id: 1, nome: "Agachamento Livre", grupo: "Perna" },
  { id: 2, nome: "Agachamento Smith", grupo: "Perna" },
  { id: 3, nome: "Agachamento Hack", grupo: "Perna" },
  { id: 4, nome: "Leg Press 45º", grupo: "Perna" },
  { id: 5, nome: "Leg Press Horizontal", grupo: "Perna" },
  { id: 6, nome: "Cadeira Extensora", grupo: "Perna" },
  { id: 7, nome: "Mesa Flexora", grupo: "Perna" },
  { id: 8, nome: "Cadeira Flexora", grupo: "Perna" },
  { id: 9, nome: "Stiff com Barra", grupo: "Perna" },
  { id: 10, nome: "Levantamento Terra", grupo: "Perna" },
  { id: 11, nome: "Afundo / Passada", grupo: "Perna" },
  { id: 12, nome: "Búlgaro", grupo: "Perna" },
  { id: 13, nome: "Elevação Pélvica", grupo: "Perna" },
  { id: 14, nome: "Cadeira Adutora", grupo: "Perna" },
  { id: 15, nome: "Cadeira Abdutora", grupo: "Perna" },
  { id: 16, nome: "Panturrilha Sentado", grupo: "Perna" },
  { id: 17, nome: "Panturrilha no Leg", grupo: "Perna" },
  // PEITO
  { id: 20, nome: "Supino Reto (Barra)", grupo: "Peito" },
  { id: 21, nome: "Supino Reto (Halter)", grupo: "Peito" },
  { id: 22, nome: "Supino Inclinado (Barra)", grupo: "Peito" },
  { id: 23, nome: "Supino Inclinado (Halter)", grupo: "Peito" },
  { id: 24, nome: "Supino Declinado", grupo: "Peito" },
  { id: 25, nome: "Crucifixo Máquina", grupo: "Peito" },
  { id: 26, nome: "Crucifixo Halter", grupo: "Peito" },
  { id: 27, nome: "Crossover Polia Alta", grupo: "Peito" },
  { id: 28, nome: "Crossover Polia Baixa", grupo: "Peito" },
  { id: 29, nome: "Flexão de Braço", grupo: "Peito" },
  { id: 30, nome: "Supino Máquina", grupo: "Peito" },
  // COSTAS
  { id: 40, nome: "Puxada Alta (Frente)", grupo: "Costas" },
  { id: 41, nome: "Puxada Alta (Triângulo)", grupo: "Costas" },
  { id: 42, nome: "Puxada Alta (Costas)", grupo: "Costas" },
  { id: 43, nome: "Remada Baixa (Triângulo)", grupo: "Costas" },
  { id: 44, nome: "Remada Curvada", grupo: "Costas" },
  { id: 45, nome: "Remada Cavalinho", grupo: "Costas" },
  { id: 46, nome: "Remada Serrote", grupo: "Costas" },
  { id: 47, nome: "Pulldown", grupo: "Costas" },
  { id: 48, nome: "Barra Fixa", grupo: "Costas" },
  { id: 49, nome: "Voador Inverso", grupo: "Costas" },
  { id: 50, nome: "Lombar Máquina", grupo: "Costas" },
  // OMBRO
  { id: 60, nome: "Desenv. Halter", grupo: "Ombro" },
  { id: 61, nome: "Desenv. Máquina", grupo: "Ombro" },
  { id: 62, nome: "Desenv. Barra", grupo: "Ombro" },
  { id: 63, nome: "Elevação Lateral", grupo: "Ombro" },
  { id: 64, nome: "Elevação Frontal", grupo: "Ombro" },
  { id: 65, nome: "Remada Alta", grupo: "Ombro" },
  { id: 66, nome: "Encolhimento", grupo: "Ombro" },
  // BÍCEPS
  { id: 70, nome: "Rosca Direta (Barra)", grupo: "Bíceps" },
  { id: 71, nome: "Rosca Direta (Polia)", grupo: "Bíceps" },
  { id: 72, nome: "Rosca Alternada", grupo: "Bíceps" },
  { id: 73, nome: "Rosca Martelo", grupo: "Bíceps" },
  { id: 74, nome: "Rosca Scott", grupo: "Bíceps" },
  { id: 75, nome: "Rosca Concentrada", grupo: "Bíceps" },
  // TRÍCEPS
  { id: 80, nome: "Tríceps Polia", grupo: "Tríceps" },
  { id: 81, nome: "Tríceps Corda", grupo: "Tríceps" },
  { id: 82, nome: "Tríceps Testa", grupo: "Tríceps" },
  { id: 83, nome: "Tríceps Francês", grupo: "Tríceps" },
  { id: 84, nome: "Tríceps Banco", grupo: "Tríceps" },
  { id: 85, nome: "Tríceps Coice", grupo: "Tríceps" },
  // OUTROS
  { id: 90, nome: "Abdominal Supra", grupo: "Abs" },
  { id: 91, nome: "Abdominal Infra", grupo: "Abs" },
  { id: 92, nome: "Prancha", grupo: "Abs" },
  { id: 94, nome: "Esteira", grupo: "Cardio" },
  { id: 95, nome: "Bike Ergométrica", grupo: "Cardio" },
  { id: 96, nome: "Elíptico", grupo: "Cardio" }
];

/* ================= ESTADO GLOBAL ================= */
let listaDeAlunos = []; 
let alunoLogado = null; 
let alunoEmEdicaoId = null; 
let moduloEmEdicao = 'A'; 
const MODULOS_DISPONIVEIS = ['A', 'B', 'C', 'D', 'E']; 
let chartPeso = null;
let chartCarga = null;
let timerInterval = null; 

// Estado do Cardio
let cardioInterval = null;
let cardioSeconds = 0;
let cardioRunning = false;

/* ================= INICIALIZAÇÃO FIREBASE ================= */
setTimeout(() => {
    carregarDadosDaNuvem().then(() => { verificarSessao(); });
}, 1000);

async function carregarDadosDaNuvem() {
    if (!window.db) return console.error("Firebase OFF");
    try {
        const snap = await window.f_getDocs(window.f_collection(window.db, "alunos"));
        listaDeAlunos = [];
        snap.forEach(doc => listaDeAlunos.push(doc.data()));
        if (document.getElementById('dashProfessor').classList.contains('active')) renderizarListaAlunosAdmin();
    } catch (e) { console.error(e); }
}

async function salvarNaNuvem(aluno) {
    if (!window.db) return;
    try { await window.f_setDoc(window.f_doc(window.db, "alunos", aluno.telefone), aluno); } 
    catch (e) { console.error(e); }
}

/* ================= SESSÃO & LOGIN ================= */
function verificarSessao() {
    const sessao = localStorage.getItem("usuarioLogado");
    if (sessao) {
        const user = JSON.parse(sessao);
        if (user.tipo === 'admin') autenticarAdmin();
        else {
            const dados = listaDeAlunos.find(a => a.telefone === user.telefone);
            if(dados) { alunoLogado = dados; carregarInterfaceAluno(); } 
            else logout();
        }
    }
}

function autenticar() {
  const login = document.getElementById('userEmail').value.trim();
  if (login.toLowerCase() === 'admin') {
    localStorage.setItem("usuarioLogado", JSON.stringify({ tipo: 'admin' }));
    autenticarAdmin();
  } else {
    const aluno = listaDeAlunos.find(a => a.telefone === login);
    if (aluno) {
      alunoLogado = aluno;
      localStorage.setItem("usuarioLogado", JSON.stringify({ tipo: 'aluno', telefone: aluno.telefone }));
      carregarInterfaceAluno();
    } else alert("Usuário não encontrado.");
  }
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.reload();
}

/* ================= PAINEL PROFESSOR (ADMIN) ================= */
function autenticarAdmin() { mostrarTela('dashProfessor'); renderizarListaAlunosAdmin(); }

function renderizarListaAlunosAdmin(filtro="") {
  const container = document.getElementById('listaAlunosCoach');
  if(!container) return;
  document.getElementById('totalAlunos').innerText = listaDeAlunos.length;
  container.innerHTML = "";
  
  const filtrados = listaDeAlunos.filter(a => a.nome.toLowerCase().includes(filtro.toLowerCase()) || a.telefone.includes(filtro));
  
  filtrados.forEach(aluno => {
    container.innerHTML += `
      <div class="student-card">
        <div class="student-info"><h3>${aluno.nome}</h3><p>${aluno.telefone}</p></div>
        <div class="student-actions">
          <button class="btn-icon btn-edit" onclick="abrirEditorTreino('${aluno.telefone}')"><span class="material-icons-round">edit_note</span></button>
        </div>
      </div>`;
  });
}

function abrirEditorTreino(tel) {
  alunoEmEdicaoId = tel;
  document.getElementById('alunoSendoEditado').innerText = listaDeAlunos.find(a => a.telefone === tel).nome;
  const btns = document.getElementById('botoesModulosAdmin');
  btns.innerHTML = "";
  MODULOS_DISPONIVEIS.forEach(m => btns.innerHTML += `<button onclick="trocarModuloEdicao('${m}')" id="btnModulo${m}" class="mod-btn">${m}</button>`);
  trocarModuloEdicao('A');
  mostrarTela('painelPersonal');
}

function trocarModuloEdicao(mod) {
  moduloEmEdicao = mod;
  document.getElementById('moduloAtualNome').innerText = mod;
  document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btnModulo' + mod).classList.add('active');
  renderizarCheckboxesExercicios();
}

function renderizarCheckboxesExercicios() {
  const container = document.getElementById('listaSelecao');
  container.innerHTML = "";
  const aluno = listaDeAlunos.find(a => a.telefone === alunoEmEdicaoId);
  if (!aluno) return;

  const exerciciosSalvos = aluno.treinos[moduloEmEdicao].exercicios || [];
  
  const grupos = {};
  todosExercicios.forEach(ex => {
    if (!grupos[ex.grupo]) grupos[ex.grupo] = [];
    grupos[ex.grupo].push(ex);
  });

  Object.keys(grupos).forEach(grupo => {
    container.innerHTML += `<div class="group-header"><span>${obterIcone(grupo)}</span> ${grupo}</div>`;
    grupos[grupo].forEach(ex => {
      const salvo = exerciciosSalvos.find(s => s.id === ex.id);
      const isChecked = salvo ? "checked" : "";
      
      const valDescanso = salvo && salvo.descanso ? salvo.descanso : "Descanso"; 
      const valMetodo = salvo && salvo.metodo ? salvo.metodo : "Normal"; 
      const valSeries = salvo && salvo.series ? salvo.series : "";

      container.innerHTML += `
        <div class="admin-exercise-row">
          <div class="admin-row-left">
            <input type="checkbox" id="check_${ex.id}" value="${ex.id}" ${isChecked}>
            <label for="check_${ex.id}" style="color:white; font-size: 0.9rem; cursor:pointer;">${ex.nome}</label>
          </div>
          <div class="admin-row-options">
            <select id="descanso_${ex.id}" class="admin-input-mini w-time">
              <option value="Descanso" disabled ${valDescanso === "Descanso" ? "selected" : ""}>⏱️</option>
              <option value="30s" ${valDescanso === "30s" ? "selected" : ""}>30s</option>
              <option value="45s" ${valDescanso === "45s" ? "selected" : ""}>45s</option>
              <option value="1min" ${valDescanso === "1min" ? "selected" : ""}>1min</option>
              <option value="1:30" ${valDescanso === "1:30" ? "selected" : ""}>1:30</option>
              <option value="2min" ${valDescanso === "2min" ? "selected" : ""}>2min</option>
            </select>
            <select id="metodo_${ex.id}" class="admin-input-mini w-method">
              <option value="Normal" ${valMetodo === "Normal" ? "selected" : ""}>Normal</option>
              <option value="Falha" ${valMetodo === "Falha" ? "selected" : ""}>Falha</option>
              <option value="Drop" ${valMetodo === "Drop" ? "selected" : ""}>Drop</option>
              <option value="Bi-set" ${valMetodo === "Bi-set" ? "selected" : ""}>Bi-set</option>
              <option value="FST-7" ${valMetodo === "FST-7" ? "selected" : ""}>FST-7</option>
              <option value="Aquec." ${valMetodo === "Aquec." ? "selected" : ""}>Aquec.</option>
            </select>
            <input type="text" id="series_${ex.id}" class="admin-input-mini w-text" placeholder="3x12" value="${valSeries}" maxlength="8">
          </div>
        </div>
      `;
    });
  });
}

function salvarTreinoPersonal() {
  const marcados = document.querySelectorAll('#listaSelecao input[type="checkbox"]:checked');
  const listaFinal = [];
  marcados.forEach(checkbox => {
    const id = parseInt(checkbox.value);
    const exBase = todosExercicios.find(e => e.id === id);
    const descanso = document.getElementById(`descanso_${id}`).value;
    const metodo = document.getElementById(`metodo_${id}`).value;
    const series = document.getElementById(`series_${id}`).value;
    listaFinal.push({ ...exBase, descanso: descanso !== "Descanso" ? descanso : "1min", metodo: metodo, series: series || "3x12" });
  });
  const idx = listaDeAlunos.findIndex(a => a.telefone === alunoEmEdicaoId);
  listaDeAlunos[idx].treinos[moduloEmEdicao].exercicios = listaFinal;
  salvarNaNuvem(listaDeAlunos[idx]);
  alert("Treino salvo na nuvem! 💾");
}

/* ================= ÁREA DO ALUNO ================= */
function carregarInterfaceAluno() {
    const nome = alunoLogado.nome.split(' ')[0];
    document.querySelector('.header-student h1').innerHTML = `Olá, <span style="color:#10b981">${nome}</span>`;
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

function renderizarCardsTreinoAluno() {
    const grid = document.getElementById('containerTreinosAluno');
    grid.innerHTML = "";
    MODULOS_DISPONIVEIS.forEach(letra => {
        const treino = alunoLogado.treinos[letra];
        const qtd = treino ? treino.exercicios.length : 0;
        let cor = (letra === 'B'||letra==='E')?"blue":(letra==='C')?"purple":"";
        if (qtd > 0) grid.innerHTML += `<div class="treino-card" onclick="abrirTreino('${letra}')"><div class="icon-box ${cor}">${letra}</div><div class="info"><h3>Treino ${letra}</h3><p>${qtd} exercícios</p></div><span class="material-icons-round">chevron_right</span></div>`;
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
    const keyPeso = `${modulo}_${ex.id}_peso`;
    const pesoSalvo = alunoLogado.registros[keyPeso] || "";
    
    // BADGES
    const badgeSeries = ex.series ? `<span class="badge-info badge-series">📋 ${ex.series}</span>` : "";
    const badgeDescanso = ex.descanso ? `<span class="badge-info badge-rest">⏰ ${ex.descanso}</span>` : "";
    const badgeMetodo = ex.metodo && ex.metodo !== "Normal" ? `<span class="badge-info badge-method">${ex.metodo}</span>` : "";

    // BOLINHAS DE SÉRIE
    let numSeries = parseInt(ex.series); 
    if (isNaN(numSeries) || numSeries < 1) numSeries = 3;
    let bolinhasHTML = '<div class="sets-container">';
    for(let i=1; i<=numSeries; i++) {
        const setKey = `${modulo}_${ex.id}_set_${i}`;
        const isDone = alunoLogado.registros[setKey] ? "done" : "";
        bolinhasHTML += `<div class="set-circle ${isDone}" onclick="toggleSet('${ex.id}', ${i}, '${ex.descanso || '1min'}', this)">${i}</div>`;
    }
    bolinhasHTML += '</div>';

    container.innerHTML += `
      <div class="exercise-item">
        <div class="exercise-header">
            <span class="exercise-name">${ex.nome}</span>
            <button class="btn-video-mini" onclick="abrirVideo('${ex.nome}')"><span class="material-icons-round" style="font-size:14px">play_arrow</span> Vídeo</button>
        </div>
        <div class="exercise-badges">${badgeSeries} ${badgeDescanso} ${badgeMetodo}</div>
        <div class="exercise-controls">
          <div class="input-carga-wrapper"><span class="label">Carga (kg)</span><input type="tel" class="input-carga" placeholder="0" value="${pesoSalvo}" onblur="salvarPeso('${ex.id}', this.value)"></div>
          ${bolinhasHTML}
        </div>
      </div>
    `;
  });
  atualizarBarraProgresso();
}

/* ================= LÓGICA DE CARDIO (NOVO) ================= */
function renderizarCardio() {
    // Filtra apenas exercícios de Cardio
    const exerciciosCardio = todosExercicios.filter(e => e.grupo === 'Cardio');
    const container = document.getElementById('listaCardioContainer');
    container.innerHTML = "";

    exerciciosCardio.forEach(ex => {
        container.innerHTML += `
            <div class="treino-card" style="padding:15px;" onclick="iniciarExercicioCardio('${ex.nome}')">
                <div class="icon-box blue" style="width:45px; height:45px;"><span class="material-icons-round">directions_run</span></div>
                <div class="info">
                    <h3 style="font-size:1rem;">${ex.nome}</h3>
                    <p>Toque para abrir</p>
                </div>
                <span class="material-icons-round">play_arrow</span>
            </div>
        `;
    });
}

function iniciarExercicioCardio(nome) {
    if(confirm("Iniciar cronômetro para " + nome + "?")) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Aqui poderia abrir um modal específico, por enquanto vamos focar no timer principal
    }
}

function toggleCardioTimer() {
    const btn = document.getElementById('btnCardioAction');
    const display = document.getElementById('cardioTimerDisplay');

    if (!cardioRunning) {
        // Iniciar
        cardioRunning = true;
        btn.innerText = "PAUSAR";
        btn.style.background = "#eab308"; // Amarelo
        
        cardioInterval = setInterval(() => {
            cardioSeconds++;
            const m = Math.floor(cardioSeconds / 60).toString().padStart(2, '0');
            const s = (cardioSeconds % 60).toString().padStart(2, '0');
            display.innerText = `${m}:${s}`;
        }, 1000);
    } else {
        // Pausar
        cardioRunning = false;
        clearInterval(cardioInterval);
        btn.innerText = "RETOMAR";
        btn.style.background = "#10b981"; // Verde
    }
}

function resetCardioTimer() {
    cardioRunning = false;
    clearInterval(cardioInterval);
    cardioSeconds = 0;
    document.getElementById('cardioTimerDisplay').innerText = "00:00";
    const btn = document.getElementById('btnCardioAction');
    btn.innerText = "INICIAR";
    btn.style.background = "#10b981";
}

/* ================= LÓGICA DO CRONÔMETRO (DESCANSO) ================= */
function toggleSet(exId, setIndex, descanso, elemento) {
    if(navigator.vibrate) navigator.vibrate(30);
    elemento.classList.toggle('done');
    const isDone = elemento.classList.contains('done');
    const key = `${moduloTreinoAtual}_${exId}_set_${setIndex}`;
    if(!alunoLogado.registros) alunoLogado.registros = {};
    alunoLogado.registros[key] = isDone;
    salvarNaNuvem(alunoLogado);
    if(isDone) iniciarTimer(descanso);
    if(atualizarBarraProgresso() === 100) registrarDiaDeFogo();
}

function iniciarTimer(tempoString) {
    let segundos = 60;
    tempoString = tempoString.toLowerCase().trim();
    if(tempoString.includes('min')) segundos = parseInt(tempoString) * 60;
    else if (tempoString.includes(':')) { const p = tempoString.split(':'); segundos = (parseInt(p[0]) * 60) + parseInt(p[1]); }
    else if (tempoString.includes('s')) segundos = parseInt(tempoString);

    const overlay = document.getElementById('timerOverlay');
    const display = document.getElementById('timerDisplay');
    overlay.classList.remove('hidden');
    
    if(timerInterval) clearInterval(timerInterval);
    let restante = segundos;
    
    function updateDisplay() {
        const m = Math.floor(restante / 60).toString().padStart(2, '0');
        const s = (restante % 60).toString().padStart(2, '0');
        display.innerText = `${m}:${s}`;
    }
    updateDisplay();
    
    timerInterval = setInterval(() => {
        restante--;
        updateDisplay();
        if (restante <= 0) {
            clearInterval(timerInterval);
            if(navigator.vibrate) navigator.vibrate([200, 100, 200]);
            fecharTimer();
        }
    }, 1000);
}

function adicionarTempo(s) {
    const display = document.getElementById('timerDisplay').innerText;
    const p = display.split(':');
    let atualSegundos = (parseInt(p[0]) * 60) + parseInt(p[1]);
    clearInterval(timerInterval);
    let restante = atualSegundos + s;
    const displayEl = document.getElementById('timerDisplay');
    timerInterval = setInterval(() => {
        restante--;
        const m = Math.floor(restante / 60).toString().padStart(2, '0');
        const s = (restante % 60).toString().padStart(2, '0');
        displayEl.innerText = `${m}:${s}`;
        if (restante <= 0) { clearInterval(timerInterval); fecharTimer(); }
    }, 1000);
}

window.fecharTimer = function() { document.getElementById('timerOverlay').classList.add('hidden'); if(timerInterval) clearInterval(timerInterval); }
window.adicionarTempo = adicionarTempo; 

/* ================= FUNÇÕES BÁSICAS ================= */
function salvarPeso(exId, v) {
  if(!v) return;
  if(!alunoLogado.registros) alunoLogado.registros={};
  alunoLogado.registros[`${moduloTreinoAtual}_${exId}_peso`] = v;
  if(!alunoLogado.historicoCargas) alunoLogado.historicoCargas={};
  if(!alunoLogado.historicoCargas[exId]) alunoLogado.historicoCargas[exId]=[];
  const h = new Date().toLocaleDateString('pt-BR').slice(0,5);
  const hist = alunoLogado.historicoCargas[exId];
  const ent = hist.find(x => x.data === h);
  if(ent) ent.carga = parseFloat(v); else hist.push({data:h, carga:parseFloat(v)});
  salvarNaNuvem(alunoLogado);
}

function atualizarBarraProgresso() {
  const totalSets = document.querySelectorAll('.set-circle').length;
  if(totalSets===0) return 0;
  const doneSets = document.querySelectorAll('.set-circle.done').length;
  const p = Math.round((doneSets/totalSets)*100);
  document.getElementById('barraProgresso').style.width = `${p}%`;
  document.getElementById('progressoPorcentagem').innerText = `${p}%`;
  return p;
}

function registrarDiaDeFogo() {
    const h = new Date().toLocaleDateString('pt-BR');
    if(!alunoLogado.historicoFogo) alunoLogado.historicoFogo=[];
    if(!alunoLogado.historicoFogo.includes(h)) {
        alunoLogado.historicoFogo.push(h);
        salvarNaNuvem(alunoLogado);
        alert("Treino completo! 🔥");
        atualizarDisplayFogo();
    }
}
function atualizarDisplayFogo() { document.getElementById('streakCount').innerText = alunoLogado.historicoFogo ? alunoLogado.historicoFogo.length : 0; }

function carregarEstatisticas() {
    if (!alunoLogado) return;
    const ctxPeso = document.getElementById('graficoPesoCanvas');
    if(ctxPeso) {
        let labels=[], dados=[];
        if(alunoLogado.pesoInicial) { labels.push("Início"); dados.push(alunoLogado.pesoInicial); }
        if(alunoLogado.historicoPeso) { alunoLogado.historicoPeso.forEach(x => { labels.push(x.data); dados.push(x.peso); }); }
        if(chartPeso) chartPeso.destroy();
        chartPeso = new Chart(ctxPeso, { type: 'line', data: { labels, datasets: [{ label: 'Peso (kg)', data: dados, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.15)', borderWidth:3, tension:0.4, fill:true, pointBackgroundColor:'#020617', pointBorderColor:'#10b981' }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display:false }, y: { grid:{ color:'rgba(255,255,255,0.05)' } } } } });
    }
    renderizarGraficoFrequenciaReal();
    povoarSelectExercicios();
}

function renderizarGraficoFrequenciaReal() {
    let hist = alunoLogado.historicoFogo || [];
    const container = document.getElementById('graficoSemanal');
    container.innerHTML = "";
    const hoje = new Date();
    const dom = new Date(hoje); dom.setDate(hoje.getDate() - hoje.getDay());
    const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    for(let i=0; i<7; i++) {
        const d = new Date(dom); d.setDate(dom.getDate()+i);
        const str = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
        const active = hist.includes(str) ? 'active' : '';
        const h = active ? '100%' : '10%';
        container.innerHTML += `<div class="chart-bar-wrapper"><div class="chart-bar ${active}" style="height:${h}"></div><span class="week-day">${dias[i]}</span></div>`;
    }
}

function povoarSelectExercicios() {
    const sel = document.getElementById('selectExercicioGrafico');
    if(!sel) return;
    let ids = Object.keys(alunoLogado.historicoCargas || {});
    sel.innerHTML = "";
    if(ids.length===0) { sel.innerHTML="<option>Sem dados</option>"; return; }
    ids.forEach(id => { const nome = todosExercicios.find(e=>e.id==id)?.nome || "Ex "+id; sel.innerHTML+=`<option value="${id}">${nome}</option>`; });
    atualizarGraficoCarga();
}

function atualizarGraficoCarga() {
    const id = document.getElementById('selectExercicioGrafico').value;
    if(!id || !alunoLogado.historicoCargas) return;
    const hist = alunoLogado.historicoCargas[id] || [];
    const labels = hist.map(x=>x.data);
    const dados = hist.map(x=>x.carga);
    if(dados.length>0) {
        document.getElementById('cargaInicialDisplay').innerText = dados[0]+"kg";
        document.getElementById('recordeDisplay').innerText = Math.max(...dados)+"kg";
    }
    const ctx = document.getElementById('graficoCargaCanvas');
    if(chartCarga) chartCarga.destroy();
    chartCarga = new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: 'Carga', data: dados, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.15)', borderWidth:3, tension:0.3, fill:true, pointBackgroundColor:'#020617', pointBorderColor:'#3b82f6' }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display:false }, y: { grid:{ color:'rgba(255,255,255,0.05)' } } } } });
}

function salvarPesoCorporal(v) {
    if(!v) return;
    if(!alunoLogado.pesoInicial) { alunoLogado.pesoInicial=v; document.getElementById('pesoInicialInput').value=v; }
    alunoLogado.pesoAtual = v;
    if(!alunoLogado.historicoPeso) alunoLogado.historicoPeso=[];
    const h = new Date().toLocaleDateString('pt-BR').slice(0,5);
    const reg = alunoLogado.historicoPeso.find(x=>x.data===h);
    if(reg) reg.peso=parseFloat(v); else alunoLogado.historicoPeso.push({data:h, peso:parseFloat(v)});
    salvarNaNuvem(alunoLogado); carregarEstatisticas();
}

function atualizarDisplayVencimentoPerfil() {
    const el = document.getElementById('vencimentoPerfil');
    const st = document.getElementById('statusPagamento');
    if(!alunoLogado.vencimento) { el.innerText="--/--"; st.innerText="N/A"; return; }
    const p = alunoLogado.vencimento.split('-');
    el.innerText = `${p[2]}/${p[1]}/${p[0]}`;
    const h = new Date(); const v = new Date(alunoLogado.vencimento); v.setHours(23,59,59);
    if(h > v) { st.innerText="Atrasado"; st.style.color="#f87171"; st.style.background="rgba(239,68,68,0.2)"; }
    else { st.innerText="Em dia"; st.style.color="#10b981"; st.style.background="rgba(16,185,129,0.2)"; }
}

function obterIcone(g){const m={'Perna':'🦵','Peito':'🏋️','Costas':'🦍','Ombro':'🥥','Bíceps':'💪','Tríceps':'💪','Abs':'🔥','Cardio':'🏃'};return m[g]||'📋';}
function toggleFormulario(){document.getElementById('formCadastroAluno').classList.toggle('hidden');}
async function cadastrarAluno(){const n=document.getElementById('novoNome').value; const t=document.getElementById('novoTel').value; const d=document.getElementById('novoVencimento').value; if(!n||!t)return alert('Preencha tudo'); const novo={nome:n,telefone:t,vencimento:d,treinos:{A:{exercicios:[]},B:{exercicios:[]},C:{exercicios:[]},D:{exercicios:[]},E:{exercicios:[]}}}; listaDeAlunos.push(novo); await salvarNaNuvem(novo); renderizarListaAlunosAdmin(); toggleFormulario();}
async function excluirAluno(t){const aluno = listaDeAlunos.find(a=>a.telefone===t); if(aluno && confirm("Apagar?")) { listaDeAlunos=listaDeAlunos.filter(a=>a.telefone!==t); renderizarListaAlunosAdmin(); await apagarDaNuvem(t); }}
function voltarTreinos(){mostrarTela('treinos');}
function abrirVideo(t){document.getElementById('videoModal').classList.add('active'); document.getElementById('videoTitulo').innerText=t;}
function fecharVideo(){document.getElementById('videoModal').classList.remove('active');}
function filtrarAlunos(){renderizarListaAlunosAdmin(document.getElementById('inputBusca').value);}
function mostrarTela(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); 
    document.getElementById(id).classList.add('active'); 
    
    // NAVEGAÇÃO
    const nav=document.getElementById('mainNav'); 
    if(id.includes('dash')||id==='login') nav.style.display='none'; 
    else if(alunoLogado) nav.style.display='flex';

    // RESETAR CORES
    document.querySelectorAll('.nav-item').forEach(btn => btn.style.color = '#64748b');

    // LOGICA ESPECÍFICA DAS TELAS
    if (id === 'estatisticas') { carregarEstatisticas(); document.querySelector('.nav-item:nth-child(1)').style.color = '#f8fafc'; }
    if (id === 'cardio') { renderizarCardio(); document.querySelector('.nav-item:nth-child(2)').style.color = '#10b981'; } // Highlight verde para Cardio
    if (id === 'treinos') { /* Central é auto */ }
    if (id === 'conta') { document.querySelector('.nav-item:last-child').style.color = '#f8fafc'; }
}

/* ================= SPOTIFY ================= */
function abrirSpotify() { document.getElementById('spotifyModal').classList.add('active'); }
function fecharSpotify() { document.getElementById('spotifyModal').classList.remove('active'); }
}

