/* ================= BANCO DE DADOS COMPLETO ================= */
const todosExercicios = [
  // PERNA
  { id: 1, nome: "Agachamento Livre", grupo: "Perna" }, { id: 2, nome: "Agachamento Smith", grupo: "Perna" },
  { id: 3, nome: "Agachamento Hack", grupo: "Perna" }, { id: 4, nome: "Leg Press 45º", grupo: "Perna" },
  { id: 5, nome: "Leg Press Horizontal", grupo: "Perna" }, { id: 6, nome: "Cadeira Extensora", grupo: "Perna" },
  { id: 7, nome: "Mesa Flexora", grupo: "Perna" }, { id: 8, nome: "Cadeira Flexora", grupo: "Perna" },
  { id: 9, nome: "Stiff com Barra", grupo: "Perna" }, { id: 10, nome: "Levantamento Terra", grupo: "Perna" },
  { id: 11, nome: "Afundo / Passada", grupo: "Perna" }, { id: 12, nome: "Búlgaro", grupo: "Perna" },
  { id: 13, nome: "Elevação Pélvica", grupo: "Perna" }, { id: 14, nome: "Cadeira Adutora", grupo: "Perna" },
  { id: 15, nome: "Cadeira Abdutora", grupo: "Perna" }, { id: 16, nome: "Panturrilha Sentado", grupo: "Perna" },
  { id: 17, nome: "Panturrilha no Leg", grupo: "Perna" },
  // PEITO
  { id: 20, nome: "Supino Reto (Barra)", grupo: "Peito" }, { id: 21, nome: "Supino Reto (Halter)", grupo: "Peito" },
  { id: 22, nome: "Supino Inclinado (Barra)", grupo: "Peito" }, { id: 23, nome: "Supino Inclinado (Halter)", grupo: "Peito" },
  { id: 24, nome: "Supino Declinado", grupo: "Peito" }, { id: 25, nome: "Crucifixo Máquina", grupo: "Peito" },
  { id: 26, nome: "Crucifixo Halter", grupo: "Peito" }, { id: 27, nome: "Crossover Polia Alta", grupo: "Peito" },
  { id: 28, nome: "Crossover Polia Baixa", grupo: "Peito" }, { id: 29, nome: "Flexão de Braço", grupo: "Peito" },
  { id: 30, nome: "Supino Máquina", grupo: "Peito" },
  // COSTAS
  { id: 40, nome: "Puxada Alta (Frente)", grupo: "Costas" }, { id: 41, nome: "Puxada Alta (Triângulo)", grupo: "Costas" },
  { id: 42, nome: "Puxada Alta (Costas)", grupo: "Costas" }, { id: 43, nome: "Remada Baixa", grupo: "Costas" },
  { id: 44, nome: "Remada Curvada", grupo: "Costas" }, { id: 45, nome: "Remada Cavalinho", grupo: "Costas" },
  { id: 46, nome: "Remada Serrote", grupo: "Costas" }, { id: 47, nome: "Pulldown", grupo: "Costas" },
  { id: 48, nome: "Barra Fixa", grupo: "Costas" }, { id: 49, nome: "Voador Inverso", grupo: "Costas" },
  { id: 50, nome: "Lombar Máquina", grupo: "Costas" },
  // OMBRO
  { id: 60, nome: "Desenv. Halter", grupo: "Ombro" }, { id: 61, nome: "Desenv. Máquina", grupo: "Ombro" },
  { id: 62, nome: "Desenv. Barra", grupo: "Ombro" }, { id: 63, nome: "Elevação Lateral", grupo: "Ombro" },
  { id: 64, nome: "Elevação Frontal", grupo: "Ombro" }, { id: 65, nome: "Remada Alta", grupo: "Ombro" },
  { id: 66, nome: "Encolhimento", grupo: "Ombro" },
  // BÍCEPS
  { id: 70, nome: "Rosca Direta (Barra)", grupo: "Bíceps" }, { id: 71, nome: "Rosca Direta (Polia)", grupo: "Bíceps" },
  { id: 72, nome: "Rosca Alternada", grupo: "Bíceps" }, { id: 73, nome: "Rosca Martelo", grupo: "Bíceps" },
  { id: 74, nome: "Rosca Scott", grupo: "Bíceps" }, { id: 75, nome: "Rosca Concentrada", grupo: "Bíceps" }, { id: 76, nome: "Rosca 21", grupo: "Bíceps" },
  // TRÍCEPS
  { id: 80, nome: "Tríceps Polia", grupo: "Tríceps" }, { id: 81, nome: "Tríceps Corda", grupo: "Tríceps" },
  { id: 82, nome: "Tríceps Testa", grupo: "Tríceps" }, { id: 83, nome: "Tríceps Francês", grupo: "Tríceps" },
  { id: 84, nome: "Tríceps Banco", grupo: "Tríceps" }, { id: 85, nome: "Tríceps Coice", grupo: "Tríceps" },
  // OUTROS
  { id: 90, nome: "Abdominal Supra", grupo: "Abs" }, { id: 91, nome: "Abdominal Infra", grupo: "Abs" },
  { id: 92, nome: "Prancha", grupo: "Abs" }, { id: 93, nome: "Abdominal Máquina", grupo: "Abs" },
  { id: 94, nome: "Esteira", grupo: "Cardio" }, { id: 95, nome: "Bike Ergométrica", grupo: "Cardio" }, { id: 96, nome: "Elíptico", grupo: "Cardio" }
];

