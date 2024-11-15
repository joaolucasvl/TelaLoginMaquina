// Importando as funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9W9DOcrXgSFC7f7NKG2ySFawSZ9h5VIo",
  authDomain: "login-form-a3c93.firebaseapp.com",
  databaseURL: "https://login-form-a3c93-default-rtdb.firebaseio.com/",
  projectId: "login-form-a3c93",
  storageBucket: "login-form-a3c93.appspot.com",
  messagingSenderId: "248266035834",
  appId: "1:248266035834:web:e87d81664a0c1f18dfe1c3"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Função de Registro
const signUp = document.getElementById('submitSignUp');
if (signUp) {
  signUp.addEventListener('click', (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    if (username === "" || password === "" || email === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Criando usuário no Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          username: username,
          password: password,  // Não é seguro armazenar senhas em texto claro
          email: email
        };

        // Salvando dados do usuário no Realtime Database
        const userRef = ref(database, "users/" + user.uid);
        set(userRef, userData)
          .then(() => {
            window.location.href = 'index.html';  // Redireciona para a página de login após registro
          })
          .catch((error) => {
            console.log("Erro ao salvar dados do usuário:", error);
          });
      })
      .catch((error) => {
        console.log("Erro ao criar usuário:", error);
      });
  });
}

// Função de Login
const signInButton = document.getElementById('submitSignIn');
if (signInButton) {
  signInButton.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "" || password === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Autenticando usuário no Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html';  // Redireciona para a página inicial após login
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error.message);
        alert("Falha ao fazer login. Verifique suas credenciais.");
      });
  });
}
