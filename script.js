/* ================= BANCO DE DADOS COMPLETO ================= */
const todosExercicios = [
  // PERNA (Quadríceps/Posterior/Glúteo)
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
  { id: 25, nome: "Crucifixo Máquina (Peck Deck)", grupo: "Peito" },
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
  { id: 44, nome: "Remada Curvada (Barra)", grupo: "Costas" },
  { id: 45, nome: "Remada Cavalinho", grupo: "Costas" },
  { id: 46, nome: "Remada Unilateral (Serrote)", grupo: "Costas" },
  { id: 47, nome: "Pulldown (Polia)", grupo: "Costas" },
  { id: 48, nome: "Barra Fixa", grupo: "Costas" },
  { id: 49, nome: "Voador Inverso", grupo: "Costas" },
  { id: 50, nome: "Lombar Máquina", grupo: "Costas" },

  // OMBRO
  { id: 60, nome: "Desenvolvimento Halter", grupo: "Ombro" },
  { id: 61, nome: "Desenvolvimento Máquina", grupo: "Ombro" },
  { id: 62, nome: "Desenvolvimento Barra", grupo: "Ombro" },
  { id: 63, nome: "Elevação Lateral (Halter)", grupo: "Ombro" },
  { id: 64, nome: "Elevação Lateral (Polia)", grupo: "Ombro" },
  { id: 65, nome: "Elevação Frontal", grupo: "Ombro" },
  { id: 66, nome: "Remada Alta", grupo: "Ombro" },
  { id: 67, nome: "Encolhimento (Trapézio)", grupo: "Ombro" },

  // BÍCEPS
  { id: 70, nome: "Rosca Direta (Barra)", grupo: "Bíceps" },
  { id: 71, nome: "Rosca Direta (Polia)", grupo: "Bíceps" },
  { id: 72, nome: "Rosca Alternada", grupo: "Bíceps" },
  { id: 73, nome: "Rosca Martelo", grupo: "Bíceps" },
  { id: 74, nome: "Rosca Scott (Máquina)", grupo: "Bíceps" },
  { id: 75, nome: "Rosca Concentrada", grupo: "Bíceps" },
  { id: 76, nome: "Rosca 21", grupo: "Bíceps" },

  // TRÍCEPS
  { id: 80, nome: "Tríceps Polia (Barra)", grupo: "Tríceps" },
  { id: 81, nome: "Tríceps Corda", grupo: "Tríceps" },
  { id: 82, nome: "Tríceps Testa", grupo: "Tríceps" },
  { id: 83, nome: "Tríceps Francês", grupo: "Tríceps" },
  { id: 84, nome: "Tríceps Banco", grupo: "Tríceps" },
  { id: 85, nome: "Tríceps Coice", grupo: "Tríceps" },

  // ABDÔMEN & CARDIO
  { id: 90, nome: "Abdominal Supra", grupo: "Abs" },
  { id: 91, nome: "Abdominal Infra", grupo: "Abs" },
  { id: 92, nome: "Prancha Isométrica", grupo: "Abs" },
  { id: 93, nome: "Abdominal Máquina", grupo: "Abs" },
  { id: 94, nome: "Esteira", grupo: "Cardio" },
  { id: 95, nome: "Bicicleta Ergométrica", grupo: "Cardio" },
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

/* ================= INICIALIZAÇÃO ================= */
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

/* ================= SESSÃO & AUTH ================= */
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
    } else alert("Não encontrado.");
  }
}
function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.reload();
}

/* ================= PAINEL PROFESSOR ================= */
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

