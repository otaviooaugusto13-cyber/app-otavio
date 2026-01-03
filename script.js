let dragType = null;
let elSelected = null;
const canvas = document.getElementById("canvas");
const propPanel = document.getElementById("properties-panel");

function voltarAoInicio() { location.reload(); }

function startEditor(template) {
    document.getElementById('welcome-screen').style.display = 'none';
    if(template !== 'limpo') {
        document.querySelector(".canvas-placeholder")?.remove();
        if(template === 'vendas_premium') {
            // Posiciona elementos iniciais em locais padrão
            canvas.appendChild(criarTitulo("PRODUTO EXCLUSIVO", 50, 100));
            canvas.appendChild(criarBotao("COMPRAR AGORA", 150, 120));
        }
    }
}

function drag(ev) { dragType = ev.target.getAttribute("data-tipo"); }
function allowDrop(ev) { ev.preventDefault(); }

function drop(ev) {
    ev.preventDefault();
    document.querySelector(".canvas-placeholder")?.remove();
    
    // Calcula a posição X e Y exata onde o item foi solto
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    let n;
    if (dragType === "titulo") n = criarTitulo("Novo Título", y, x);
    if (dragType === "texto") n = criarTexto(y, x);
    if (dragType === "botao") n = criarBotao("CLIQUE AQUI", y, x);
    if (dragType === "imagem") n = criarImagem(y, x);
    if (dragType === "espaco") n = criarEspaco(y, x);
    
    if (n) {
        canvas.appendChild(n);
        tornarMovel(n); // Ativa a movimentação livre
    }
}

function criarBase(tag, cls, top = 0, left = 0) {
    const el = document.createElement(tag);
    el.className = `elemento ${cls}`;
    el.style.position = "absolute"; // Permite mover para qualquer lugar
    el.style.top = top + "px";
    el.style.left = left + "px";
    el.style.cursor = "move";
    
    el.onclick = (e) => { 
        e.stopPropagation(); 
        selecionar(el); 
    };
    return el;
}

function criarTitulo(t = "Novo Título", top, left) {
    const el = criarBase("h2", "comp-titulo", top, left);
    el.innerText = t;
    el.style.fontSize = "32px";
    el.style.color = "#000000";
    el.style.margin = "0";
    return el;
}

function criarBotao(t = "CLIQUE AQUI", top, left) {
    const div = criarBase("div", "comp-wrapper-btn", top, left);
    const a = document.createElement("a");
    a.innerText = t;
    a.href = "#";
    a.style.backgroundColor = "#8b5cf6";
    a.style.color = "#ffffff";
    a.style.padding = "15px 30px";
    a.style.borderRadius = "8px";
    a.style.display = "inline-block";
    a.style.textDecoration = "none";
    a.style.pointerEvents = "none"; // Evita que o clique no link atrapalhe o arrastar
    div.appendChild(a);
    return div;
}

function criarTexto(top, left) {
    const el = criarBase("p", "comp-texto", top, left);
    el.innerText = "Seu texto aqui...";
    el.style.fontSize = "16px";
    el.style.margin = "0";
    return el;
}

function criarImagem(top, left) {
    const el = criarBase("comp-img", top, left);
    // Criamos um span de ajuda e a tag img vazia
    el.innerHTML = `
        <span style="color: #999; font-size: 12px;">Clique para configurar imagem</span>
        <img src="" style="display:none; width:150px;">
    `;
    return el;
}

function criarEspaco(top, left) {
    const el = criarBase("div", "comp-espaco", top, left);
    el.style.width = "100px";
    el.style.height = "50px";
    el.style.border = "1px dashed #ccc";
    return el;
}

