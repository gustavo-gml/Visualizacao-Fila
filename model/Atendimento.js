/*nome pessoa,cpf, horario de atendimento */ 
class Atendimento{
    #nome;
    #cpf;
    #dataHorarioAtendimento;
    #dataNascimento;
    

    get cpf(){
        return this.#cpf;
    }
    get nome(){
        return this.#nome;
    }
    get dataHorarioAtendimento(){
        return this.#dataHorarioAtendimento;
    }
    get dataNascimento(){
        return this.#dataNascimento;
    }

    constructor(nome, cpf, dataNascimento){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataHorarioAtendimento = new Date();
        this.#dataNascimento =  dataNascimento
    }

    idade(){
        return  new Date().getFullYear() - this.#dataNascimento.getFullYear(); 
    }

    toString(){
        
        const data = this.#dataHorarioAtendimento.toLocaleDateString('pt-BR');
        const hora = this.#dataHorarioAtendimento.toLocaleTimeString('pt-BR'); 
        
        let informacoes = `Nome: ${this.#nome}\nData: ${data}\nHorário: ${hora}\nIdade: ${this.idade()}`;

        return informacoes;
    }


}