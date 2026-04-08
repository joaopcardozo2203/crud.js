import { ref, set, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { db } from "./firebaseConfig.js";

const camisaRef = ref(db, 'camisas');

// Criar
export const criarCamisa = (camisa) => push(camisaRef, camisa);

// Listar (usando um callback para atualizar a tela em tempo real)
export const listarCamisas = (callback) => {
    onValue(camisaRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
};

// Atualizar
export const atualizarCamisa = (id, novosDados) => update(ref(db, `camisas/${id}`), novosDados);

// Deletar
export const deletarCamisa = (id) => remove(ref(db, `camisas/${id}`));