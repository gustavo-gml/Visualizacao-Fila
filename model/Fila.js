class Fila {
  #inicio;
  #fim;
  #qtd;
  #elementos;

  constructor(tamanho = 10) {
    this.#inicio = 0;
    this.#fim = -1;
    this.#qtd = 0;
    this.#elementos = new Array(tamanho);
  }

  isFull() {
    return this.#qtd === this.#elementos.length;
  }

  isEmpty() {
    return this.#qtd === 0;
  }

  enqueue(elemento) {
    if (!this.isFull()) {
      if (this.#elementos.length - 1 === this.#fim) this.#fim = 0
      else this.#fim++;

      this.#elementos[this.#fim] = elemento;
      this.#qtd++;
      console.log(
        `enqueue: início=${this.#inicio}, fim=${this.#fim}, qtd=${this.#qtd}`,
      );
      return true;
    }
    return false;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const removido = this.#elementos[this.#inicio];

    if(this.#inicio === this.#elementos.length - 1) this.#inicio = 0;
    else this.#inicio++;
    
    this.#qtd--;

    return removido;
  }

  first() {
    if (!this.isEmpty()) return this.#elementos[this.#inicio];

    return null;
  }

  last() {
    if (!this.isEmpty()) return this.#elementos[this.#fim];
    return null;
  }

  toString() {
    let resultado = "";
    for (let i = 0; i < this.#qtd; i++) {
      // teste de toString com módulo
      let indiceReal = (this.#inicio + i) % this.#elementos.length;
      resultado += `${this.#elementos[indiceReal]} | `;
    }
    return resultado;
  }
}
