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
            canvas.appendChild(criarTitulo("PRODUTO EXCLUSIVO"));
            canvas.appendChild(criarBotao("COMPRAR AGORA"));
        }
    }
}

function drag(ev) { dragType = ev.target.getAttribute("data-tipo"); }
function allowDrop(ev) { ev.preventDefault(); }
function drop(ev) {
    ev.preventDefault();
    document.querySelector(".canvas-placeholder")?.remove();
    let n;
    if (dragType === "titulo") n = criarTitulo();
    if (dragType === "texto") n = criarTexto();
    if (dragType === "botao") n = criarBotao();
    if (dragType === "imagem") n = criarImagem();
    if (dragType === "espaco") n = criarEspaco();
    if (n) canvas.appendChild(n);
}

function criarBase(tag, cls) {
    const el = document.createElement(tag);
    el.className = `elemento ${cls}`;
    el.onclick = (e) => { e.stopPropagation(); selecionar(el); };
    return el;
}

function criarTitulo(t = "Novo Título") {
    const el = criarBase("h2", "comp-titulo");
    el.innerText = t;
    el.style.fontSize = "32px";
    el.style.textAlign = "center";
    el.style.color = "#000000";
    return el;
}

function criarBotao(t = "CLIQUE AQUI") {
    const div = criarBase("div", "comp-wrapper-btn");
    div.style.textAlign = "center";
    div.style.padding = "10px";
    const a = document.createElement("a");
    a.innerText = t;
    a.href = "#";
    a.style.backgroundColor = "#8b5cf6";
    a.style.color = "#ffffff";
    a.style.padding = "15px 30px";
    a.style.borderRadius = "8px";
    a.style.display = "inline-block";
    a.style.textDecoration = "none";
    div.appendChild(a);
    return div;
}

function criarTexto() {
    const el = criarBase("p", "comp-texto");
    el.innerText = "Seu texto aqui...";
    el.style.fontSize = "16px";
    el.style.textAlign = "center";
    return el;
}

function criarImagem() {
    const el = criarBase("img", "comp-img");
    el.src = "https://via.placeholder.com/400x200";
    el.style.width = "100%";
    return el;
}

function criarEspaco() {
    const el = criarBase("div", "comp-espaco");
    el.style.height = "50px";
    el.style.border = "1px dashed #ccc";
    return el;
}

function selecionar(el) {
    document.querySelectorAll(".selecionado").forEach(x => x.classList.remove("selecionado"));
    elSelected = el;
    el.classList.add("selecionado");
    renderProps();
}

function renderProps() {
    propPanel.innerHTML = "";
    const el = elSelected;

    // Se for texto ou título
    if (el.tagName === "H2" || el.tagName === "P") {
        addInput("Texto", el.innerText, v => el.innerText = v);
        addInput("Tamanho da Letra (px)", parseInt(el.style.fontSize), v => el.style.fontSize = v + "px", "number");
        addInput("Cor da Letra", el.style.color, v => el.style.color = v, "color");
        addSelect("Alinhamento", el.style.textAlign, ["left", "center", "right"], v => el.style.textAlign = v);
    }

    // Se for Botão
    if (el.classList.contains("comp-wrapper-btn")) {
        const a = el.querySelector("a");
        addInput("Texto do Botão", a.innerText, v => a.innerText = v);
        addInput("Link (URL/WhatsApp)", a.href, v => a.href = v);
        addInput("Cor do Botão", "#8b5cf6", v => a.style.backgroundColor = v, "color");
        addInput("Cor da Letra", "#ffffff", v => a.style.color = v, "color");
        addSelect("Mover Botão (Lados)", el.style.textAlign, ["left", "center", "right"], v => el.style.textAlign = v);
    }

    // Se for Espaçamento
    if (el.classList.contains("comp-espaco")) {
        addInput("Altura do Espaço (px)", parseInt(el.style.height), v => el.style.height = v + "px", "number");
    }

    const del = document.createElement("button");
    del.innerText = "Apagar Item";
    del.className = "btn-delete";
    del.onclick = () => { el.remove(); propPanel.innerHTML = ""; };
    propPanel.appendChild(del);
}

function addInput(label, val, cb, type = "text") {
    const d = document.createElement("div");
    d.className = "prop-group";
    d.innerHTML = `<label>${label}</label>`;
    const i = document.createElement("input");
    i.type = type;
    i.value = val;
    i.oninput = (e) => cb(e.target.value);
    d.appendChild(i);
    propPanel.appendChild(d);
}

function addSelect(label, val, opts, cb) {
    const d = document.createElement("div");
    d.className = "prop-group";
    d.innerHTML = `<label>${label}</label>`;
    const s = document.createElement("select");
    opts.forEach(o => {
        const op = document.createElement("option");
        op.value = o; op.innerText = o;
        if(o === val) op.selected = true;
        s.appendChild(op);
    });
    s.onchange = (e) => cb(e.target.value);
    d.appendChild(s);
    propPanel.appendChild(d);
}