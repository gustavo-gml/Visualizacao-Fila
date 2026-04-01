/*nome pessoa,cpf, horario de atendimento */ 
class Atendimento{
    #nome;
    #cpf;
    #dataHorarioAtendimento;
    

    getCpf(){
        return this.#cpf;
    }
    getNome(){
        return this.#nome;
    }
    getHorarioAtendimento(){
        return this.#dataHorarioAtendimento;
    }

    constructor(nome, cpf){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataHorarioAtendimento = new Date();

    }

    toString(){
        
        const data = this.#dataHorarioAtendimento.toLocaleDateString('pt-BR');
        const hora = this.#dataHorarioAtendimento.toLocaleTimeString('pt-BR'); 

        return "Nome: " +this.#nome
        +"\nCPF: " + this.#cpf
        +"\nData: " + data
        +"\nHorário: " + hora;
    }


}