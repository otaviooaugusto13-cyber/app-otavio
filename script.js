/* ================= DADOS E VARIÁVEIS GLOBAIS ================= */
const todosExercicios = [
  { id: 1, nome: "Agachamento Livre", grupo: "Perna" }, { id: 2, nome: "Leg Press 45", grupo: "Perna" },
  { id: 3, nome: "Cadeira Extensora", grupo: "Perna" }, { id: 4, nome: "Mesa Flexora", grupo: "Perna" },
  { id: 5, nome: "Supino Reto", grupo: "Peito" }, { id: 6, nome: "Supino Inclinado", grupo: "Peito" },
  { id: 7, nome: "Puxada Alta", grupo: "Costas" }, { id: 8, nome: "Remada Baixa", grupo: "Costas" },
  { id: 9, nome: "Elevação Lateral", grupo: "Ombro" }, { id: 10, nome: "Rosca Direta", grupo: "Bíceps" },
  { id: 11, nome: "Tríceps Pulley", grupo: "Tríceps" }, { id: 12, nome: "Esteira", grupo: "Cardio" },
  { id: 13, nome: "Bicicleta", grupo: "Cardio" }, { id: 14, nome: "Elíptico", grupo: "Cardio" }
];

let listaDeAcademias = [];
let listaDeAlunos = []; 
let usuarioLogado = null; // Pode ser 'master', objeto academia ou objeto aluno
let alunoEmEdicaoId = null; 
let moduloEmEdicao = 'A'; 
const MODULOS_DISPONIVEIS = ['A', 'B', 'C', 'D', 'E']; 

// Variáveis de Gráfico e Timer
let chartPeso = null; let chartCarga = null; let timerInterval = null;
let cardioInterval = null; let cardioSeconds = 0; let cardioRunning = false;

/* ================= INICIALIZAÇÃO ================= */
setTimeout(() => { carregarDadosDaNuvem(); }, 1500);

async function carregarDadosDaNuvem() {
    if (!window.db) { console.warn("Aguardando Firebase..."); return; }
    try {
        // Carrega Academias
        const snapGym = await window.f_getDocs(window.f_collection(window.db, "academias"));
        listaDeAcademias = [];
        snapGym.forEach(doc => listaDeAcademias.push(doc.data()));

        // Carrega Alunos
        const snapAlunos = await window.f_getDocs(window.f_collection(window.db, "alunos"));
        listaDeAlunos = [];
        snapAlunos.forEach(doc => listaDeAlunos.push(doc.data()));
        
        console.log("Dados: ", listaDeAcademias.length, "academias,", listaDeAlunos.length, "alunos.");
        verificarSessao();
    } catch (e) { console.error("Erro dados:", e); }
}

async function salvarNaColecao(colecao, id, dados) {
    if (!window.db) return;
    try { await window.f_setDoc(window.f_doc(window.db, colecao, id), dados); } 
    catch (e) { console.error(e); }
}

/* ================= SISTEMA DE LOGIN (HIERARQUIA) ================= */
function autenticar() {
  const login = document.getElementById('userEmail').value.trim();
  const pass = document.getElementById('userPass').value.trim();

  // 1. LOGIN MASTER (Você - Otavio)
  if (login === 'master' && pass === 'admin123') {
    usuarioLogado = { tipo: 'master', nome: 'Otavio' };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    abrirPainelMaster();
    return;
  }

  // 2. LOGIN ACADEMIA (Dono da Academia)
  const academia = listaDeAcademias.find(a => a.login === login && a.senha === pass);
  if (academia) {
    usuarioLogado = { tipo: 'academia', ...academia };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    abrirPainelProfessor();
    return;
  }

  // 3. LOGIN ALUNO (Usa só telefone/login, senha opcional por enquanto ou fixa 123)
  const aluno = listaDeAlunos.find(a => a.telefone === login);
  if (aluno) {
    usuarioLogado = { tipo: 'aluno', ...aluno };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    abrirAppAluno();
    return;
  }

  alert("Login ou senha incorretos.");
}

