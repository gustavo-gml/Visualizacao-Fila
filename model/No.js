class No{
    #dado
    #proximo

    constructor (novoDado){
        this.#dado = novoDado
        this.#proximo = null
    }

    get dado(){
        return this.#proximo;
    }

    get proximo(){
        return this.#proximo;
    }

    set dado(novoDado){
        this.#dado = novoDado;
    }

    set proximo(novoProximo){
        this.#dado = novoDado;
    }

    toString(){
        return this.#dado.toString();
    }
}