/* ================= ESTADO GLOBAL ================= */
let listaDeAcademias = [];
let listaDeAlunos = []; 
let usuarioLogado = null; 
let alunoEmEdicaoId = null; 
let moduloEmEdicao = 'A'; 
const MODULOS_DISPONIVEIS = ['A', 'B', 'C', 'D', 'E']; 

// Features
let chartComposicao = null; let chartCarga = null; let timerInterval = null;
let cardioInterval = null; let cardioSeconds = 0; let cardioRunning = false;

/* ================= INICIALIZAÇÃO ================= */
setTimeout(() => { carregarDadosDaNuvem(); }, 1500);

async function carregarDadosDaNuvem() {
    if (!window.db) { console.warn("Aguardando Firebase..."); return; }
    try {
        const snapGym = await window.f_getDocs(window.f_collection(window.db, "academias"));
        listaDeAcademias = []; snapGym.forEach(doc => listaDeAcademias.push(doc.data()));

        const snapAlunos = await window.f_getDocs(window.f_collection(window.db, "alunos"));
        listaDeAlunos = []; snapAlunos.forEach(doc => listaDeAlunos.push(doc.data()));
        
        console.log("Dados carregados (Online/Cache).");
        verificarSessao();
    } catch (e) { console.error("Erro dados:", e); }
}

async function salvarNaColecao(colecao, id, dados) {
    if (!window.db) return;
    try { await window.f_setDoc(window.f_doc(window.db, colecao, id), dados); } 
    catch (e) { console.error(e); }
}

/* ================= LOGIN ================= */
function autenticar() {
  const login = document.getElementById('userEmail').value.trim();
  const pass = document.getElementById('userPass').value.trim();

  // 1. MASTER
  if (login === 'master' && pass === 'admin123') {
    usuarioLogado = { tipo: 'master', nome: 'Otavio Master' };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    abrirPainelMaster(); return;
  }
  // 2. ACADEMIA
  const academia = listaDeAcademias.find(a => a.login === login && a.senha === pass);
  if (academia) {
    usuarioLogado = { tipo: 'academia', ...academia };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    abrirPainelProfessor(); return;
  }
  // 3. ALUNO
  const aluno = listaDeAlunos.find(a => a.telefone === login);
  if (aluno) {
    usuarioLogado = { tipo: 'aluno', ...aluno };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    abrirAppAluno(); return;
  }
  alert("Login incorreto.");
}

function verificarSessao() {
    const sessao = localStorage.getItem("usuarioLogado");
    if (sessao) {
        usuarioLogado = JSON.parse(sessao);
        if (usuarioLogado.tipo === 'master') abrirPainelMaster();
        else if (usuarioLogado.tipo === 'academia') abrirPainelProfessor();
        else if (usuarioLogado.tipo === 'aluno') {
            const fresco = listaDeAlunos.find(a => a.telefone === usuarioLogado.telefone);
            if(fresco) { usuarioLogado = {tipo:'aluno', ...fresco}; abrirAppAluno(); }
        }
    }
}
function logout() { localStorage.removeItem("usuarioLogado"); window.location.reload(); }
function loginMaster() { document.getElementById('userEmail').value = "master"; }