function verificarSessao() {
    const sessao = localStorage.getItem("usuarioLogado");
    if (sessao) {
        usuarioLogado = JSON.parse(sessao);
        if (usuarioLogado.tipo === 'master') abrirPainelMaster();
        else if (usuarioLogado.tipo === 'academia') abrirPainelProfessor();
        else if (usuarioLogado.tipo === 'aluno') {
            // Atualiza dados frescos
            const fresco = listaDeAlunos.find(a => a.telefone === usuarioLogado.telefone);
            if(fresco) { usuarioLogado = {tipo:'aluno', ...fresco}; abrirAppAluno(); }
        }
    }
}

function logout() { localStorage.removeItem("usuarioLogado"); window.location.reload(); }
function loginMaster() { document.getElementById('userEmail').value = "master"; }

/* ================= PAINEL MASTER (CRIA ACADEMIAS) ================= */
function abrirPainelMaster() {
    mostrarTela('dashMaster');
    renderizarListaAcademias();
}

async function criarAcademia() {
    const nome = document.getElementById('novaAcademiaNome').value;
    const login = document.getElementById('novaAcademiaLogin').value;
    const senha = document.getElementById('novaAcademiaPass').value;

    if(!nome || !login || !senha) return alert("Preencha tudo!");
    if(listaDeAcademias.some(a => a.login === login)) return alert("Login já existe!");

    const novaGym = { id: 'gym_' + Date.now(), nome, login, senha };
    listaDeAcademias.push(novaGym);
    await salvarNaColecao("academias", novaGym.id, novaGym);
    
    renderizarListaAcademias();
    alert("Academia criada com sucesso!");
    document.getElementById('novaAcademiaNome').value = "";
}

function renderizarListaAcademias() {
    const div = document.getElementById('listaAcademias');
    div.innerHTML = "";
    listaDeAcademias.forEach(a => {
        div.innerHTML += `<div class="student-card"><div class="student-info"><h3>${a.nome}</h3><p>Login: ${a.login}</p></div></div>`;
    });
}

/* ================= PAINEL PROFESSOR (FILTRADO POR ACADEMIA) ================= */
function abrirPainelProfessor() {
    mostrarTela('dashProfessor');
    document.getElementById('nomeAcademiaTitulo').innerText = usuarioLogado.nome;
    renderizarListaAlunosAdmin();
}

function renderizarListaAlunosAdmin(filtro = "") {
    const container = document.getElementById('listaAlunosCoach');
    container.innerHTML = "";
    
    // FILTRO VITAL: Só mostra alunos desta academia
    const meusAlunos = listaDeAlunos.filter(aluno => aluno.academiaId === usuarioLogado.id);
    document.getElementById('totalAlunos').innerText = meusAlunos.length;

    const listaFiltrada = meusAlunos.filter(a => a.nome.toLowerCase().includes(filtro.toLowerCase()) || a.telefone.includes(filtro));

    listaFiltrada.forEach(aluno => {
        container.innerHTML += `
        <div class="student-card">
            <div class="student-info"><h3>${aluno.nome}</h3><p>${aluno.telefone}</p></div>
            <div class="student-actions">
            <button class="btn-icon btn-edit" onclick="abrirEditorTreino('${aluno.telefone}')"><span class="material-icons-round">edit_note</span></button>
            </div>
        </div>`;
    });
}

