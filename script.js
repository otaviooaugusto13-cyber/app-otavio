let elSelected = null;
let dragType = null;
const canvas = document.getElementById("canvas");
const propPanel = document.getElementById("properties-panel");

function startEditor(template) {
    document.getElementById('welcome-screen').style.display = 'none';
    if(template === 'link_bio') {
        const img = criarImagem(50, 112);
        canvas.appendChild(img);
        tornarMovel(img);
    }
}

function drag(ev) { dragType = ev.target.getAttribute("data-tipo"); }
function allowDrop(ev) { ev.preventDefault(); }

function drop(ev) {
    ev.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    let n;
    if (dragType === "titulo") n = criarTexto("Novo Título", "h2", y, x);
    if (dragType === "texto") n = criarTexto("Seu parágrafo aqui", "p", y, x);
    if (dragType === "botao") n = criarBotao("CLIQUE AQUI", y, x);
    if (dragType === "imagem") n = criarImagem(y, x);
    
    if (n) {
        canvas.appendChild(n);
        tornarMovel(n);
        selecionar(n);
    }
}

function criarBase(cls, top, left) {
    const el = document.createElement("div");
    el.className = `elemento ${cls}`;
    el.style.top = top + "px";
    el.style.left = left + "px";
    el.onmousedown = () => selecionar(el);
    return el;
}

function criarTexto(txt, tag, top, left) {
    const el = criarBase("comp-texto", top, left);
    el.innerHTML = `<${tag} style="margin:0; font-size: ${tag==='h2'?'24px':'16px'}">${txt}</${tag}>`;
    return el;
}

function criarBotao(txt, top, left) {
    const el = criarBase("comp-wrapper-btn", top, left);
    el.innerHTML = `<a href="#">${txt}</a>`;
    return el;
}

function criarImagem(top, left) {
    const el = criarBase("comp-img", top, left);
    el.innerHTML = `
        <span style="color:#ccc; font-size:10px">Clique para carregar</span>
        <img src="https://via.placeholder.com/150" style="width:150px; border-radius: 0px; display:block">
    `;
    return el;
}

function tornarMovel(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = function(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => { document.onmousemove = null; document.onmouseup = null; };
        document.onmousemove = (e) => {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        };
    };
}

function selecionar(el) {
    document.querySelectorAll(".selecionado").forEach(x => x.classList.remove("selecionado"));
    elSelected = el;
    el.classList.add("selecionado");
    renderProps();
}

function renderProps() {
    propPanel.innerHTML = "<h3>Configurações</h3>";
    
    // Configuração Global de Fundo
    addInput("Cor de Fundo do Site", "#ffffff", v => canvas.style.background = v, "color");

    if (!elSelected) return;

    const el = elSelected;

    // Se for Texto
    const txt = el.querySelector("h2, p");
    if(txt) {
        addInput("Texto", txt.innerText, v => txt.innerText = v);
        addInput("Cor", "#000000", v => txt.style.color = v, "color");
    }

    // Se for Botão
    const a = el.querySelector("a");
    if(a) {
        addInput("Texto", a.innerText, v => a.innerText = v);
        addInput("Cor Fundo", "#8b5cf6", v => a.style.backgroundColor = v, "color");
        addInput("Bordas", 50, v => a.style.borderRadius = v + "px", "range");
    }

    // Se for Imagem
    const img = el.querySelector("img");
    if(img) {
        const btnUp = document.createElement("button");
        btnUp.innerText = "Upload da Foto";
        btnUp.style.width="100%";
        btnUp.onclick = () => {
            const input = document.getElementById('image-upload-hidden');
            input.click();
            input.onchange = e => {
                const reader = new FileReader();
                reader.onload = (ev) => { img.src = ev.target.result; el.querySelector('span').style.display='none'; };
                reader.readAsDataURL(e.target.files[0]);
            };
        };
        propPanel.appendChild(btnUp);
        addInput("Foto Redonda", 0, v => img.style.borderRadius = v + "%", "range");
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
    i.type = type; i.value = val;
    i.oninput = (e) => cb(e.target.value);
    d.appendChild(i);
    propPanel.appendChild(d);
}
