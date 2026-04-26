const filaNormal = new FilaEncadeada();
const filaPrioritaria = new FilaEncadeada();
const inputNome = document.getElementById("txtnovoNome");
const inputCpf = document.getElementById("txtcpf");
const inputNascimento = document.getElementById("txtidade")
const containerFilaNormal = document.getElementById("listFilaNormal");
const containerFilaPrioritaria = document.getElementById("listFilaPrioritaria");
const mensagemAtendimento = document.getElementById("mensagem-remocao");

let qtdAtendimentoPrioritario = 0;

// Configuração Inicial de Datas
const hoje = new Date();
const dataLimiteMin = new Date();
dataLimiteMin.setFullYear(hoje.getFullYear() - 120);
const maxDataStr = hoje.toISOString().split("T")[0];
const minDataStr = dataLimiteMin.toISOString().split("T")[0];

inputNascimento.setAttribute("max", maxDataStr);
inputNascimento.setAttribute("min", minDataStr);


function limparCampos() {
    inputNome.value = "";
    inputCpf.value = "";
    inputNascimento.value = "";
    inputNome.focus();
}


function adicionarElemento() {

  if(!validarEntrada(maxDataStr, minDataStr)){
    return
  }

  const novoElemento = new Atendimento(inputNome.value, inputCpf.value , new Date(inputNascimento.value));

  if(novoElemento.idade() < 60){
    filaNormal.enqueue(novoElemento)
  } else{
    filaPrioritaria.enqueue(novoElemento)
  }
    mostrarFila(); // mostrar a fila
    limparCampos();
}


function mostrarFila() {
    // 1. Limpa os dois containers
    containerFilaNormal.innerHTML = "";
    containerFilaPrioritaria.innerHTML = "";
    
    let contadorPrioritario = 1;
    let contadorNormal = 1;

    // 2. Itera sobre a fila prioritária e adiciona no container de prioridade
    for (const item of filaPrioritaria) {
        const dadosDestaLinha = prepararDadosItem(item, contadorPrioritario);
        const htmlItem = criarElementoHTMLItem(dadosDestaLinha);
        containerFilaPrioritaria.appendChild(htmlItem);
        contadorPrioritario++;
    }

    // 3. Itera sobre a fila normal e adiciona no container normal
    for (const item of filaNormal) {
        const dadosDestaLinha = prepararDadosItem(item, contadorNormal);
        const htmlItem = criarElementoHTMLItem(dadosDestaLinha);
        containerFilaNormal.appendChild(htmlItem);
        contadorNormal++;
    }
}


function removerElemento() {
  let itemRemovido;
  if((qtdAtendimentoPrioritario === 3 && !filaNormal.isEmpty()) || filaPrioritaria.isEmpty()){
    itemRemovido = filaNormal.dequeue();
    qtdAtendimentoPrioritario = 0
  }
  else{
    itemRemovido = filaPrioritaria.dequeue();
    qtdAtendimentoPrioritario++;
  }

  
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
    const termoBuscaNome = inputNome.value.toLowerCase();
    const termoBuscaCpf = inputCpf.value;

    if(termoBuscaNome === "" && termoBuscaCpf === ""){
        alert("Digite dados para a realização da pesquisa.");
        return;
    }

    // Função auxiliar para evitar repetição de código na busca
    const procurarNaLista = (fila, nomeLista) => {
        let p = 1;
        for (let item of fila) {
            if (termoBuscaNome === item.nome.toLowerCase() || termoBuscaCpf === item.cpf) {
                alert(`${item}\nEncontrado na ${nomeLista} - Posição: [${p}]`);
                flag = true;
            }
            p++;
        }
    };

    procurarNaLista(filaPrioritaria, "Fila Prioritária");
    procurarNaLista(filaNormal, "Fila Normal");

    if (!flag) alert("Item não encontrado!");
    limparCampos();
}

