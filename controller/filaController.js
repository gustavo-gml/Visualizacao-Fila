import {calcularDiferencaHoras, obterDataAtual, obterHoraAtual} from '../util/utils.js';

window.adicionarElemento = adicionarElemento;
window.removerElemento = removerElemento;
window.buscarElemento = buscarElemento;
window.mascaraCPF = mascaraCPF;

const minhaFila = new Fila(5);

function adicionarElemento() {
  const novoNome = document.getElementById("txtnovoNome");
  const novoCpf = document.getElementById("txtcpf");

  if (novoNome.value === "" || novoCpf.value.length < 14) {
    alert("Por favor, preencha o nome e o CPF corretamente!");
    return;
  }

  const novoElemento = new Atendimento(novoNome.value, novoCpf.value, new Date())

  if (minhaFila.enqueue(novoElemento)) {
    mostrarFila();

    novoNome.value = "";// mostrar a fila
    novoCpf.value = "";
    novoNome.focus();
  } else {
    alert("Fila cheia!");
  }

}

function mostrarFila() {
  const filaElemento = document.getElementById("listFila");
  filaElemento.innerHTML = "";

  let count = 1;
  for (let item of minhaFila) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "mb-2", "shadow-sm");

    const horaAtendimento = item.getHorarioAtendimento().toLocaleTimeString('pt-BR');
    const horaAtual = obterHoraAtual()
    const tempoDeFila = calcularDiferencaHoras(horaAtendimento, horaAtual)

    const [horas, minutos, segundos] = tempoDeFila.split(':').map(Number);

    let corBadge = "bg-success"; 
    if (minutos >= 5 || horas > 0) {
      corBadge = "bg-danger";  
    } else if (minutos >= 2) {
      corBadge = "bg-warning text-dark"; 
    }

    const badgeTempo = document.createElement("span");
    badgeTempo.className = `badge rounded-pill ${corBadge} mb-2`;
    badgeTempo.innerText = `Espera: ${tempoDeFila}`;

    const textoAtendimento = document.createElement("div");
    textoAtendimento.innerText = `${count++}º Atendimento\n${item}`;
    
   
   /* listItem.textContent = (count++) +"º - Espera: "+ tempoDeFila +"\n" + item;
    filaElemento.appendChild(listItem);*/

    listItem.appendChild(badgeTempo);
    listItem.appendChild(textoAtendimento);
    filaElemento.appendChild(listItem);
  }
}

function removerElemento() {
  const itemRemovido = minhaFila.dequeue();

  if (itemRemovido !== null) {
    mostrarFila(); // Atualiza o label na tela
    alert(`Removido: \n${itemRemovido}`);
  } else {
    alert("A fila já está vazia!");
  }

}


function buscarElemento() {
  //pegar valor
  const nomePesquisa = document.getElementById("txtnovoNome").value;
  const cpfPesquisa = document.getElementById("txtcpf").value;

  let cont = 0;
  let flag = false;

  //validação para pesquisa vazia
  if(nomePesquisa === "" && cpfPesquisa == ""){
    alert("Digite dados para a realização da pesquisa.");
    return
  }

  //foreach
  for (let item of minhaFila) {
    cont++;
    // if valor input === item da fila
    if (nomePesquisa.toLowerCase() === item.getNome().toLowerCase() || cpfPesquisa === item.getCpf()) {
      //alert encontrado e mostra a posição
      flag = true;
      alert(item + "\nfoi encontado na posição [" + cont + "] !");

      // return para encontar só um elemento
    }
  }
  if (!flag) {
    alert("Item não encontrado !");
  }



}

function mascaraCPF() {
  const inputCpf = document.getElementById("txtcpf");
  let valor = inputCpf.value.replace(/\D/g, ""); // Remove o que não é número

  if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 números

  // Aplica a formatação
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  inputCpf.value = valor; // Devolve o valor formatado para o campo
}