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

    novoNome.value = "" ;// mostrar a fila
    novoCpf.value = "";
    inputNome.focus();
  } else {
    alert("Fila cheia!");
  }
  
}

function mostrarFila(){
    const filaElemento = document.getElementById("listFila");
    filaElemento.innerHTML="";

    for(let item of minhaFila){
      const listItem = document.createElement("li");
      listItem.textContent = item;
      filaElemento.appendChild(listItem);
    }
  }

function removerElemento() {
  const itemRemovido = minhaFila.dequeue();

  if (itemRemovido !== null) {
    mostrarFila(); // Atualiza o label na tela
    alert(`Removido: ${itemRemovido}`);
  } else {
    alert("A fila já está vazia!");
  }

}


function buscarElemento(){
  //pegar valor
  
  const elementoPesquisa = document.getElementById("txtnovoNome").value;
  let cont = 0;
  let flag = false;
  //percorrer fila
  for(let item of minhaFila){
    cont++;
     // if valor input === item da fila
    if (elementoPesquisa.toLowerCase() === item.getNome().toLowerCase()){
     //alert encontrado e mostra a posição
      flag = true;
      alert(item + " foi encontado na posição [" + cont + "] !");
      // return para encontar só um elemento
    }
  }
  if(!flag){
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