// === RENDERIZAÇÃO INTELIGENTE COM DESCANSO E MÉTODO ===
function renderizarCheckboxesExercicios() {
  const container = document.getElementById('listaSelecao');
  container.innerHTML = "";
  const aluno = listaDeAlunos.find(a => a.telefone === alunoEmEdicaoId);
  if (!aluno) return;

  // Lista atual de exercícios salvos neste módulo (agora são objetos completos, não só IDs)
  // Ex: [{id: 101, descanso: '60s', metodo: 'Falha'}, ...]
  const exerciciosSalvos = aluno.treinos[moduloEmEdicao].exercicios || [];
  
  // Agrupa por categoria
  const grupos = {};
  todosExercicios.forEach(ex => {
    if (!grupos[ex.grupo]) grupos[ex.grupo] = [];
    grupos[ex.grupo].push(ex);
  });

  Object.keys(grupos).forEach(grupo => {
    // Cabeçalho
    container.innerHTML += `<div class="group-header"><span>${obterIcone(grupo)}</span> ${grupo}</div>`;
    
    // Exercícios
    grupos[grupo].forEach(ex => {
      // Verifica se o aluno já tem esse exercicio salvo para preencher os campos
      const salvo = exerciciosSalvos.find(s => s.id === ex.id);
      const isChecked = salvo ? "checked" : "";
      const valDescanso = salvo && salvo.descanso ? salvo.descanso : "Descanso"; // Default
      const valMetodo = salvo && salvo.metodo ? salvo.metodo : "Normal"; // Default

      container.innerHTML += `
        <div class="admin-exercise-row">
          <div class="admin-row-top">
            <input type="checkbox" id="check_${ex.id}" value="${ex.id}" ${isChecked} style="transform: scale(1.3);">
            <strong style="color:white; font-size: 0.95rem;">${ex.nome}</strong>
          </div>
          <div class="admin-row-options">
            <select id="descanso_${ex.id}" class="admin-select">
              <option value="Descanso" disabled ${valDescanso === "Descanso" ? "selected" : ""}>Tempo</option>
              <option value="30s" ${valDescanso === "30s" ? "selected" : ""}>30 seg</option>
              <option value="45s" ${valDescanso === "45s" ? "selected" : ""}>45 seg</option>
              <option value="1m" ${valDescanso === "1m" ? "selected" : ""}>1 min</option>
              <option value="1m30s" ${valDescanso === "1m30s" ? "selected" : ""}>1:30 min</option>
              <option value="2m" ${valDescanso === "2m" ? "selected" : ""}>2 min</option>
            </select>

            <select id="metodo_${ex.id}" class="admin-select">
              <option value="Normal" ${valMetodo === "Normal" ? "selected" : ""}>Normal (3x12)</option>
              <option value="Falha" ${valMetodo === "Falha" ? "selected" : ""}>Até a Falha</option>
              <option value="Drop-set" ${valMetodo === "Drop-set" ? "selected" : ""}>Drop-set</option>
              <option value="Bi-set" ${valMetodo === "Bi-set" ? "selected" : ""}>Bi-set</option>
              <option value="FST-7" ${valMetodo === "FST-7" ? "selected" : ""}>FST-7</option>
              <option value="Aquecimento" ${valMetodo === "Aquecimento" ? "selected" : ""}>Aquecimento</option>
            </select>
          </div>
        </div>
      `;
    });
  });
}

function salvarTreinoPersonal() {
  // Pega todos os checkboxes marcados
  const marcados = document.querySelectorAll('#listaSelecao input[type="checkbox"]:checked');
  const listaFinal = [];

  marcados.forEach(checkbox => {
    const id = parseInt(checkbox.value);
    const exBase = todosExercicios.find(e => e.id === id);
    
    // PEGA OS VALORES DOS SELECTS (Descanso e Método)
    const descansoEscolhido = document.getElementById(`descanso_${id}`).value;
    const metodoEscolhido = document.getElementById(`metodo_${id}`).value;

    // Salva o objeto completo
    listaFinal.push({
      ...exBase,
      descanso: descansoEscolhido !== "Descanso" ? descansoEscolhido : "1m",
      metodo: metodoEscolhido
    });
  });

  const idx = listaDeAlunos.findIndex(a => a.telefone === alunoEmEdicaoId);
  listaDeAlunos[idx].treinos[moduloEmEdicao].exercicios = listaFinal;
  
  salvarNaNuvem(listaDeAlunos[idx]);
  alert("Treino salvo com sucesso! 💾");
}

/* ================= ÁREA DO ALUNO ================= */
function carregarInterfaceAluno() { /* Igual anterior */ mostrarTela('treinos'); renderizarCardsTreinoAluno(); atualizarDisplayFogo(); atualizarDisplayVencimentoPerfil(); }

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
    
    // Exibe badges se tiver informação extra
    const badgeDescanso = ex.descanso ? `<span class="badge-info badge-rest">⏰ ${ex.descanso}</span>` : "";
    const classeFalha = ex.metodo === "Falha" ? "falha" : "";
    const badgeMetodo = ex.metodo && ex.metodo !== "Normal" ? `<span class="badge-info badge-method ${classeFalha}">${ex.metodo}</span>` : "";

    container.innerHTML += `
      <div class="exercise-item">
        <div class="exercise-header">
            <span class="exercise-name">${ex.nome}</span>
            <div class="exercise-badges">
                ${badgeDescanso}
                ${badgeMetodo}
            </div>
        </div>
        
        <div class="exercise-controls">
          <div class="input-carga-wrapper">
             <div class="weight-history"><span class="label">Carga</span></div>
             <input type="tel" class="input-carga" placeholder="kg" value="${pesoSalvo}" onblur="salvarPeso('${ex.id}', this.value)">
          </div>
          <label class="check-wrapper">
            <input type="checkbox" onchange="toggleExercicio('${ex.id}', this.checked)" ${alunoLogado.registros[`${modulo}_${ex.id}_check`]?"checked":""}>
          </label>
        </div>
      </div>
    `;
  });
  atualizarBarraProgresso();
}

