/* ================= BANCO DE DADOS DE EXERCÍCIOS ================= */
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

/* ================= DICAS DE NUTRIÇÃO (PREMIUM) ================= */
const dicasNutri = [
    { 
        tag: "Café da Manhã", 
        titulo: "Ovos Mexidos Cremosos", 
        desc: "Uma combinação clássica e poderosa. Prepare 3 ovos inteiros mexidos em fogo baixo para garantir cremosidade (adicione uma colher de requeijão light se quiser). Acompanhe com 1 fatia de pão integral tostado e uma porção de mamão papaia.", 
        beneficio: "Começar o dia com proteína de alto valor biológico controla a fome e evita picos de insulina. O mamão auxilia na digestão para você treinar leve.", 
        img: "https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&w=800&q=80",
        cal: "320", prot: "22g", gord: "15g"
    },
    { 
        tag: "Almoço", 
        titulo: "Frango Grelhado & Batata Doce", 
        desc: "O combustível do atleta. 150g de peito de frango grelhado com limão e ervas finas + 100g de batata doce assada (ou purê rústico). Adicione brócolis no vapor à vontade para dar volume ao prato.", 
        beneficio: "Carboidrato de baixo índice glicêmico (energia constante) combinado com proteína magra para recuperação muscular imediata.", 
        img: "https://images.unsplash.com/photo-1588710929943-5290f9cb79b6?auto=format&fit=crop&w=800&q=80",
        cal: "410", prot: "35g", gord: "5g"
    },
    { 
        tag: "Pré-Treino", 
        titulo: "Banana com Aveia e Mel", 
        desc: "Simples, barato e eficiente. Amasse 1 banana prata média, misture com 2 colheres de aveia em flocos finos e finalize com um fio de mel. Consumir cerca de 40 a 60 minutos antes do treino.", 
        beneficio: "Fornece glicogênio muscular rápido para você ter força máxima e não sentir fadiga no meio da série.", 
        img: "https://images.unsplash.com/photo-1585655433290-7957386c99c9?auto=format&fit=crop&w=800&q=80",
        cal: "250", prot: "4g", gord: "2g"
    },
    { 
        tag: "Jantar Leve", 
        titulo: "Omelete de Forno Colorido", 
        desc: "Bata 2 ovos com espinafre picado, tomate cereja e cubos de queijo branco. Pode ser feito na frigideira antiaderente ou na Airfryer por 10 minutos. Tempere com orégano.", 
        beneficio: "Refeição leve para não atrapalhar o sono (que é onde o músculo cresce), mas rica em nutrientes para a recuperação noturna.", 
        img: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
        cal: "280", prot: "18g", gord: "18g"
    },
    { 
        tag: "Lanche da Tarde", 
        titulo: "Bowl de Iogurte Proteico", 
        desc: "Misture 1 pote de iogurte natural desnatado com 1 scoop de Whey Protein (sabor de sua preferência). Adicione sementes de chia ou linhaça para dar crocância.", 
        beneficio: "Excelente estratégia para matar a vontade de comer doce à tarde, garantindo saciedade e batendo a meta de proteínas.", 
        img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
        cal: "210", prot: "28g", gord: "3g"
    },
    { 
        tag: "Almoço Low Carb", 
        titulo: "Patinho Moído com Abóbora", 
        desc: "150g de carne moída (patinho) bem refogada com cebola, alho e cheiro verde. Acompanha purê de abóbora cabotiá (sem leite, só amassada).", 
        beneficio: "Alto volume de comida com baixa caloria. Ideal para dias de descanso ou para quem está em fase de secar gordura.", 
        img: "https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?auto=format&fit=crop&w=800&q=80",
        cal: "350", prot: "32g", gord: "12g"
    },
    { 
        tag: "Pós-Treino", 
        titulo: "Shake Recuperador Rápido", 
        desc: "Bata no liquidificador: 1 dose de Whey Protein, 200ml de água de coco gelada e 1 maçã pequena com casca. Beba imediatamente após o treino.", 
        beneficio: "A água de coco repõe os eletrólitos perdidos no suor, enquanto o Whey e a maçã iniciam a reconstrução das fibras musculares.", 
        img: "https://images.unsplash.com/photo-1549488344-c70e3cb20448?auto=format&fit=crop&w=800&q=80",
        cal: "230", prot: "24g", gord: "1g"
    }
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
let cardioEquipamentoAtual = "";

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

async function deletarDocumento(colecao, id) {
    if (!window.db) return;
    if(confirm("Tem certeza que deseja EXCLUIR este registro? Essa ação não pode ser desfeita.")) {
        try { 
            await window.f_deleteDoc(window.f_doc(window.db, colecao, id));
            alert("Excluído com sucesso!");
            location.reload(); 
        } catch (e) { console.error(e); alert("Erro ao excluir."); }
    }
}

/* ================= LOGIN ================= */
function autenticar() {
  const login = document.getElementById('userEmail').value.trim();
  const pass = document.getElementById('userPass').value.trim();

  if (login === 'master' && pass === 'admin123') {
    usuarioLogado = { tipo: 'master', nome: 'Otavio Master' };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    abrirPainelMaster(); return;
  }
  const academia = listaDeAcademias.find(a => a.login === login && a.senha === pass);
  if (academia) {
    usuarioLogado = { tipo: 'academia', ...academia };
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    abrirPainelProfessor(); return;
  }
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
    listaDeAcademias.forEach(a => { 
        div.innerHTML += `
        <div class="student-card">
            <div class="student-info"><h3>${a.nome}</h3><p>Login: ${a.login}</p></div>
            <button class="btn-icon" style="background:#ef4444;" onclick="deletarDocumento('academias', '${a.id}')"><span class="material-icons-round">delete</span></button>
        </div>`; 
    });
}

/* ================= PAINEL PROFESSOR ================= */
function abrirPainelProfessor() { 
    mostrarTela('dashProfessor'); 
    document.getElementById('nomeAcademiaTitulo').innerText = usuarioLogado.nome; 
    
    if(usuarioLogado.aviso) document.getElementById('textoAvisoAcademia').value = usuarioLogado.aviso;
    else document.getElementById('textoAvisoAcademia').value = "";
    document.getElementById('chkAvisoAtivo').checked = (usuarioLogado.avisoAtivo === true);

    renderizarListaAlunosAdmin(); 
}

async function salvarAvisoAcademia() {
    const texto = document.getElementById('textoAvisoAcademia').value.trim();
    const ativo = document.getElementById('chkAvisoAtivo').checked;
    
    usuarioLogado.aviso = texto;
    usuarioLogado.avisoAtivo = ativo;
    
    await salvarNaColecao("academias", usuarioLogado.id, usuarioLogado);
    
    const idx = listaDeAcademias.findIndex(a => a.id === usuarioLogado.id);
    if(idx >= 0) { listaDeAcademias[idx].aviso = texto; listaDeAcademias[idx].avisoAtivo = ativo; }
    
    if(!ativo) alert("Aviso salvo (Oculto).");
    else alert("Aviso publicado!");
}

// HELPERS
function calcularDiasSemTreino(historicoFogo) {
    if (!historicoFogo || historicoFogo.length === 0) return 999; 
    const ultimo = historicoFogo[historicoFogo.length - 1]; 
    const partes = ultimo.split('/');
    const dataUltimo = new Date(partes[2], partes[1] - 1, partes[0]);
    const hoje = new Date();
    const diff = Math.floor((hoje - dataUltimo) / (1000 * 60 * 60 * 24));
    return diff;
}
function verificarStatusFinanceiro(vencimento) {
    if (!vencimento) return { status: "Indefinido", cor: "#94a3b8" };
    const hoje = new Date(); hoje.setHours(0,0,0,0);
    const partes = vencimento.split('-'); 
    const dataVenc = new Date(partes[0], partes[1]-1, partes[2]);
    const diffDias = Math.floor((hoje - dataVenc) / (1000 * 60 * 60 * 24));
    if (diffDias <= 0) return { status: "Em dia", cor: "#00E676" }; 
    if (diffDias <= 5) return { status: "Carência", cor: "#facc15" }; 
    return { status: "Vencido", cor: "#ef4444" }; 
}
function verificarVencimentoTreino(dataTroca) {
    if (!dataTroca) return 999;
    const partes = dataTroca.split('/');
    const dataUltimaTroca = new Date(partes[2], partes[1]-1, partes[0]);
    const hoje = new Date();
    return Math.floor((hoje - dataUltimaTroca) / (1000 * 60 * 60 * 24));
}

function renderizarListaAlunosAdmin() {
    const filtroTexto = document.getElementById('inputBusca').value.toLowerCase();
    const filtroTipo = document.getElementById('filtroAlunosSelect').value; 
    
    const container = document.getElementById('listaAlunosCoach'); container.innerHTML = "";
    const meusAlunos = listaDeAlunos.filter(aluno => aluno.academiaId === usuarioLogado.id);
    document.getElementById('totalAlunos').innerText = meusAlunos.length;

    const listaFiltrada = meusAlunos.filter(aluno => {
        if (!aluno.nome.toLowerCase().includes(filtroTexto) && !aluno.telefone.includes(filtroTexto)) return false;

        const diasSemTreino = calcularDiasSemTreino(aluno.historicoFogo);
        const fin = verificarStatusFinanceiro(aluno.vencimento);
        const diasTreinoVelho = verificarVencimentoTreino(aluno.dataTrocaTreino);

        if (filtroTipo === 'ativos' && diasSemTreino > 7) return false;
        if (filtroTipo === 'ausentes' && diasSemTreino <= 7) return false;
        if (filtroTipo === 'vencidos' && fin.status !== "Vencido") return false;
        if (filtroTipo === 'treino_vencido' && diasTreinoVelho <= 90) return false;

        return true;
    });

    listaFiltrada.forEach(aluno => {
        const dias = calcularDiasSemTreino(aluno.historicoFogo);
        const textoTreino = dias === 999 ? "Nunca" : (dias === 0 ? "Hoje" : `${dias}d atrás`);
        const fin = verificarStatusFinanceiro(aluno.vencimento);
        const diasTroca = verificarVencimentoTreino(aluno.dataTrocaTreino);
        let badgeTreino = diasTroca > 90 ? `<span style="font-size:0.6rem; background:#f97316; color:white; padding:2px 6px; border-radius:4px;">🔄 Trocar</span>` : "";

        container.innerHTML += `
        <div class="student-card">
            <div class="student-info">
                <h3>${aluno.nome} 
                    <span style="font-size:0.6rem; background:${fin.cor}; color:black; padding:2px 6px; border-radius:4px;">${fin.status}</span>
                    ${badgeTreino}
                </h3>
                <p style="font-size:0.8rem; color:#94a3b8;">${aluno.telefone} • Treino: ${textoTreino}</p>
            </div>
            <div class="student-actions">
                <button class="btn-icon" style="background:#334155;" onclick="imprimirTreino('${aluno.telefone}')" title="PDF"><span class="material-icons-round" style="color:white">print</span></button>
                <button class="btn-icon" style="background:#334155;" onclick="abrirModalAvaliacao('${aluno.telefone}')" title="Medidas"><span class="material-icons-round" style="color:#eab308">straighten</span></button>
                <button class="btn-icon btn-edit" onclick="abrirEditorTreino('${aluno.telefone}')"><span class="material-icons-round">edit_note</span></button>
                <button class="btn-icon" style="background:#ef4444;" onclick="deletarDocumento('alunos', '${aluno.telefone}')"><span class="material-icons-round">delete</span></button>
            </div>
        </div>`;
    });
}

function imprimirTreino(tel) {
    const aluno = listaDeAlunos.find(a => a.telefone === tel);
    if(!aluno) return;
    let html = `<html><head><title>${aluno.nome}</title><style>body{font-family:sans-serif;padding:20px}h1,h2{border-bottom:2px solid #000}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:8px}</style></head><body><h1>${aluno.nome}</h1><p>Academia: ${aluno.academiaNome}</p>`;
    MODULOS_DISPONIVEIS.forEach(mod => {
        const t = aluno.treinos[mod];
        if(t && t.exercicios.length > 0) {
            html += `<h2>Treino ${mod}</h2><table><thead><tr><th>Exercício</th><th>Séries</th><th>Descanso</th></tr></thead><tbody>`;
            t.exercicios.forEach(ex => { html += `<tr><td>${ex.nome}</td><td>${ex.series}</td><td>${ex.descanso}</td></tr>`; });
            html += `</tbody></table>`;
        }
    });
    html += `<script>window.print();window.onfocus=function(){window.close()}</script></body></html>`;
    const w = window.open('','','height=600,width=800'); w.document.write(html); w.document.close();
}

async function cadastrarAluno() {
    const nome = document.getElementById('novoNome').value;
    const tel = document.getElementById('novoTel').value;
    const dataVenc = document.getElementById('novoVencimento').value;
    if (!nome || !tel) return alert("Preencha os dados.");
    if(listaDeAlunos.some(a => a.telefone === tel)) return alert("Telefone já existe!");
    
    const novoAluno = {
        nome: nome, telefone: tel, vencimento: dataVenc,
        academiaId: usuarioLogado.id, academiaNome: usuarioLogado.nome,
        pesoInicial: "", historicoFogo: [], historicoAvaliacoes: [], historicoCardio: [], historicoCargas: {}, registros: {},
        dataTrocaTreino: new Date().toLocaleDateString('pt-BR'),
        treinos: { A: { exercicios: [] }, B: { exercicios: [] }, C: { exercicios: [] }, D: { exercicios: [] }, E: { exercicios: [] } }
    };
    listaDeAlunos.push(novoAluno);
    await salvarNaColecao("alunos", novoAluno.telefone, novoAluno);
    renderizarListaAlunosAdmin(); toggleFormulario();
}

/* ================= EDITOR DE TREINO (CARDS PREMIUM) ================= */
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
    container.innerHTML += `<div class="group-header">${obterIcone(grupo)} ${grupo}</div>`;
    grupos[grupo].forEach(ex => {
      const salvo = salvos.find(s => s.id === ex.id);
      const isChecked = salvo ? "checked" : "";
      const isSelectedClass = salvo ? "selected" : "";
      const valDesc = salvo && salvo.descanso ? salvo.descanso : "Descanso";
      const valMet = salvo && salvo.metodo ? salvo.metodo : "Normal";
      const valSer = salvo && salvo.series ? salvo.series : "";

      container.innerHTML += `
      <div class="exercise-select-card ${isSelectedClass}" id="card_${ex.id}">
        <div class="card-top" onclick="toggleCardSelection('${ex.id}')">
            <input type="checkbox" id="chk_${ex.id}" value="${ex.id}" class="big-checkbox" ${isChecked} onchange="toggleCardVisual(this, '${ex.id}')">
            <label for="chk_${ex.id}" class="card-label">${ex.nome}</label>
        </div>
        <div class="card-options">
            <select id="desc_${ex.id}" class="input-pill">
                <option value="Descanso" disabled ${valDesc==="Descanso"?"selected":""}>⏱️ Tempo</option>
                <option value="30s" ${valDesc==="30s"?"selected":""}>30s</option>
                <option value="45s" ${valDesc==="45s"?"selected":""}>45s</option>
                <option value="1min" ${valDesc==="1min"?"selected":""}>1m</option>
                <option value="1:30" ${valDesc==="1:30"?"selected":""}>1:30</option>
                <option value="2min" ${valDesc==="2min"?"selected":""}>2m</option>
            </select>
            <select id="met_${ex.id}" class="input-pill">
                <option value="Normal" ${valMet==="Normal"?"selected":""}>Normal</option>
                <option value="Falha" ${valMet==="Falha"?"selected":""}>Falha</option>
                <option value="Drop" ${valMet==="Drop"?"selected":""}>Drop</option>
                <option value="Bi-set" ${valMet==="Bi-set"?"selected":""}>Bi-set</option>
            </select>
            <input type="text" id="ser_${ex.id}" class="input-pill" placeholder="3x12" value="${valSer}">
        </div>
      </div>`;
    });
  });
}
function toggleCardSelection(id) {
    const chk = document.getElementById(`chk_${id}`);
    if(event.target !== chk) chk.checked = !chk.checked;
    toggleCardVisual(chk, id);
}
function toggleCardVisual(checkbox, id) {
    const card = document.getElementById(`card_${id}`);
    if(checkbox.checked) { card.classList.add('selected'); if(navigator.vibrate) navigator.vibrate(20); } 
    else card.classList.remove('selected');
}
function salvarTreinoPersonal() {
  const checks = document.querySelectorAll('#listaSelecao input:checked'); const novos = [];
  checks.forEach(c => {
    const id = parseInt(c.value); const original = todosExercicios.find(e => e.id === id);
    novos.push({ 
        ...original, 
        descanso: document.getElementById(`desc_${id}`).value, 
        metodo: document.getElementById(`met_${id}`).value, 
        series: document.getElementById(`ser_${id}`).value || "3x12" 
    });
  });
  const idx = listaDeAlunos.findIndex(a => a.telefone === alunoEmEdicaoId);
  listaDeAlunos[idx].treinos[moduloEmEdicao].exercicios = novos;
  listaDeAlunos[idx].dataTrocaTreino = new Date().toLocaleDateString('pt-BR');
  salvarNaColecao("alunos", listaDeAlunos[idx].telefone, listaDeAlunos[idx]);
  alert("Treino Salvo com Sucesso! 🚀");
}