async function cadastrarAluno() {
    const nome = document.getElementById('novoNome').value;
    const tel = document.getElementById('novoTel').value;
    const dataVenc = document.getElementById('novoVencimento').value;

    if (!nome || !tel) return alert("Preencha nome e telefone.");
    // Garante que o telefone é único no sistema todo (para login funcionar)
    if(listaDeAlunos.some(a => a.telefone === tel)) return alert("Este login já existe em outra academia!");

    const novoAluno = {
        nome: nome, telefone: tel, vencimento: dataVenc,
        academiaId: usuarioLogado.id, // VINCULA O ALUNO A ESTA ACADEMIA
        academiaNome: usuarioLogado.nome,
        pesoInicial: "", pesoAtual: "", historicoPeso: [], historicoCargas: {}, registros: {},
        treinos: { A: { exercicios: [] }, B: { exercicios: [] }, C: { exercicios: [] }, D: { exercicios: [] }, E: { exercicios: [] } }
    };

    listaDeAlunos.push(novoAluno);
    await salvarNaColecao("alunos", novoAluno.telefone, novoAluno);
    
    renderizarListaAlunosAdmin();
    toggleFormulario();
    alert("Aluno cadastrado na " + usuarioLogado.nome + "!");
}

/* ================= EDITOR DE TREINO ================= */
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
  const container = document.getElementById('listaSelecao'); container.innerHTML = "";
  const aluno = listaDeAlunos.find(a => a.telefone === alunoEmEdicaoId);
  const exerciciosSalvos = aluno.treinos[moduloEmEdicao].exercicios || [];
  const grupos = {};
  todosExercicios.forEach(ex => { if (!grupos[ex.grupo]) grupos[ex.grupo] = []; grupos[ex.grupo].push(ex); });

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
          <div class="admin-row-left"><input type="checkbox" id="check_${ex.id}" value="${ex.id}" ${isChecked}><label for="check_${ex.id}" style="color:white; font-size: 0.9rem; cursor:pointer;">${ex.nome}</label></div>
          <div class="admin-row-options">
            <select id="descanso_${ex.id}" class="admin-input-mini w-time"><option value="Descanso" disabled ${valDescanso === "Descanso" ? "selected" : ""}>⏱️</option><option value="30s" ${valDescanso === "30s" ? "selected" : ""}>30s</option><option value="45s" ${valDescanso === "45s" ? "selected" : ""}>45s</option><option value="1min" ${valDescanso === "1min" ? "selected" : ""}>1m</option><option value="1:30" ${valDescanso === "1:30" ? "selected" : ""}>1:30</option><option value="2min" ${valDescanso === "2min" ? "selected" : ""}>2m</option></select>
            <select id="metodo_${ex.id}" class="admin-input-mini w-method"><option value="Normal" ${valMetodo === "Normal" ? "selected" : ""}>Normal</option><option value="Falha" ${valMetodo === "Falha" ? "selected" : ""}>Falha</option><option value="Drop" ${valMetodo === "Drop" ? "selected" : ""}>Drop</option><option value="Bi-set" ${valMetodo === "Bi-set" ? "selected" : ""}>Bi-set</option><option value="FST-7" ${valMetodo === "FST-7" ? "selected" : ""}>FST-7</option><option value="Aquec." ${valMetodo === "Aquec." ? "selected" : ""}>Aquec.</option></select>
            <input type="text" id="series_${ex.id}" class="admin-input-mini w-text" placeholder="3x12" value="${valSeries}" maxlength="8">
          </div>
        </div>`;
    });
  });
}

function salvarTreinoPersonal() {
  const marcados = document.querySelectorAll('#listaSelecao input[type="checkbox"]:checked');
  const listaFinal = [];
  marcados.forEach(checkbox => {
    const id = parseInt(checkbox.value); const exBase = todosExercicios.find(e => e.id === id);
    const descanso = document.getElementById(`descanso_${id}`).value;
    const metodo = document.getElementById(`metodo_${id}`).value;
    const series = document.getElementById(`series_${id}`).value;
    listaFinal.push({ ...exBase, descanso: descanso !== "Descanso" ? descanso : "1min", metodo: metodo, series: series || "3x12" });
  });
  const idx = listaDeAlunos.findIndex(a => a.telefone === alunoEmEdicaoId);
  listaDeAlunos[idx].treinos[moduloEmEdicao].exercicios = listaFinal;
  salvarNaColecao("alunos", listaDeAlunos[idx].telefone, listaDeAlunos[idx]);
  alert("Treino salvo!");
}

/* ================= APP DO ALUNO ================= */
function abrirAppAluno() {
    const nome = usuarioLogado.nome.split(' ')[0];
    document.querySelector('.header-student h1').innerHTML = `Olá, <span style="color:#10b981">${nome}</span>`;
    
    renderizarCardsTreino();
    atualizarDisplayVencimentoPerfil();
    
    document.getElementById('nomePerfil').innerText = usuarioLogado.nome;
    document.getElementById('academiaAlunoBadge').innerText = usuarioLogado.academiaNome || "Academia";
    document.getElementById('telPerfil').innerText = usuarioLogado.telefone;
    document.getElementById('pesoInicialInput').value = usuarioLogado.pesoInicial || "";
    document.getElementById('pesoAtualInput').value = usuarioLogado.pesoAtual || "";
    if(usuarioLogado.spotifyUrl) document.getElementById('spotifyLinkInput').value = usuarioLogado.spotifyUrl;
    
    mostrarTela('treinos');
    document.getElementById('mainNav').style.display = 'flex';
}

function renderizarCardsTreino() {
    const grid = document.getElementById('containerTreinosAluno'); grid.innerHTML = "";
    MODULOS_DISPONIVEIS.forEach(letra => {
        const treino = usuarioLogado.treinos[letra]; const qtd = treino ? treino.exercicios.length : 0;
        let cor = (letra === 'B'||letra==='E')?"blue":(letra==='C')?"purple":"";
        if (qtd > 0) grid.innerHTML += `<div class="treino-card" onclick="abrirTreino('${letra}')"><div class="icon-box ${cor}">${letra}</div><div class="info"><h3>Treino ${letra}</h3><p>${qtd} exercícios</p></div><span class="material-icons-round">chevron_right</span></div>`;
    });
}

function abrirTreino(modulo) {
  moduloTreinoAtual = modulo; const listaEx = usuarioLogado.treinos[modulo].exercicios;
  mostrarTela('detalheTreino'); document.getElementById('tituloTreino').innerText = `Treino ${modulo}`;
  const container = document.getElementById('listaExercicios'); container.innerHTML = "";
  
  listaEx.forEach(ex => {
    if(!usuarioLogado.registros) usuarioLogado.registros = {};
    const keyPeso = `${modulo}_${ex.id}_peso`; 
    const pesoSalvo = usuarioLogado.registros[keyPeso] || "";
    
    const badgeSeries = ex.series ? `<span class="badge-info badge-series">📋 ${ex.series}</span>` : "";
    const badgeDescanso = ex.descanso ? `<span class="badge-info badge-rest">⏰ ${ex.descanso}</span>` : "";
    const badgeMetodo = ex.metodo && ex.metodo !== "Normal" ? `<span class="badge-info badge-method">${ex.metodo}</span>` : "";
    
    let numSeries = parseInt(ex.series); if (isNaN(numSeries) || numSeries < 1) numSeries = 3;
    let bolinhasHTML = '<div class="sets-container">';
    for(let i=1; i<=numSeries; i++) {
        const setKey = `${modulo}_${ex.id}_set_${i}`; const isDone = usuarioLogado.registros[setKey] ? "done" : "";
        bolinhasHTML += `<div class="set-circle ${isDone}" onclick="toggleSet('${ex.id}', ${i}, '${ex.descanso || '1min'}', this)">${i}</div>`;
    }
    bolinhasHTML += '</div>';

    container.innerHTML += `
      <div class="exercise-item">
        <div class="exercise-header"><span class="exercise-name">${ex.nome}</span><button class="btn-video-mini" onclick="abrirVideo('${ex.nome}')"><span class="material-icons-round" style="font-size:14px">play_arrow</span> Vídeo</button></div>
        <div class="exercise-badges">${badgeSeries} ${badgeDescanso} ${badgeMetodo}</div>
        <div class="exercise-controls"><div class="input-carga-wrapper"><span class="label">Carga</span><input type="tel" class="input-carga" placeholder="0" value="${pesoSalvo}" onblur="salvarPeso('${ex.id}', this.value)"></div>${bolinhasHTML}</div>
      </div>`;
  });
  atualizarBarraProgresso();
}

function toggleSet(exId, setIndex, descanso, elemento) {
    if(navigator.vibrate) navigator.vibrate(30);
    elemento.classList.toggle('done');
    const isDone = elemento.classList.contains('done');
    const key = `${moduloTreinoAtual}_${exId}_set_${setIndex}`;
    if(!usuarioLogado.registros) usuarioLogado.registros = {};
    usuarioLogado.registros[key] = isDone;
    salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado);
    if(isDone) iniciarTimer(descanso);
    atualizarBarraProgresso();
}

function salvarPeso(exId, v) {
  if(!v) return; if(!usuarioLogado.registros) usuarioLogado.registros={};
  usuarioLogado.registros[`${moduloTreinoAtual}_${exId}_peso`] = v;
  salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado);
}

function atualizarBarraProgresso() {
  const t = document.querySelectorAll('.set-circle').length; if(t===0) return;
  const c = document.querySelectorAll('.set-circle.done').length;
  document.getElementById('barraProgresso').style.width = `${(c/t)*100}%`;
  document.getElementById('progressoPorcentagem').innerText = `${Math.round((c/t)*100)}%`;
}

/* ================= TIMER, SPOTIFY E UTILITÁRIOS ================= */
function iniciarTimer(tempoStr) {
    let segs = 60; const t = tempoStr.toLowerCase();
    if(t.includes('min')) segs = parseInt(t) * 60; else if(t.includes('s')) segs = parseInt(t);
    const overlay = document.getElementById('timerOverlay'); const disp = document.getElementById('timerDisplay');
    overlay.classList.remove('hidden'); if(timerInterval) clearInterval(timerInterval);
    let restante = segs;
    const tick = () => {
        const m = Math.floor(restante/60).toString().padStart(2,'0');
        const s = (restante%60).toString().padStart(2,'0');
        disp.innerText = `${m}:${s}`;
        if(restante <= 0) { clearInterval(timerInterval); if(navigator.vibrate) navigator.vibrate([800,400,800,400,800]); fecharTimer(); }
        restante--;
    };
    tick(); timerInterval = setInterval(tick, 1000);
}
function fecharTimer() { document.getElementById('timerOverlay').classList.add('hidden'); if(timerInterval) clearInterval(timerInterval); }
function adicionarTempo() { fecharTimer(); setTimeout(() => iniciarTimer('15s'), 100); }
window.adicionarTempo = adicionarTempo; window.fecharTimer = fecharTimer;

// Spotify
function abrirSpotify() {
    if(usuarioLogado && usuarioLogado.spotifyUrl) document.getElementById('spotifyIframe').src = usuarioLogado.spotifyUrl;
    document.getElementById('spotifyModal').classList.add('active');
}
function fecharSpotify() { document.getElementById('spotifyModal').classList.remove('active'); }
function carregarPlaylistUsuario() {
    const val = document.getElementById('inputPlaylistUrl').value.trim();
    if(!val) return alert("Cole o link!");
    let link = val;
    if(val.includes("open.spotify.com") && !val.includes("/embed/")) {
        const p = val.split('.com/'); if(p[1]) link = `https://open.spotify.com/embed/$${p[1].split('?')[0]}?utm_source=generator&theme=0`;
    }
    document.getElementById('spotifyIframe').src = link;
    if(usuarioLogado) { usuarioLogado.spotifyUrl = link; salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado); }
    alert("Salvo!");
}
window.carregarPlaylistUsuario = carregarPlaylistUsuario; window.abrirSpotify = abrirSpotify; window.fecharSpotify = fecharSpotify;

