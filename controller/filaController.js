const minhaFila = new Fila(5);

function adicionarElemento() {
  const novoElemento = document.getElementById("txtnovoNome");
  if (minhaFila.enqueue(novoElemento.value)) {
    mostrarFila(); 
    novoElemento.value = "" // mostrar a fila
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
    if (elementoPesquisa === item){
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