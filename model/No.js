class No{
    #dado
    #proximo

    constructor (novoDado){
        this.#dado = novoDado
        this.#proximo = null
    }

    get dado(){
        return this.#dado;
    }

    get proximo(){
        return this.#proximo;
    }

    set dado(novoDado){
        this.#dado = novoDado;
    }

    set proximo(novoProximo){
        this.#proximo = novoProximo;
    }

    toString(){
        return this.#dado.toString();
    }
}