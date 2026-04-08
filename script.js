import { criarCamisa, listarCamisas, deletarCamisa, atualizarCamisa } from "./crud.js";

const form = document.getElementById("camisaForm");
const lista = document.getElementById("listaCamisas");
const btnSalvar = document.getElementById("btnSalvar");

// O Realtime Database atualiza a tela automaticamente quando os dados mudam
listarCamisas((camisas) => {
    lista.innerHTML = "";
    if (camisas) {
        Object.keys(camisas).forEach((id) => {
            const item = camisas[id];
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.modelo} --- ${item.cor} --- ${item.marca} (${item.tamanho})</span>
                <div>
                    <button class="btn-edit" onclick="preencherEdicao('${id}', '${item.modelo}', '${item.cor}', '${item.tamanho}', '${item.marca}' )">Editar</button>
                    <button class="btn-delete" onclick="removerCamisa('${id}')">Excluir</button>
                </div>
            `;
            lista.appendChild(li);
        });
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("camisaId").value;
    const dados = {
        modelo: document.getElementById("modelo").value,
        cor: document.getElementById("cor").value,
        tamanho: document.getElementById("tamanho").value,
        marca: document.getElementById("marca").value
    };

    if (id) {
        await atualizarCamisa(id, dados);
    } else {
        await criarCamisa(dados);
    }
    
    form.reset();
    document.getElementById("camisaId").value = "";
    btnSalvar.innerText = "Salvar Camisa";
});

window.removerCamisa = (id) => {
    if(confirm("Deseja excluir esta camisa?")) {
        deletarCamisa(id);
    }
};

window.preencherEdicao = (id, modelo, cor, tamanho, marca) => {
    document.getElementById("camisaId").value = id;
    document.getElementById("modelo").value = modelo;
    document.getElementById("cor").value = cor;
    document.getElementById("marca").value = marca;
    document.getElementById("tamanho").value = tamanho;
    btnSalvar.innerText = "Atualizar Camisa";
};