// Cardio
function renderizarCardio() {
    const l = todosExercicios.filter(e => e.grupo === 'Cardio');
    const c = document.getElementById('listaCardioContainer'); c.innerHTML = "";
    l.forEach(x => { c.innerHTML += `<div class="treino-card" onclick="alert('Inicie o timer acima!')" style="padding:15px"><div class="icon-box blue"><span class="material-icons-round">directions_run</span></div><div class="info"><h3>${x.nome}</h3></div></div>`; });
}
function toggleCardioTimer() {
    const btn = document.getElementById('btnCardioAction'); const disp = document.getElementById('cardioTimerDisplay');
    if(!cardioRunning) {
        cardioRunning = true; btn.innerText = "PAUSAR"; btn.style.background = "#eab308";
        cardioInterval = setInterval(() => { cardioSeconds++; const m = Math.floor(cardioSeconds/60).toString().padStart(2,'0'); const s = (cardioSeconds%60).toString().padStart(2,'0'); disp.innerText = `${m}:${s}`; }, 1000);
    } else { cardioRunning = false; clearInterval(cardioInterval); btn.innerText = "RETOMAR"; btn.style.background = "#10b981"; }
}
function resetCardioTimer() { cardioRunning = false; clearInterval(cardioInterval); cardioSeconds=0; document.getElementById('cardioTimerDisplay').innerText="00:00"; document.getElementById('btnCardioAction').innerText="INICIAR"; }
window.toggleCardioTimer = toggleCardioTimer; window.resetCardioTimer = resetCardioTimer;

