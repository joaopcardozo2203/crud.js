import { criarCamisa, listarCamisas, deletarCamisa, atualizarCamisa } from "./crud.js";

const form = document.getElementById("camisaForm");
const lista = document.getElementById("listaCamisas");
const btnSalvar = document.getElementById("btnSalvar");

// Função para converter o arquivo de imagem em String Base64
const converterParaBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// Listar Camisas com Imagem
listarCamisas((camisas) => {
    lista.innerHTML = "";
    if (camisas) {
        Object.keys(camisas).forEach((id) => {
            const item = camisas[id];
            const li = document.createElement("li");
            
            // Se não houver foto, usamos uma imagem padrão (placeholder)
            const fotoExibicao = item.foto ? item.foto : "https://via.placeholder.com/60?text=Sem+Foto";

            li.innerHTML = `
                <div class="info-camisa">
                    <img src="${fotoExibicao}" class="thumb-camisa">
                    <div>
                        <strong>${item.modelo}</strong><br>
                        <small>${item.marca} - ${item.cor} (${item.tamanho})</small>
                    </div>
                </div>
                <div class="acoes">
                    <button class="btn-edit" onclick="preencherEdicao('${id}', '${item.modelo}', '${item.cor}', '${item.tamanho}', '${item.marca}')">Editar</button>
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
    const fileInput = document.getElementById("foto");
    let fotoBase64 = "";

    // Se o usuário selecionou uma imagem, converte para base64
    if (fileInput.files.length > 0) {
        fotoBase64 = await converterParaBase64(fileInput.files[0]);
    }

    const dados = {
        modelo: document.getElementById("modelo").value,
        cor: document.getElementById("cor").value,
        tamanho: document.getElementById("tamanho").value,
        marca: document.getElementById("marca").value
    };

    // Só atualiza a foto se uma nova for enviada (evita apagar a foto antiga na edição)
    if (fotoBase64) {
        dados.foto = fotoBase64;
    }

    if (id) {
        await atualizarCamisa(id, dados);
    } else {
        await criarCamisa(dados);
    }
    
    form.reset();
    document.getElementById("camisaId").value = "";
    btnSalvar.innerText = "Salvar Camisa";
});

// Funções Globais para os botões do HTML (Necessário em type="module")
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
    window.scrollTo(0, 0); // Sobe para o formulário
};