/* ================= PAINEL MASTER ================= */
function abrirPainelMaster() { mostrarTela('dashMaster'); renderizarListaAcademias(); }
async function criarAcademia() {
    const nome = document.getElementById('novaAcademiaNome').value;
    const login = document.getElementById('novaAcademiaLogin').value;
    const senha = document.getElementById('novaAcademiaPass').value;
    if(!nome || !login || !senha) return alert("Preencha tudo!");
    if(listaDeAcademias.some(a => a.login === login)) return alert("Login já existe!");
    const novaGym = { id: 'gym_' + Date.now(), nome, login, senha, aviso: "", avisoAtivo: false };
    listaDeAcademias.push(novaGym);
    await salvarNaColecao("academias", novaGym.id, novaGym);
    renderizarListaAcademias(); alert("Criado!");
}
function renderizarListaAcademias() {
    const div = document.getElementById('listaAcademias'); div.innerHTML = "";
    listaDeAcademias.forEach(a => { div.innerHTML += `<div class="student-card"><div class="student-info"><h3>${a.nome}</h3><p>Login: ${a.login}</p></div></div>`; });
}

/* ================= PAINEL PROFESSOR (COM MURAL LIGA/DESLIGA) ================= */
function abrirPainelProfessor() { 
    mostrarTela('dashProfessor'); 
    document.getElementById('nomeAcademiaTitulo').innerText = usuarioLogado.nome; 
    
    // Carregar Aviso e Estado do Checkbox
    if(usuarioLogado.aviso) document.getElementById('textoAvisoAcademia').value = usuarioLogado.aviso;
    else document.getElementById('textoAvisoAcademia').value = "";
    
    document.getElementById('chkAvisoAtivo').checked = usuarioLogado.avisoAtivo === true;

    renderizarListaAlunosAdmin(); 
}

// SALVAR AVISO (SALVA O ESTADO DO CHECKBOX)
async function salvarAvisoAcademia() {
    const texto = document.getElementById('textoAvisoAcademia').value.trim();
    const ativo = document.getElementById('chkAvisoAtivo').checked;
    
    usuarioLogado.aviso = texto;
    usuarioLogado.avisoAtivo = ativo;
    
    await salvarNaColecao("academias", usuarioLogado.id, usuarioLogado);
    
    // Atualiza Memória Local
    const idx = listaDeAcademias.findIndex(a => a.id === usuarioLogado.id);
    if(idx >= 0) {
        listaDeAcademias[idx].aviso = texto;
        listaDeAcademias[idx].avisoAtivo = ativo;
    }
    
    if(!ativo) alert("Aviso salvo, mas oculto para os alunos.");
    else alert("Aviso publicado e visível!");
}