// Utils
function mostrarTela(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    const nav = document.getElementById('mainNav');
    if (['login','dashMaster','dashProfessor','painelPersonal'].includes(id)) nav.style.display = 'none';
    else if (usuarioLogado && usuarioLogado.tipo === 'aluno') nav.style.display = 'flex';
}
function toggleFormulario() { document.getElementById('formCadastroAluno').classList.toggle('hidden'); }
function filtrarAlunos() { renderizarListaAlunosAdmin(document.getElementById('inputBusca').value); }
function obterIcone(g){const m={'Perna':'🦵','Peito':'🏋️','Costas':'🦍','Ombro':'🥥','Bíceps':'💪','Tríceps':'💪','Cardio':'🏃'};return m[g]||'📋';}
function abrirVideo(t) { document.getElementById('videoModal').classList.add('active'); document.getElementById('videoTitulo').innerText=t; }
function fecharVideo() { document.getElementById('videoModal').classList.remove('active'); }
function atualizarDisplayVencimentoPerfil() {
    const el = document.getElementById('vencimentoPerfil'); const st = document.getElementById('statusPagamento');
    if(!usuarioLogado.vencimento) { el.innerText="--/--"; st.innerText="N/A"; return; }
    const p = usuarioLogado.vencimento.split('-'); el.innerText = `${p[2]}/${p[1]}/${p[0]}`;
}
function carregarEstatisticas() { /* Lógica gráficos se mantém */ }

// Torna global
window.autenticar = autenticar;
window.loginMaster = loginMaster;
window.criarAcademia = criarAcademia;
window.toggleFormulario = toggleFormulario;
window.cadastrarAluno = cadastrarAluno;
window.abrirEditorTreino = abrirEditorTreino;
window.salvarTreinoPersonal = salvarTreinoPersonal;
window.trocarModuloEdicao = trocarModuloEdicao;
window.abrirTreino = abrirTreino;
window.toggleSet = toggleSet;
window.salvarPeso = salvarPeso;
window.voltarTreinos = () => mostrarTela('treinos');
window.abrirVideo = abrirVideo;
window.fecharVideo = fecharVideo;
window.filtrarAlunos = filtrarAlunos;
window.mostrarTela = mostrarTela;
window.logout = logout;
