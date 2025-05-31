// ---MENU RESPONSIVO---HEADER--
const menuDiv = document.getElementById("menu-mobile");
const btnAnimar = document.getElementById("btn-menu");

menuDiv.addEventListener("click", animarMenu);

function animarMenu() {
  menuDiv.classList.toggle("abrir");
  btnAnimar.classList.toggle("ativar");
}
// Validação do formulário (Login)
function logar() {
  var login = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;
  if (login == "teste" && senha == "teste") {
    alert("sucesso");
  } else {
    alert("Senha ou usuário incorretos");
  }
}

// Validação Popup
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
  togglePopup.checked = false;
});

// Validação do Formulário de Cadastro

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

usernameInput.addEventListener("change", (evento) => {
  const valor = evento.target.value;

  let usernameValido = valor.length >= 3;

  if (usernameValido) {
    alert("Username Válido");

    usernameInput.classList.add("correct");
    usernameInput.classList.remove("error");
  } else {
    alert("Nome deve conter pelo menos 3 caracteres");
  }
});

emailInput.addEventListener("change", (evento) => {
  const valor = evento.target.value;

  if (valor.includes("@")) {
    alert("Email Válido");

    emailInput.classList.add("correct");
    emailInput.classList.remove("error");
  } else {
    alert("Email Inválido. Deve conter um @");
  }
});

senhaInput.addEventListener("change", (evento) => {
  const valor = evento.target.value;

  let senhaValida = valor.length >= 6;

  if (senhaValida) {
    alert("Senha Válida.");

    senhaInput.classList.add("correct");
    senhaInput.classList.remove("error");
  } else {
    alert("Sua senha deve conter pelo menos 6 caracteres!");
  }
});

//---INPUT TYPE RANGE--LIVRE/PERSONAGENS/RANGE--
const imageContainer = document.getElementById("imageContainer");
const slider = document.getElementById("range");

slider.addEventListener("input", () => {
  imageContainer.scrollLeft =
    (slider.value / 100) *
    (imageContainer.scrollWidth - imageContainer.clientWidth);
});

//--GAME MARIO--LIVRE/PERSONAGENS/BOX-ANIMATION--
const range = document.querySelector(".box-range");
const animation = document.querySelector(".box-animation");
const gameHome = document.querySelector(".box-game_home");
const gameStar = document.querySelector(".box-game_star");
const vocePerdeu = document.querySelector(".box-game_over");
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe-game");
const btnGame = document.querySelector(".btn-game");
const btnVoltar = document.querySelector(".btn-voltar");
const btnJogar = document.querySelector(".btn-jogar");
const video = document.querySelector(".video-nostalgia");
const boxControle = document.querySelector(".box-controle");
//----------AUDIOS-----------
const audioAbertura = new Audio("img/erika/audio/audio-abertura.wav");
const audioPrincipal = new Audio("img/erika/audio/audio-principal.mp3");
const audioPulo = new Audio("img/erika/audio/audio-pulo.wav");
const audioPerdeu = new Audio("img/erika/audio/audio-perdeu.wav");
const audioGameOver = new Audio("img/erika/audio/audio-game-over.wav");
/* Áudio pausado não será reutilizado (valor 0). Ao reiniciar,
 será um novo áudio ou novo play, pois o tempo de pausa é 0. */
const resetAudio = () => {
  audioAbertura.pause();
  audioAbertura.currentTime = 0;

  audioPrincipal.pause();
  audioPrincipal.currentTime = 0;

  audioPulo.pause();
  audioPulo.currentTime = 0;

  audioPerdeu.pause();
  audioPerdeu.currentTime = 0;

  audioGameOver.pause();
  audioGameOver.currentTime = 0;
};

function borda() {
  btnGame.classList.add("btn-game_border");
  setTimeout(() => {
    btnGame.classList.remove("btn-game_border");
  }, 1000);
}
setInterval(borda, 2000);

//ADD CLASSE COM ANIMAÇÃO AO MÁRIO
const jump = () => {
  mario.classList.add("jump");
  audioPulo.play();

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

// FUNÇÃO PARA REINICIAR O JOGO
const resetGame = () => {
  pipe.style.animation = "";
  pipe.style.left = "";
  mario.style.animation = "";
  mario.style.bottom = "";
  mario.src = "/img/erika/mario.gif"; // VOLTAR IMAGEM ORIGINAL DO MARIO
  mario.style.width = "150px";
  mario.style.marginLeft = "0";
  range.style.display = "none";
  animation.style.display = "none";
  gameStar.style.display = "none";
  vocePerdeu.style.display = "none";
  gameHome.style.display = "block";

  // RESET DE ÁUDIOS
  resetAudio();
};

//BOTÃO HOME
btnGame.addEventListener("click", () => {
  range.style.display = "none";
  animation.style.display = "none";
  vocePerdeu.style.display = "none";
  gameStar.style.display = "none";
  gameHome.style.display = "block";
  audioAbertura.play();
  audioAbertura.currentTime = 0;
  video.pause();
  video.controls = false;
  video.style.cursor = "default";
  boxControle.classList.add("box-controle_animado");
  setTimeout(() => {
    boxControle.classList.remove("box-controle_animado");
  }, 2000);
});

//BOTÃO VOLTAR
btnVoltar.addEventListener("click", () => {
  range.style.display = "block";
  animation.style.display = "block";
  gameHome.style.display = "none";
  vocePerdeu.style.display = "none";
  gameStar.style.display = "none";
  audioAbertura.pause();
  video.controls = true;
  video.style.cursor = "pointer";
});

// BOTÃO DE jogar
btnJogar.addEventListener("click", () => {
  resetGame();
  document.addEventListener("keydown", jump);
  pipe.classList.add("pipe-race"); // ADD CLASSE COM ANIMAÇÃO
  range.style.display = "none";
  animation.style.display = "none";
  gameHome.style.display = "none";
  vocePerdeu.style.display = "none";
  gameStar.style.display = "block";
  audioAbertura.pause();
  audioAbertura.currentTime = 0;
  audioPrincipal.play();

  // LOOP DE EVENTOS
  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
      mario.src = "/img/erika/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      document.removeEventListener("keydown", jump);
      audioPrincipal.pause();
      audioPerdeu.play();

      clearInterval(loop);

      setTimeout(() => {
        audioGameOver.play();
        vocePerdeu.style.display = "block";
      }, 3000);

      setTimeout(() => {
        audioGameOver.pause();
        resetGame();
      }, 8000);
    }
  });
});