function renderizarListaAlunosAdmin(filtro = "") {
    const container = document.getElementById('listaAlunosCoach'); container.innerHTML = "";
    const meusAlunos = listaDeAlunos.filter(aluno => aluno.academiaId === usuarioLogado.id);
    document.getElementById('totalAlunos').innerText = meusAlunos.length;
    const listaFiltrada = meusAlunos.filter(a => a.nome.toLowerCase().includes(filtro.toLowerCase()) || a.telefone.includes(filtro));
    listaFiltrada.forEach(aluno => {
        container.innerHTML += `
        <div class="student-card">
            <div class="student-info"><h3>${aluno.nome}</h3><p>${aluno.telefone}</p></div>
            <div class="student-actions">
                <button class="btn-icon" style="background: #334155;" onclick="abrirModalAvaliacao('${aluno.telefone}')" title="Avaliação Física"><span class="material-icons-round" style="color:#eab308">straighten</span></button>
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
    if(listaDeAlunos.some(a => a.telefone === tel)) return alert("Telefone já existe!");
    const novoAluno = {
        nome: nome, telefone: tel, vencimento: dataVenc,
        academiaId: usuarioLogado.id, academiaNome: usuarioLogado.nome,
        pesoInicial: "", historicoFogo: [], historicoAvaliacoes: [], historicoCargas: {}, registros: {},
        treinos: { A: { exercicios: [] }, B: { exercicios: [] }, C: { exercicios: [] }, D: { exercicios: [] }, E: { exercicios: [] } }
    };
    listaDeAlunos.push(novoAluno);
    await salvarNaColecao("alunos", novoAluno.telefone, novoAluno);
    renderizarListaAlunosAdmin(); toggleFormulario();
}

/* ================= AVALIAÇÃO FÍSICA ================= */
let alunoSendoAvaliadoId = null;
function abrirModalAvaliacao(tel) {
    alunoSendoAvaliadoId = tel;
    const aluno = listaDeAlunos.find(a => a.telefone === tel);
    document.getElementById('nomeAlunoAvaliacao').innerText = aluno.nome;
    document.getElementById('modalAvaliacao').classList.add('active');
    document.getElementById('avalPeso').value = "";
    document.getElementById('avalGordura').value = "";
    document.getElementById('avalMusculo').value = "";
}
function fecharModalAvaliacao() { document.getElementById('modalAvaliacao').classList.remove('active'); }
async function salvarAvaliacaoFisica() {
    const peso = document.getElementById('avalPeso').value;
    const gordura = document.getElementById('avalGordura').value;
    const musculo = document.getElementById('avalMusculo').value;
    if(!peso || !gordura) return alert("Preencha Peso e % Gordura");
    const aluno = listaDeAlunos.find(a => a.telefone === alunoSendoAvaliadoId);
    if(!aluno.historicoAvaliacoes) aluno.historicoAvaliacoes = [];
    const hoje = new Date().toLocaleDateString('pt-BR');
    aluno.historicoAvaliacoes.push({ data: hoje, peso: parseFloat(peso), gordura: parseFloat(gordura), musculo: musculo ? parseFloat(musculo) : null });
    await salvarNaColecao("alunos", aluno.telefone, aluno);
    alert("Medidas salvas!"); fecharModalAvaliacao();
}

/* ================= EDITOR DE TREINO ================= */
function abrirEditorTreino(tel) {
  alunoEmEdicaoId = tel; document.getElementById('alunoSendoEditado').innerText = listaDeAlunos.find(a => a.telefone === tel).nome;
  const btns = document.getElementById('botoesModulosAdmin'); btns.innerHTML = "";
  MODULOS_DISPONIVEIS.forEach(m => btns.innerHTML += `<button onclick="trocarModuloEdicao('${m}')" id="btnModulo${m}" class="mod-btn">${m}</button>`);
  trocarModuloEdicao('A'); mostrarTela('painelPersonal');
}
function trocarModuloEdicao(mod) {
  moduloEmEdicao = mod; document.getElementById('moduloAtualNome').innerText = mod;
  document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btnModulo' + mod).classList.add('active');
  renderizarCheckboxes();
}
function renderizarCheckboxes() {
  const container = document.getElementById('listaSelecao'); container.innerHTML = "";
  const aluno = listaDeAlunos.find(a => a.telefone === alunoEmEdicaoId);
  const salvos = aluno.treinos[moduloEmEdicao].exercicios || [];
  const grupos = {}; todosExercicios.forEach(ex => { if(!grupos[ex.grupo]) grupos[ex.grupo] = []; grupos[ex.grupo].push(ex); });
  Object.keys(grupos).forEach(grupo => {
    container.innerHTML += `<div class="group-header"><span>${obterIcone(grupo)}</span> ${grupo}</div>`;
    grupos[grupo].forEach(ex => {
      const salvo = salvos.find(s => s.id === ex.id);
      const isChecked = salvo ? "checked" : "";
      const valDesc = salvo && salvo.descanso ? salvo.descanso : "Descanso";
      const valMet = salvo && salvo.metodo ? salvo.metodo : "Normal";
      const valSer = salvo && salvo.series ? salvo.series : "";
      container.innerHTML += `<div class="admin-exercise-row"><div class="admin-row-left"><input type="checkbox" id="chk_${ex.id}" value="${ex.id}" ${isChecked}><label for="chk_${ex.id}" style="color:white; font-size:0.9rem; cursor:pointer;">${ex.nome}</label></div><div class="admin-row-options"><select id="desc_${ex.id}" class="admin-input-mini w-time"><option value="Descanso" disabled ${valDesc==="Descanso"?"selected":""}>⏱️</option><option value="30s" ${valDesc==="30s"?"selected":""}>30s</option><option value="45s" ${valDesc==="45s"?"selected":""}>45s</option><option value="1min" ${valDesc==="1min"?"selected":""}>1m</option><option value="1:30" ${valDesc==="1:30"?"selected":""}>1:30</option><option value="2min" ${valDesc==="2min"?"selected":""}>2m</option></select><select id="met_${ex.id}" class="admin-input-mini w-method"><option value="Normal" ${valMet==="Normal"?"selected":""}>Normal</option><option value="Falha" ${valMet==="Falha"?"selected":""}>Falha</option><option value="Drop" ${valMet==="Drop"?"selected":""}>Drop</option><option value="Bi-set" ${valMet==="Bi-set"?"selected":""}>Bi-set</option></select><input type="text" id="ser_${ex.id}" class="admin-input-mini w-text" placeholder="3x12" value="${valSer}"></div></div>`;
    });
  });
}
function salvarTreinoPersonal() {
  const checks = document.querySelectorAll('#listaSelecao input:checked'); const novos = [];
  checks.forEach(c => {
    const id = parseInt(c.value); const original = todosExercicios.find(e => e.id === id);
    novos.push({ ...original, descanso: document.getElementById(`desc_${id}`).value, metodo: document.getElementById(`met_${id}`).value, series: document.getElementById(`ser_${id}`).value || "3x12" });
  });
  const idx = listaDeAlunos.findIndex(a => a.telefone === alunoEmEdicaoId);
  listaDeAlunos[idx].treinos[moduloEmEdicao].exercicios = novos;
  salvarNaColecao("alunos", listaDeAlunos[idx].telefone, listaDeAlunos[idx]);
  alert("Salvo!");
}

/* ================= APP DO ALUNO (COM LÓGICA DE AVISO ON/OFF) ================= */
function abrirAppAluno() {
    const nome = usuarioLogado.nome.split(' ')[0];
    document.querySelector('.header-student h1').innerHTML = `Olá, <span style="color:#10b981">${nome}</span>`;
    
    // MURAL INTELIGENTE: Verifica se o Professor ATIVOU (avisoAtivo)
    const academiaDoAluno = listaDeAcademias.find(gym => gym.id === usuarioLogado.academiaId);
    const boxAviso = document.getElementById('boxAvisoAluno');
    
    // SÓ MOSTRA SE 'avisoAtivo' FOR VERDADEIRO
    if(academiaDoAluno && academiaDoAluno.avisoAtivo === true && academiaDoAluno.aviso) {
        boxAviso.classList.remove('hidden');
        document.getElementById('textoAvisoAlunoDisplay').innerText = academiaDoAluno.aviso;
    } else {
        // SE ESTIVER DESATIVADO (OU SEM TEXTO), ESCONDE
        boxAviso.classList.add('hidden');
    }

    // FOGO (Streak)
    atualizarDisplayFogo();

    renderizarCardsTreino(); atualizarDisplayVencimentoPerfil();
    document.getElementById('nomePerfil').innerText = usuarioLogado.nome;
    document.getElementById('academiaAlunoBadge').innerText = usuarioLogado.academiaNome || "Academia";
    document.getElementById('telPerfil').innerText = usuarioLogado.telefone;
    if(usuarioLogado.spotifyUrl) document.getElementById('spotifyLinkInput').value = usuarioLogado.spotifyUrl;
    mostrarTela('treinos'); document.getElementById('mainNav').style.display = 'flex';
}
function renderizarCardsTreino() {
    const grid = document.getElementById('containerTreinosAluno'); grid.innerHTML = "";
    MODULOS_DISPONIVEIS.forEach(letra => {
        const t = usuarioLogado.treinos[letra]; const qtd = t ? t.exercicios.length : 0;
        let cor = (letra==='B'||letra==='E') ? "blue" : (letra==='C')?"purple":"";
        if(qtd > 0) grid.innerHTML += `<div class="treino-card" onclick="abrirTreino('${letra}')"><div class="icon-box ${cor}">${letra}</div><div class="info"><h3>Treino ${letra}</h3><p>${qtd} exercícios</p></div><span class="material-icons-round">chevron_right</span></div>`;
    });
}
function abrirTreino(mod) {
    moduloTreinoAtual = mod; const lista = usuarioLogado.treinos[mod].exercicios;
    mostrarTela('detalheTreino'); document.getElementById('tituloTreino').innerText = `Treino ${mod}`;
    const container = document.getElementById('listaExercicios'); container.innerHTML = "";
    lista.forEach(ex => {
        if(!usuarioLogado.registros) usuarioLogado.registros = {};
        const pesoSalvo = usuarioLogado.registros[`${mod}_${ex.id}_peso`] || "";
        let textoUltimaCarga = "";
        if(usuarioLogado.historicoCargas && usuarioLogado.historicoCargas[ex.id]) {
            const hist = usuarioLogado.historicoCargas[ex.id];
            if(hist.length > 0) { const ult = hist[hist.length-1].carga; textoUltimaCarga = `<span style="font-size:0.7rem; color:#10b981; margin-left:5px; font-weight:normal;">(Últ: ${ult}kg)</span>`; }
        }
        let numSeries = parseInt(ex.series); if(isNaN(numSeries)) numSeries = 3;
        let bolinhas = '<div class="sets-container">';
        for(let i=1; i<=numSeries; i++) {
            const feito = usuarioLogado.registros[`${mod}_${ex.id}_set_${i}`] ? "done" : "";
            bolinhas += `<div class="set-circle ${feito}" onclick="toggleSet('${ex.id}', ${i}, '${ex.descanso}', this)">${i}</div>`;
        }
        bolinhas += '</div>';
        container.innerHTML += `<div class="exercise-item"><div class="exercise-header"><span class="exercise-name">${ex.nome}</span><button class="btn-video-mini" onclick="abrirVideo('${ex.nome}')"><span class="material-icons-round" style="font-size:14px">play_arrow</span> Vídeo</button></div><div class="exercise-badges"><span class="badge-info badge-series">${ex.series||'3x12'}</span><span class="badge-info badge-rest">⏰ ${ex.descanso||'1min'}</span><span class="badge-info badge-method">${ex.metodo||'Normal'}</span></div><div class="exercise-controls"><div class="input-carga-wrapper"><span class="label">Carga ${textoUltimaCarga}</span><input type="tel" class="input-carga" placeholder="0" value="${pesoSalvo}" onblur="salvarPeso('${ex.id}', this.value)"></div>${bolinhas}</div></div>`;
    });
    atualizarBarraProgresso();
}
function toggleSet(exId, idx, descanso, el) {
    if(navigator.vibrate) navigator.vibrate(30);
    el.classList.toggle('done');
    const status = el.classList.contains('done');
    usuarioLogado.registros[`${moduloTreinoAtual}_${exId}_set_${idx}`] = status;
    salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado);
    if(status) iniciarTimer(descanso || '1min');
    
    // VERIFICA SE O TREINO ACABOU PARA SALVAR O FOGO
    if(atualizarBarraProgresso() === 100) registrarDiaDeFogo();
}

// LÓGICA DO FOGO (STREAK)
function registrarDiaDeFogo() {
    const h = new Date().toLocaleDateString('pt-BR');
    if(!usuarioLogado.historicoFogo) usuarioLogado.historicoFogo=[];
    if(!usuarioLogado.historicoFogo.includes(h)) {
        usuarioLogado.historicoFogo.push(h);
        salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado);
        if(navigator.vibrate) navigator.vibrate([100,50,100,50,200]); 
        alert("TREINO 100% CONCLUÍDO! 🔥");
        atualizarDisplayFogo();
    }
}
function atualizarDisplayFogo() { document.getElementById('streakCount').innerText = usuarioLogado.historicoFogo ? usuarioLogado.historicoFogo.length : 0; }

function salvarPeso(exId, val) {
    if(!val) return;
    if(!usuarioLogado.registros) usuarioLogado.registros = {};
    usuarioLogado.registros[`${moduloTreinoAtual}_${exId}_peso`] = val;
    if(!usuarioLogado.historicoCargas) usuarioLogado.historicoCargas={};
    if(!usuarioLogado.historicoCargas[exId]) usuarioLogado.historicoCargas[exId]=[];
    const hoje = new Date().toLocaleDateString('pt-BR').slice(0,5);
    const hist = usuarioLogado.historicoCargas[exId];
    const registroHoje = hist.find(x => x.data === hoje);
    if(registroHoje) registroHoje.carga = parseFloat(val); 
    else hist.push({data:hoje, carga:parseFloat(val)});
    salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado);
}

function atualizarBarraProgresso() {
    const t = document.querySelectorAll('.set-circle').length; if(t===0) return 0;
    const c = document.querySelectorAll('.set-circle.done').length;
    const p = Math.round((c/t)*100);
    document.getElementById('barraProgresso').style.width = `${p}%`;
    document.getElementById('progressoPorcentagem').innerText = `${p}%`;
    return p;
}

/* ================= ESTATÍSTICAS E GRÁFICOS (COMPLETOS) ================= */
function carregarEstatisticas() {
    // 1. Gráfico de Composição (Peso/Gordura)
    const ctx = document.getElementById('graficoComposicaoCanvas');
    if(ctx && usuarioLogado.historicoAvaliacoes) {
        let labels=[], dPeso=[], dGordura=[];
        usuarioLogado.historicoAvaliacoes.forEach(x => { labels.push(x.data.slice(0,5)); dPeso.push(x.peso); dGordura.push(x.gordura); });
        if(dPeso.length>0) { document.getElementById('statPesoAtual').innerText = dPeso[dPeso.length-1] + ' kg'; document.getElementById('statGorduraAtual').innerText = dGordura[dGordura.length-1] + '%'; }
        if(chartComposicao) chartComposicao.destroy();
        chartComposicao = new Chart(ctx, {
            type: 'line', data: { labels, datasets: [ { label: 'Peso (kg)', data: dPeso, borderColor: '#f8fafc', tension:0.4, yAxisID: 'y' }, { label: '% Gordura', data: dGordura, borderColor: '#eab308', borderDash:[5,5], tension:0.4, yAxisID: 'y1' } ] },
            options: { responsive:true, maintainAspectRatio:false, scales:{ x:{display:false}, y:{type:'linear', display:true, position:'left'}, y1:{type:'linear', display:true, position:'right', grid:{drawOnChartArea:false}} } }
        });
    }

    // 2. Gráfico de Frequência (Dias da Semana)
    let hist = usuarioLogado.historicoFogo || [];
    const container = document.getElementById('graficoSemanal');
    container.innerHTML = "";
    const hoje = new Date();
    const dom = new Date(hoje); dom.setDate(hoje.getDate() - hoje.getDay());
    const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    for(let i=0; i<7; i++) {
        const d = new Date(dom); d.setDate(dom.getDate()+i);
        const str = d.toLocaleDateString('pt-BR');
        const active = hist.includes(str) ? 'active' : '';
        const h = active ? '100%' : '10%';
        container.innerHTML += `<div class="chart-bar-wrapper"><div class="chart-bar ${active}" style="height:${h}"></div><span class="week-day">${dias[i]}</span></div>`;
    }

    // 3. Preencher Select de Força
    povoarSelectExercicios();
}

function povoarSelectExercicios() {
    const sel = document.getElementById('selectExercicioGrafico'); if(!sel) return;
    let ids = Object.keys(usuarioLogado.historicoCargas || {});
    sel.innerHTML = "";
    if(ids.length===0) { sel.innerHTML="<option>Sem dados</option>"; return; }
    ids.forEach(id => { const nome = todosExercicios.find(e=>e.id==id)?.nome || "Ex "+id; sel.innerHTML+=`<option value="${id}">${nome}</option>`; });
    atualizarGraficoCarga();
}

function atualizarGraficoCarga() {
    const id = document.getElementById('selectExercicioGrafico').value; if(!id || !usuarioLogado.historicoCargas) return;
    const hist = usuarioLogado.historicoCargas[id] || [];
    const labels = hist.map(x=>x.data); const dados = hist.map(x=>x.carga);
    if(dados.length>0) { document.getElementById('recordeDisplay').innerText = Math.max(...dados)+"kg"; }
    const ctx = document.getElementById('graficoCargaCanvas');
    if(chartCarga) chartCarga.destroy();
    chartCarga = new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: 'Carga', data: dados, borderColor: '#3b82f6', tension:0.3, fill:true, backgroundColor:'rgba(59,130,246,0.1)' }] }, options: { responsive:true, maintainAspectRatio:false, scales:{x:{display:false}} } });
}

/* ================= EXTRAS ================= */
function iniciarTimer(tempoStr) {
    let segs = 60; const t = tempoStr.toLowerCase();
    if(t.includes('min')) segs = parseInt(t) * 60; else if(t.includes('s')) segs = parseInt(t);
    const overlay = document.getElementById('timerOverlay'); const disp = document.getElementById('timerDisplay');
    overlay.classList.remove('hidden'); if(timerInterval) clearInterval(timerInterval);
    let restante = segs;
    const tick = () => {
        const m = Math.floor(restante/60).toString().padStart(2,'0'); const s = (restante%60).toString().padStart(2,'0'); disp.innerText = `${m}:${s}`;
        if(restante <= 0) { clearInterval(timerInterval); if(navigator.vibrate) navigator.vibrate([800,400,800,400,800]); fecharTimer(); }
        restante--;
    };
    tick(); timerInterval = setInterval(tick, 1000);
}
function fecharTimer() { document.getElementById('timerOverlay').classList.add('hidden'); if(timerInterval) clearInterval(timerInterval); }
function adicionarTempo(s) { fecharTimer(); setTimeout(() => iniciarTimer('15s'), 100); }
function renderizarCardio() {
    const l = todosExercicios.filter(e => e.grupo === 'Cardio');
    const c = document.getElementById('listaCardioContainer'); c.innerHTML = "";
    l.forEach(x => { c.innerHTML += `<div class="treino-card" onclick="alert('Use o cronômetro acima!')" style="padding:15px"><div class="icon-box blue"><span class="material-icons-round">directions_run</span></div><div class="info"><h3>${x.nome}</h3></div></div>`; });
}
function toggleCardioTimer() {
    const btn = document.getElementById('btnCardioAction'); const disp = document.getElementById('cardioTimerDisplay');
    if(!cardioRunning) {
        cardioRunning = true; btn.innerText = "PAUSAR"; btn.style.background = "#eab308";
        cardioInterval = setInterval(() => { cardioSeconds++; const m = Math.floor(cardioSeconds/60).toString().padStart(2,'0'); const s = (cardioSeconds%60).toString().padStart(2,'0'); disp.innerText = `${m}:${s}`; }, 1000);
    } else { cardioRunning = false; clearInterval(cardioInterval); btn.innerText = "RETOMAR"; btn.style.background = "#10b981"; }
}
function resetCardioTimer() { cardioRunning = false; clearInterval(cardioInterval); cardioSeconds=0; document.getElementById('cardioTimerDisplay').innerText="00:00"; document.getElementById('btnCardioAction').innerText="INICIAR"; }
function abrirSpotify() { if(usuarioLogado && usuarioLogado.spotifyUrl) document.getElementById('spotifyIframe').src = usuarioLogado.spotifyUrl; document.getElementById('spotifyModal').classList.add('active'); }
function fecharSpotify() { document.getElementById('spotifyModal').classList.remove('active'); }
function carregarPlaylistUsuario() {
    const val = document.getElementById('inputPlaylistUrl').value.trim(); if(!val) return alert("Cole o link!");
    let link = val; if(val.includes("open.spotify.com") && !val.includes("/embed/")) { const p = val.split('.com/'); if(p[1]) link = `https://open.spotify.com/embed/$${p[1].split('?')[0]}?utm_source=generator&theme=0`; }
    document.getElementById('spotifyIframe').src = link; if(usuarioLogado) { usuarioLogado.spotifyUrl = link; salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado); } alert("Salvo!");
}
function mostrarTela(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active');
    const nav = document.getElementById('mainNav');
    if(['login','dashMaster','dashProfessor','painelPersonal'].includes(id)) nav.style.display = 'none';
    else if(usuarioLogado && usuarioLogado.tipo === 'aluno') nav.style.display = 'flex';
    if(id==='estatisticas') carregarEstatisticas(); if(id==='cardio') renderizarCardio();
}
function toggleFormulario() { document.getElementById('formCadastroAluno').classList.toggle('hidden'); }
function filtrarAlunos() { renderizarListaAlunosAdmin(document.getElementById('inputBusca').value); }
function obterIcone(g){const m={'Perna':'🦵','Peito':'🏋️','Costas':'🦍','Ombro':'🥥','Bíceps':'💪','Tríceps':'💪','Abs':'🔥','Cardio':'🏃'};return m[g]||'📋';}
function abrirVideo(t) { document.getElementById('videoModal').classList.add('active'); document.getElementById('videoTitulo').innerText=t; }
function fecharVideo() { document.getElementById('videoModal').classList.remove('active'); }
function atualizarDisplayVencimentoPerfil() {
    const el = document.getElementById('vencimentoPerfil'); const st = document.getElementById('statusPagamento');
    if(!usuarioLogado.vencimento) { el.innerText="--/--"; st.innerText="N/A"; return; }
    const p = usuarioLogado.vencimento.split('-'); el.innerText = `${p[2]}/${p[1]}/${p[0]}`;
}
function salvarLinkSpotify(val) { if(usuarioLogado && val) { usuarioLogado.spotifyUrl = val; salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado); } }
function salvarPesoCorporal(v) { if(!v) return; if(!usuarioLogado.pesoInicial) { usuarioLogado.pesoInicial=v; document.getElementById('pesoInicialInput').value=v; } usuarioLogado.pesoAtual = v; salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado); carregarEstatisticas(); }