// ... Restante das funções de peso, gráfico e cadastro mantidas iguais ...
// (Para economizar espaço, as funções abaixo são idênticas ao script anterior)
function obterIcone(g){const m={'Perna':'🦵','Peito':'🏋️','Costas':'🦍','Ombro':'🥥','Bíceps':'💪','Tríceps':'💪','Abs':'🔥','Cardio':'🏃'};return m[g]||'📋';}
function toggleFormulario(){document.getElementById('formCadastroAluno').classList.toggle('hidden');}
async function cadastrarAluno(){/* ...mesmo código... */ const n=document.getElementById('novoNome').value; const t=document.getElementById('novoTel').value; const d=document.getElementById('novoVencimento').value; if(!n||!t)return alert('Erro'); const novo={nome:n,telefone:t,vencimento:d,treinos:{A:{exercicios:[]},B:{exercicios:[]},C:{exercicios:[]},D:{exercicios:[]},E:{exercicios:[]}}}; listaDeAlunos.push(novo); await salvarNaNuvem(novo); renderizarListaAlunosAdmin(); toggleFormulario();}
async function salvarPeso(exId,v){/* ...mesmo código... */ if(!alunoLogado.registros)alunoLogado.registros={}; alunoLogado.registros[`${moduloTreinoAtual}_${exId}_peso`]=v; if(!alunoLogado.historicoCargas)alunoLogado.historicoCargas={}; if(!alunoLogado.historicoCargas[exId])alunoLogado.historicoCargas[exId]=[]; const h=new Date().toLocaleDateString('pt-BR').slice(0,5); const hist=alunoLogado.historicoCargas[exId]; const ent=hist.find(x=>x.data===h); if(ent)ent.carga=parseFloat(v); else hist.push({data:h,carga:parseFloat(v)}); salvarNaNuvem(alunoLogado);}
function toggleExercicio(exId,c){if(navigator.vibrate)navigator.vibrate(40); if(!alunoLogado.registros)alunoLogado.registros={}; alunoLogado.registros[`${moduloTreinoAtual}_${exId}_check`]=c; salvarNaNuvem(alunoLogado); if(atualizarBarraProgresso()===100)registrarDiaDeFogo();}
function atualizarBarraProgresso(){const t=document.querySelectorAll('#listaExercicios input[type="checkbox"]').length; if(t===0)return 0; const c=document.querySelectorAll('#listaExercicios input[type="checkbox"]:checked').length; const p=Math.round((c/t)*100); document.getElementById('barraProgresso').style.width=`${p}%`; document.getElementById('progressoPorcentagem').innerText=`${p}%`; return p;}
function registrarDiaDeFogo(){const h=new Date().toLocaleDateString('pt-BR'); if(!alunoLogado.historicoFogo)alunoLogado.historicoFogo=[]; if(!alunoLogado.historicoFogo.includes(h)){alunoLogado.historicoFogo.push(h); salvarNaNuvem(alunoLogado); alert("Parabéns! 🔥"); atualizarDisplayFogo();}}
function atualizarDisplayFogo(){document.getElementById('streakCount').innerText=alunoLogado.historicoFogo?alunoLogado.historicoFogo.length:0;}
function mostrarTela(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); const nav=document.getElementById('mainNav'); if(id.includes('dash')||id==='login')nav.style.display='none'; else if(alunoLogado)nav.style.display='flex';}
function salvarPesoCorporal(v){if(v){alunoLogado.pesoAtual=v; salvarNaNuvem(alunoLogado);}}
function atualizarDisplayVencimentoPerfil(){/* ... */ const el=document.getElementById('vencimentoPerfil'); if(alunoLogado.vencimento){const p=alunoLogado.vencimento.split('-'); el.innerText=`${p[2]}/${p[1]}/${p[0]}`;}}
function carregarEstatisticas(){/* ...Chama gráficos... */}
