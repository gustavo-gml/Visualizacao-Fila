/*nome pessoa,cpf, horario de atendimento */ 
class Atendimento{
    #nome;
    #cpf;
    #dataHorarioAtendimento;
    

    get cpf(){
        return this.#cpf;
    }
    get nome(){
        return this.#nome;
    }
    get dataHorarioAtendimento(){
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
        +"\nData: " + data
        +"\nHorário: " + hora;
    }


}