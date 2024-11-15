import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();
const database = getDatabase();

// Função para buscar e exibir os dados da Torneira 1
function displayTorneira1Data(userId) {
  const torneira1Ref = ref(database, 'users/' + userId + '/maquina_1/torneira_1');

  get(torneira1Ref).then((snapshot) => {
    if (snapshot.exists()) {
      const torneira1Data = snapshot.val();
      console.log("Dados da Torneira 1:", torneira1Data);

      const coposVendidos = parseInt(torneira1Data.copos_vendidos) || 0;
      const totalReceber = coposVendidos * 8;

      const torneira1Element = document.getElementById('torneira-1-data');
      torneira1Element.innerHTML = `
        <h2>Dados Torneira 1:</h2>
        <p>Copos vendidos: ${coposVendidos}</p>
        <p>Estilo: ${torneira1Data.estilo}</p>
        <p>Total a receber: R$ ${totalReceber.toFixed(2)}</p>
        <button class="main_button">Sangrar Torneira</button>
      `;
    } else {
      console.log("Nenhum dado encontrado para a Torneira 1.");
    }
  }).catch((error) => {
    console.error("Erro ao buscar dados da Torneira 1:", error);
  });
}

// Função para buscar e exibir os dados da Torneira 2
function displayTorneira2Data(userId) {
  const torneira2Ref = ref(database, 'users/' + userId + '/maquina_1/torneira_2');

  get(torneira2Ref).then((snapshot) => {
    if (snapshot.exists()) {
      const torneira2Data = snapshot.val();
      console.log("Dados da Torneira 2:", torneira2Data);

      const coposVendidos = parseInt(torneira2Data.copos_vendidos) || 0;
      const totalReceber = coposVendidos * 8;

      const torneira2Element = document.getElementById('torneira-2-data');
      torneira2Element.innerHTML = `
        <h2>Dados Torneira 2:</h2>
        <p>Copos vendidos: ${coposVendidos}</p>
        <p>Estilo: ${torneira2Data.estilo}</p>
        <p>Total a receber: R$ ${totalReceber.toFixed(2)}</p>
        <button class="main_button">Sangrar Torneira</button>
      `;
    } else {
      console.log("Nenhum dado encontrado para a Torneira 2.");
    }
  }).catch((error) => {
    console.error("Erro ao buscar dados da Torneira 2:", error);
  });
}

// Verifica se o usuário está logado e exibe os dados de ambas as torneiras na homepage
window.addEventListener('load', () => {
  const userId = localStorage.getItem('loggedInUserId');
  console.log("User ID recuperado:", userId);

  if (userId) {
    displayTorneira1Data(userId); // Dados da Torneira 1
    displayTorneira2Data(userId); // Dados da Torneira 2
  } else {
    window.location.href = 'index.html'; // Redireciona para a página de login se o usuário não estiver logado
  }
});

// Função para o botão "Sair"
document.getElementById('logoutButton').addEventListener('click', function() {
  localStorage.clear();
  window.location.href = 'index.html';
});
