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
    return this.#fim === this.#elementos.length - 1;
  }

  isEmpty() {
    return this.#qtd === 0;
  }

  enqueue(elemento) {
    if (!this.isFull()) {
      this.#fim++;
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

    this.#qtd--;

    return this.#elementos[this.#inicio++];
  }

  first() {
    if (!isEmpty) return this.#elementos[this.#inicio];

    return null;
  }

  last() {
    if (!isEmpty) return this.#elementos[this.#fim];
    return null;
  }

  toString() {
    let resultado = "";
    for (let i = this.#inicio; i <= this.#fim; i++) {
      resultado += `${this.#elementos[i]} | `;
    }
    return resultado;
  }
}
