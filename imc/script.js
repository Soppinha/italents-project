// Função responsável por limpar o valor das inputs
function limparValorInput() {
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
}

// Função para validar os valores das inputs
function validarInputs(event) {
  // Evita que o formulário seja enviado quando o botão de calcular é clicado
  event.preventDefault();


  var isValid = true;

  var pesoInput = document.getElementById("peso").value;
  console.log("Var", pesoInput);

  // Converte o valor armazenado do tipo String para Float
  var pesoValue = parseFloat(pesoInput);
  console.log("Var", pesoValue);
  var errorPeso = document.getElementById("errorP");

  var alturaInput = document.getElementById("altura").value;
  console.log("Var", alturaInput);

  // Converte o valor armazenado do tipo String para Float
  var alturaValue = parseFloat(alturaInput);
  console.log("Var", alturaValue);

  var errorAltura = document.getElementById("errorA");

  // Verifica se o valor de 'peso' é inválido ou menor que 1.0
  if (isNaN(pesoValue) || pesoValue < 1.0) {
    document.querySelector(".p").style.borderColor = "red";
    errorPeso.textContent = "Preencha o campo corretamente.";
    isValid = false;
  } else {
    errorPeso.textContent = "";
    document.querySelector(".p").style.borderColor = "white";
  }

  // Verifica se o valor de 'altura' é inválido ou menor que 1
  if (isNaN(alturaValue) || alturaValue < 1.0) {
    document.querySelector(".a").style.borderColor = "red";
    errorAltura.textContent = "Preencha o campo corretamente.";
    isValid = false;
  } else {
    errorAltura.textContent = "";
    document.querySelector(".a").style.borderColor = "white";
  }

  // Se os valores de entrada forem válidos, execulta o codigo para "trocar" de tela
  // e chama a função calcularImc()
  if (isValid) {
    document.querySelector(".inicial").style.display = "none";
    document.querySelector(".part-loading").style.display = "flex";

    setTimeout(function () {
      document.querySelector(".part-loading").style.display = "none";
      document.querySelector(".resultado").style.display = "flex";

      calcularImc(pesoValue, alturaValue);
    }, 2000);
  }
}

// Função para calcular o IMC
function calcularImc(peso, altura) {
  var textoIMC = document.getElementById("textoImc");
  var textoResultado = document.getElementById("textoResult");
  var image = document.getElementById("icone");

  var categoria, url = "";

  // Verifica se o valor da 'altura' é maior que 3 e se for divide por 100
  if (altura > 3) {
    // Se for, ele mantém o valor em metros
    altura = altura / 100;
  } 

  var imc = peso / (altura * altura);

  // Determina a categoria do IMC e a URL da imagem correspondente
  if (imc < 18.5) {
    categoria = "Você está abaixo do peso";
    url = "/imc/assets/3.png";
  } else if (imc < 25) {
    categoria = "Seu peso está normal";
    url = "/imc/assets/1.png";
  } else if (imc < 30) {
    categoria = "Você está com sobrepeso";
    url = "/imc/assets/2.png";
  } else {
    categoria = "Você está obeso(a)";
    url = "/imc/assets/4.png";
  }

  console.log("IMC", imc.toFixed(2), categoria);

  // Atribuo os valores para cada elemento
  image.src = url;
  textoIMC.textContent = "IMC " + imc.toFixed(2);
  textoResultado.textContent = categoria;
}

// Função para voltar ao início e limpar os valores dos campos de entrada
function voltarAoInicio() {
  document.querySelector(".inicial").style.display = "flex";
  document.querySelector(".resultado").style.display = "none";

  limparValorInput();
}
