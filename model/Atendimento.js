/*nome pessoa,cpf, horario de atendimento */ 
class Atendimento{
    #nome;
    #cpf;
    #horarioAtendimento;

    getCpf(){
        return this.#cpf;
    }
    getNome(){
        return this.#nome;
    }
    getHorarioAtendimento(){
        return this.#horarioAtendimento
    }

    constructor(nome, cpf, horarioAtendimento){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#horarioAtendimento = horarioAtendimento;
    }

    toString(){
        return "Nome: " +this.#nome
        +"\nCPF: " + this.#cpf
        +"\nHorário: " + this.#horarioAtendimento;
    }

}