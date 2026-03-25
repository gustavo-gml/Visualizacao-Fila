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

    if (this.#inicio === this.#elementos.length - 1) this.#inicio = 0;
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

  /*toString() {
    let resultado = "";
    for (let i = 0; i < this.#qtd; i++) {
      // teste de toString com módulo
      let indiceReal = (this.#inicio + i) % this.#elementos.length;
      resultado += `${this.#elementos[indiceReal]} | `;
    }
    return resultado;
  }*/

  toString() {
    let resultado = "";
    // (1) Inicializar o índice no início da fila
    let index = this.#inicio;
    for (let i = 0; i < this.#qtd; i++) {
      resultado += `${this.#elementos[index]} | `;
      // (2) Verificar se chegou ao final do array
      if (index === this.#elementos.length - 1) {
        // (3) Voltar para o início
        index = 0;
      } else
        // (4) Avançar o índice
        index++;
    }
    return resultado;
  }

  [Symbol.iterator]() {
    let count = 0;
    let i = this.#inicio;
    const qtd = this.#qtd;
    const elementos = this.#elementos;
    const tamanho = elementos.length;
    return {
      next() {
        if (count < qtd) {
          const value = elementos[i];
          i = (i + 1) % tamanho;
          count++;
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }


}
