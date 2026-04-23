const minhaFila = new FilaEncadeada();

const inputNome = document.getElementById("txtnovoNome");
const inputCpf = document.getElementById("txtcpf");
const containerFila = document.getElementById("listFila");
const mensagemAtendimento = document.getElementById("mensagem-remocao");

function adicionarElemento() {

  if (inputNome.value === "" || inputCpf.value.length < 14) {
    alert("Por favor, preencha o nome e o CPF corretamente!");
    return;

  }

  const novoElemento = new Atendimento(inputNome.value, inputCpf.value)

  if (minhaFila.enqueue(novoElemento)) {
    mostrarFila();

    inputNome.value = "";// mostrar a fila
    inputCpf.value = "";
    inputNome.focus();
  } else {
    alert("Fila cheia!");
  }

}

function mostrarFila() {
    // 1. Limpa a tela
    containerFila.innerHTML = "";

    let contador = 1;

    // 2. Itera sobre a fila
    for (const item of minhaFila) {
        // 3. Prepara os dados (Lógica)
        const dadosDestaLinha = prepararDadosItem(item, contador);
        
        // 4. Cria o elemento (UI)
        const htmlItem = criarElementoHTMLItem(dadosDestaLinha);
        
        // 5. Adiciona na tela
        containerFila.appendChild(htmlItem);
        
        contador++;
    }
}

function removerElemento() {
  const itemRemovido = minhaFila.dequeue();

  if (itemRemovido !== null) {
    mostrarFila(); // Atualiza o label na tela

    mensagemAtendimento.innerHTML = (`Próximo a ser atendido(a): \n${itemRemovido} Tempo de espera: ${calcularDiferencaHoras(
        itemRemovido.dataHorarioAtendimento.toLocaleTimeString('pt-BR'), 
        new Date().toLocaleTimeString('pt-BR')
    )}` );

    localStorage.setItem('ultimoAtendido', itemRemovido.nome);

    alert(`Removido: \n${itemRemovido}`);
  } else {
    alert("A fila já está vazia!");
  }

  

}


function buscarElemento() {

  let cont = 0;
  let flag = false;

  //validação para pesquisa vazia
  if(inputNome.value === "" && inputCpf.value == ""){
    alert("Digite dados para a realização da pesquisa.");
    return
  }

  //foreach
  for (let item of minhaFila) {
    cont++;
    // if valor input === item da fila
    if (inputNome.value.toLowerCase() === item.nome.toLowerCase() || inputCpf.value === item.cpf) {
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

