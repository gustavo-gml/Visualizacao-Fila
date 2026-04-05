const minhaFila = new Fila(5);

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

function mascaraCPF() {

  let valor = inputCpf.value.replace(/\D/g, ""); // Remove o que não é número

  if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 números

  // Aplica a formatação
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  inputCpf.value = valor; // Devolve o valor formatado para o campo
}


// Retorna apenas a classe CSS com base nos minutos
function obterClasseCorPorTempo(horas, minutos) {
    if (horas > 0 || minutos >= 5) {
        return "bg-danger";
    }
    if (minutos >= 2) {
        return "bg-warning text-dark";
    }
    return "bg-success";
}

// Formata os dados do item para um objeto mais fácil de usar na tela
function prepararDadosItem(item, posicao) {
    const horaAtendimento = item.dataHorarioAtendimento.toLocaleTimeString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR');
    const tempoDeFila = calcularDiferencaHoras(horaAtendimento, horaAtual);
    
    const [h, m] = tempoDeFila.split(':').map(Number);
    const corBadge = obterClasseCorPorTempo(h, m);

    return {
        posicao: `${posicao}º Atendimento`,
        tempo: tempoDeFila,
        cor: corBadge,
        descricao: item.toString()
    };
}

function criarElementoHTMLItem(dados) {
    const li = document.createElement("li");
    
    li.classList.add("list-group-item", "mb-2", "shadow-sm");

    li.innerHTML = `
        <span class="badge rounded-pill ${dados.cor} mb-2">
            Espera: ${dados.tempo}
        </span>
        <div>
            <strong>${dados.posicao}</strong>
            ${dados.descricao}
        </div>
    `;
    return li;
}

function calcularDiferencaHoras(hora1, hora2) {
    const [h1, m1, s1] = hora1.split(':').map(Number);
    const [h2, m2, s2] = hora2.split(':').map(Number);
    const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
    const horas = Math.floor(diferencaSegundos / 3600);
    const minutos = Math.floor((diferencaSegundos % 3600) / 60);
    const segundos = diferencaSegundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}