// Lógica para Arrastar Elementos dentro do Canvas
function tornarMovel(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        selecionar(elmnt); // Seleciona ao clicar para arrastar
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Define a nova posição
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function selecionar(el) {
    document.querySelectorAll(".selecionado").forEach(x => x.classList.remove("selecionado"));
    elSelected = el;
    el.classList.add("selecionado");
    renderProps();
}

function renderProps() {
    propPanel.innerHTML = "<h3>Configurações</h3>";
    const el = elSelected;

    // BOTÃO PARA MUDAR O FUNDO DO SITE TODO (Aparece se nada estiver selecionado ou sempre no topo)
    addInput("Fundo da Página", "#ffffff", v => {
        document.getElementById('canvas').style.background = v;
    }, "color");
    
    document.createElement("hr"); // Linha divisória

    if (!el) return;

    // --- CONFIGURAÇÃO DE TEXTOS ---
    if (el.tagName === "H2" || el.tagName === "P") {
        addInput("Texto", el.innerText, v => el.innerText = v);
        addInput("Tamanho (px)", parseInt(el.style.fontSize) || 16, v => el.style.fontSize = v + "px", "number");
        addInput("Cor", el.style.color || "#000000", v => el.style.color = v, "color");
    }

    // --- CONFIGURAÇÃO DE BOTÕES ---
    if (el.classList.contains("comp-wrapper-btn")) {
        const a = el.querySelector("a");
        addInput("Texto do Botão", a.innerText, v => a.innerText = v);
        addInput("Link (URL)", a.href, v => a.href = v);
        addInput("Cor do Botão", "#8b5cf6", v => a.style.backgroundColor = v, "color");
        addInput("Cor do Texto", "#ffffff", v => a.style.color = v, "color");
        // Novo: Arredondamento do botão
        addInput("Arredondamento", 50, v => a.style.borderRadius = v + "px", "range");
    }

    // --- CONFIGURAÇÃO DE IMAGENS ---
    if (el.classList.contains("comp-img") || el.querySelector("img")) {
        const img = el.querySelector("img");
        
        // Botão de Upload (já criamos antes)
        const btnUpload = document.createElement("button");
        btnUpload.innerText = "Trocar Imagem";
        btnUpload.className = "btn-gerar";
        btnUpload.style.width = "100%";
        btnUpload.onclick = () => { /* ... lógica de upload que já temos ... */ };
        propPanel.appendChild(btnUpload);

        // Novo: Transformar foto em Redonda (igual ao perfil do site exemplo)
        addInput("Arredondamento (Foto)", 0, v => img.style.borderRadius = v + "%", "range");
    }

    // BOTÃO APAGAR
    const del = document.createElement("button");
    del.innerText = "Apagar Item";
    del.className = "btn-delete";
    del.onclick = () => { el.remove(); propPanel.innerHTML = ""; };
    propPanel.appendChild(del);
}
        // Upload do PC
        const btnUpload = document.createElement("button");
        btnUpload.innerText = "Upload do Computador";
        btnUpload.className = "btn-gerar"; 
        btnUpload.style.width = "100%";
        btnUpload.style.marginTop = "10px";
        btnUpload.style.marginBottom = "10px";
        
        btnUpload.onclick = () => {
            const fileInput = document.getElementById('image-upload-hidden');
            fileInput.click();
            fileInput.onchange = e => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        imgTag.src = ev.target.result;
                        imgTag.style.display = 'block';
                        if(spanHelp) spanHelp.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            };
        };
        propPanel.appendChild(btnUpload);
    }

    // 4. BOTÃO APAGAR (Sempre visível para qualquer item)
    const del = document.createElement("button");
    del.innerText = "Apagar Item";
    del.className = "btn-delete";
    del.onclick = () => { el.remove(); propPanel.innerHTML = ""; };
    propPanel.appendChild(del);
}
/* 1. Transformar o Canvas em um "Celular" */
#canvas {
    position: relative;
    width: 375px;           /* Largura de um iPhone */
    min-height: 667px;      /* Altura de um iPhone */
    margin: 20px auto;
    background: #ffffff;    /* Cor padrão inicial */
    border: 12px solid #27272a; /* Moldura do celular */
    border-radius: 40px;    /* Cantos arredondados do aparelho */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow-y: auto;       /* Permite rolar se o site for longo */
    transition: background 0.3s ease;
}

/* 2. Estilo dos Botões (Efeito Cápsula) */
.comp-wrapper-btn {
    width: 90%;
    margin: 10px auto;
}

.comp-wrapper-btn a {
    display: block;
    width: 100%;
    padding: 14px;
    text-align: center;
    text-decoration: none;
    font-weight: 600;
    border-radius: 50px;    /* Botão estilo pílula */
    transition: 0.2s;
}

/* 3. Imagens Flexíveis */
.comp-img img {
    max-width: 100%;
    height: auto;
    display: block;
    transition: border-radius 0.2s;
}