window.autenticar = autenticar; window.loginMaster = loginMaster; window.criarAcademia = criarAcademia; window.toggleFormulario = toggleFormulario; window.cadastrarAluno = cadastrarAluno; window.abrirEditorTreino = abrirEditorTreino; window.salvarTreinoPersonal = salvarTreinoPersonal; window.trocarModuloEdicao = trocarModuloEdicao; window.abrirTreino = abrirTreino; window.toggleSet = toggleSet; window.salvarPeso = salvarPeso; window.voltarTreinos = () => mostrarTela('treinos'); window.abrirVideo = abrirVideo; window.fecharVideo = fecharVideo; window.filtrarAlunos = filtrarAlunos; window.mostrarTela = mostrarTela; window.logout = logout; window.adicionarTempo=adicionarTempo; window.fecharTimer=fecharTimer; window.toggleCardioTimer=toggleCardioTimer; window.resetCardioTimer=resetCardioTimer; window.abrirSpotify=abrirSpotify; window.fecharSpotify=fecharSpotify; window.carregarPlaylistUsuario=carregarPlaylistUsuario; window.salvarLinkSpotify=salvarLinkSpotify; window.salvarPesoCorporal=salvarPesoCorporal; window.salvarAvisoAcademia=salvarAvisoAcademia; window.abrirModalAvaliacao=abrirModalAvaliacao; window.fecharModalAvaliacao=fecharModalAvaliacao; window.salvarAvaliacaoFisica=salvarAvaliacaoFisica; window.atualizarGraficoCarga=atualizarGraficoCarga;