/* ================= APP DO ALUNO ================= */
function abrirAppAluno() {
    const nome = usuarioLogado.nome.split(' ')[0];
    document.querySelector('.header-student h1').innerHTML = `Olá, <span style="color:#00E676">${nome}</span>`;
    
    const academiaDoAluno = listaDeAcademias.find(gym => gym.id === usuarioLogado.academiaId);
    const boxAviso = document.getElementById('boxAvisoAluno');
    if(academiaDoAluno && academiaDoAluno.avisoAtivo === true && academiaDoAluno.aviso) {
        boxAviso.classList.remove('hidden');
        document.getElementById('textoAvisoAlunoDisplay').innerText = academiaDoAluno.aviso;
    } else { boxAviso.classList.add('hidden'); }

    atualizarDisplayFogo();
    renderizarCardsTreino(); atualizarDisplayVencimentoPerfil();
    document.getElementById('nomePerfil').innerText = usuarioLogado.nome;
    document.getElementById('academiaAlunoBadge').innerText = usuarioLogado.academiaNome || "Academia";
    document.getElementById('telPerfil').innerText = usuarioLogado.telefone;
    atualizarResumoCardio();
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
            if(hist.length > 0) { const ult = hist[hist.length-1].carga; textoUltimaCarga = `<span style="font-size:0.7rem; color:#00E676; margin-left:5px; font-weight:normal;">(Últ: ${ult}kg)</span>`; }
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
    if(atualizarBarraProgresso() === 100) registrarDiaDeFogo();
}
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
    if(registroHoje) registroHoje.carga = parseFloat(val); else hist.push({data:hoje, carga:parseFloat(val)});
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
function renderizarCardio() {
    const l = todosExercicios.filter(e => e.grupo === 'Cardio');
    const c = document.getElementById('listaCardioContainer'); c.innerHTML = "";
    l.forEach(x => { c.innerHTML += `<div class="treino-card" onclick="selecionarCardio('${x.nome}', this)" style="padding:15px"><div class="icon-box blue"><span class="material-icons-round">directions_run</span></div><div class="info"><h3>${x.nome}</h3></div></div>`; });
    atualizarResumoCardio();
}
function selecionarCardio(nome, elemento) {
    document.querySelectorAll('.treino-card').forEach(el => el.classList.remove('cardio-active'));
    elemento.classList.add('cardio-active');
    cardioEquipamentoAtual = nome;
    document.getElementById('labelEquipamentoCardio').innerText = "Treinando: " + nome;
    document.getElementById('btnCardioAction').style.opacity = "1"; document.getElementById('btnCardioAction').style.pointerEvents = "auto";
    resetCardioTimer(); toggleCardioTimer(); 
}
function toggleCardioTimer() {
    const btn = document.getElementById('btnCardioAction'); const disp = document.getElementById('cardioTimerDisplay');
    if(!cardioRunning) {
        cardioRunning = true; btn.innerText = "PAUSAR"; btn.style.background = "#eab308";
        cardioInterval = setInterval(() => { cardioSeconds++; const m = Math.floor(cardioSeconds/60).toString().padStart(2,'0'); const s = (cardioSeconds%60).toString().padStart(2,'0'); disp.innerText = `${m}:${s}`; }, 1000);
    } else { cardioRunning = false; clearInterval(cardioInterval); btn.innerText = "RETOMAR"; btn.style.background = "#00E676"; }
}
function finalizarCardio() {
    if(cardioSeconds < 30) { alert("Treino muito curto não é salvo."); resetCardioTimer(); return; }
    const peso = parseFloat(usuarioLogado.pesoAtual) || parseFloat(usuarioLogado.pesoInicial) || 70;
    const minutos = cardioSeconds / 60;
    const kcal = Math.round(7 * peso * (minutos/60));
    const registro = { data: new Date().toLocaleDateString('pt-BR'), equipamento: cardioEquipamentoAtual || "Cardio", tempoMin: Math.round(minutos), calorias: kcal };
    if(!usuarioLogado.historicoCardio) usuarioLogado.historicoCardio = [];
    usuarioLogado.historicoCardio.push(registro);
    salvarNaColecao("alunos", usuarioLogado.telefone, usuarioLogado);
    alert(`Treino finalizado! 🔥 ${kcal} kcal queimadas.`);
    resetCardioTimer(); atualizarResumoCardio();
}
function resetCardioTimer() { 
    cardioRunning = false; clearInterval(cardioInterval); cardioSeconds=0; 
    document.getElementById('cardioTimerDisplay').innerText="00:00"; document.getElementById('btnCardioAction').innerText="INICIAR"; document.getElementById('btnCardioAction').style.background = "#00E676";
}
function atualizarResumoCardio() {
    if(!usuarioLogado.historicoCardio) return;
    const hoje = new Date().toLocaleDateString('pt-BR');
    let minHoje=0, kcalHoje=0, minSemana=0;
    usuarioLogado.historicoCardio.forEach(reg => { if(reg.data === hoje) { minHoje += reg.tempoMin; kcalHoje += reg.calorias; } minSemana += reg.tempoMin; });
    document.getElementById('cardioHojeMin').innerText = minHoje + " min"; document.getElementById('cardioHojeKcal').innerText = kcalHoje + " kcal"; document.getElementById('cardioSemanaMin').innerText = minSemana + " min";
}
function abrirDicasNutri() {
    const hoje = new Date().getDate();
    const index = hoje % dicasNutri.length;
    const dica = dicasNutri[index];
    document.getElementById('nutriTag').innerText = dica.tag; document.getElementById('nutriTitulo').innerText = dica.titulo; document.getElementById('nutriDescricao').innerText = dica.desc; document.getElementById('nutriBeneficio').innerText = dica.beneficio;
    
    // ATUALIZAÇÃO: Preenche os Macros (Cal, Prot, Gord)
    if(dica.cal) {
        document.getElementById('nutriCal').innerText = dica.cal + " kcal";
        document.getElementById('nutriProt').innerText = dica.prot + " Prot";
        document.getElementById('nutriGord').innerText = dica.gord + " Gord";
    }

    const header = document.querySelector('#nutriModal .video-box > div:first-child');
    if(header) header.style.backgroundImage = `url('${dica.img}')`;
    document.getElementById('nutriModal').classList.add('active');
}
function fecharNutri() { document.getElementById('nutriModal').classList.remove('active'); }
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
function abrirVideo(t) { document.getElementById('videoModal').classList.add('active'); document.getElementById('videoTitulo').innerText=t; }
function fecharVideo() { document.getElementById('videoModal').classList.remove('active'); }
function mostrarTela(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active');
    const nav = document.getElementById('mainNav');
    if(['login','dashMaster','dashProfessor','painelPersonal'].includes(id)) nav.style.display = 'none';
    else if(usuarioLogado && usuarioLogado.tipo === 'aluno') nav.style.display = 'flex';
    if(id==='estatisticas') carregarEstatisticas(); if(id==='cardio') renderizarCardio();
}
function toggleFormulario() { document.getElementById('formCadastroAluno').classList.toggle('hidden'); }
function filtrarAlunos() { renderizarListaAlunosAdmin(); }
function obterIcone(g){const m={'Perna':'🦵','Peito':'🏋️','Costas':'🦍','Ombro':'🥥','Bíceps':'💪','Tríceps':'💪','Abs':'🔥','Cardio':'🏃'};return m[g]||'📋';}
function atualizarDisplayVencimentoPerfil() {
    const el = document.getElementById('vencimentoPerfil'); const st = document.getElementById('statusPagamento');
    const fin = verificarStatusFinanceiro(usuarioLogado.vencimento);
    if(!usuarioLogado.vencimento) { el.innerText="--/--"; st.innerText="Indefinido"; st.style.background="#334155"; return; }
    const p = usuarioLogado.vencimento.split('-'); el.innerText = `${p[2]}/${p[1]}/${p[0]}`;
    st.innerText = fin.status; st.style.background = fin.cor; st.style.color = "black";
}
function abrirModalAvaliacao(tel) { alunoSendoAvaliadoId = tel; const aluno = listaDeAlunos.find(a => a.telefone === tel); document.getElementById('nomeAlunoAvaliacao').innerText = aluno.nome; document.getElementById('modalAvaliacao').classList.add('active'); document.getElementById('avalPeso').value = ""; document.getElementById('avalGordura').value = ""; document.getElementById('avalMusculo').value = ""; }
function fecharModalAvaliacao() { document.getElementById('modalAvaliacao').classList.remove('active'); }
async function salvarAvaliacaoFisica() {
    const peso = document.getElementById('avalPeso').value; const gordura = document.getElementById('avalGordura').value; const musculo = document.getElementById('avalMusculo').value;
    if(!peso || !gordura) return alert("Preencha Peso e % Gordura");
    const aluno = listaDeAlunos.find(a => a.telefone === alunoSendoAvaliadoId);
    if(!aluno.historicoAvaliacoes) aluno.historicoAvaliacoes = [];
    const hoje = new Date().toLocaleDateString('pt-BR');
    aluno.historicoAvaliacoes.push({ data: hoje, peso: parseFloat(peso), gordura: parseFloat(gordura), musculo: musculo ? parseFloat(musculo) : null });
    aluno.pesoAtual = peso;
    await salvarNaColecao("alunos", aluno.telefone, aluno);
    alert("Medidas salvas!"); fecharModalAvaliacao();
}
function carregarEstatisticas() {
    const ctx = document.getElementById('graficoComposicaoCanvas');
    if(ctx && usuarioLogado.historicoAvaliacoes) {
        let labels=[], dPeso=[], dGordura=[];
        usuarioLogado.historicoAvaliacoes.forEach(x => { labels.push(x.data.slice(0,5)); dPeso.push(x.peso); dGordura.push(x.gordura); });
        if(dPeso.length>0) { document.getElementById('statPesoAtual').innerText = dPeso[dPeso.length-1] + ' kg'; document.getElementById('statGorduraAtual').innerText = dGordura[dGordura.length-1] + '%'; }
        if(chartComposicao) chartComposicao.destroy();
        chartComposicao = new Chart(ctx, { type: 'line', data: { labels, datasets: [ { label: 'Peso (kg)', data: dPeso, borderColor: '#f8fafc', tension:0.4, yAxisID: 'y' }, { label: '% Gordura', data: dGordura, borderColor: '#eab308', borderDash:[5,5], tension:0.4, yAxisID: 'y1' } ] }, options: { responsive:true, maintainAspectRatio:false, scales:{ x:{display:false}, y:{type:'linear', display:true, position:'left'}, y1:{type:'linear', display:true, position:'right', grid:{drawOnChartArea:false}} } } });
    }
    let hist = usuarioLogado.historicoFogo || [];
    const container = document.getElementById('graficoSemanal'); container.innerHTML = "";
    const hoje = new Date(); const dom = new Date(hoje); dom.setDate(hoje.getDate() - hoje.getDay());
    const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    for(let i=0; i<7; i++) {
        const d = new Date(dom); d.setDate(dom.getDate()+i); const str = d.toLocaleDateString('pt-BR');
        const active = hist.includes(str) ? 'active' : ''; const h = active ? '100%' : '10%';
        container.innerHTML += `<div class="chart-bar-wrapper"><div class="chart-bar ${active}" style="height:${h}"></div><span class="week-day">${dias[i]}</span></div>`;
    }
    povoarSelectExercicios();
}
function povoarSelectExercicios() {
    const sel = document.getElementById('selectExercicioGrafico'); if(!sel) return;
    let ids = Object.keys(usuarioLogado.historicoCargas || {}); sel.innerHTML = "";
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

window.autenticar = autenticar; window.loginMaster = loginMaster; window.criarAcademia = criarAcademia; window.toggleFormulario = toggleFormulario; window.cadastrarAluno = cadastrarAluno; window.abrirEditorTreino = abrirEditorTreino; window.salvarTreinoPersonal = salvarTreinoPersonal; window.trocarModuloEdicao = trocarModuloEdicao; window.abrirTreino = abrirTreino; window.toggleSet = toggleSet; window.salvarPeso = salvarPeso; window.voltarTreinos = () => mostrarTela('treinos'); window.abrirVideo = abrirVideo; window.fecharVideo = fecharVideo; window.filtrarAlunos = filtrarAlunos; window.mostrarTela = mostrarTela; window.logout = logout; window.adicionarTempo=adicionarTempo; window.fecharTimer=fecharTimer; window.toggleCardioTimer=toggleCardioTimer; window.resetCardioTimer=resetCardioTimer; window.salvarAvisoAcademia=salvarAvisoAcademia; window.abrirModalAvaliacao=abrirModalAvaliacao; window.fecharModalAvaliacao=fecharModalAvaliacao; window.salvarAvaliacaoFisica=salvarAvaliacaoFisica; window.atualizarGraficoCarga=atualizarGraficoCarga; window.selecionarCardio=selecionarCardio; window.finalizarCardio=finalizarCardio; window.imprimirTreino=imprimirTreino; window.abrirDicasNutri=abrirDicasNutri; window.fecharNutri=fecharNutri; window.deletarDocumento=deletarDocumento; window.renderizarCheckboxes = renderizarCheckboxes; window.toggleCardSelection = toggleCardSelection; window.toggleCardVisual = toggleCardVisual;
