# 📋 Sistema de Controle de Atendimento - Visualização de Fila

Este projeto é uma aplicação web interativa desenvolvida para visualizar e gerenciar o funcionamento de uma **Fila** (Queue), uma estrutura de dados fundamental na computação. O sistema simula um controle de atendimento ao cliente, utilizando o princípio **FIFO** (First In, First Out).

---

## 🚀 Funcionalidades

O sistema oferece uma interface completa para manipulação da estrutura em tempo real:

* **Enfileirar (Enqueue):** Adiciona novos clientes à fila com validação de Nome e CPF.
* **Atender (Dequeue):** Remove o primeiro da fila, exibe o tempo de espera e registra o atendimento.
* **Buscar:** Localiza a posição de um elemento na fila por nome ou CPF.
* **Painel de Chamadas:** Uma página externa (`painel.html`) que exibe o último cliente atendido via `localStorage`.
* **Validação de Limite:** A fila possui um tamanho fixo (default: 5), alertando quando está cheia.

---

## 🛠️ Tecnologias Utilizadas

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

* **Bootstrap 5:** Para estilização e responsividade.

---

## 🏗️ Arquitetura e Estrutura de Pastas

O projeto utiliza **Programação Orientada a Objetos (POO)** e separação de responsabilidades:

* **`model/Fila.js`**: Implementação da estrutura de dados com lógica de array circular e iteradores.
* **`model/Atendimento.js`**: Classe que define o objeto de atendimento (nome, CPF, data/hora).
* **`controller/filaController.js`**: Gerencia a interação entre a interface HTML e a lógica da Fila.
* **`util/`**: Contém funções auxiliares para máscaras de CPF, cálculos de tempo, preparação de dados e manipulação do localStorage.
* **`pages/painel.html`**: Interface de visualização para o público/cliente.

---

## 💡 Detalhes Técnicos da Fila

A classe `Fila` implementada utiliza atributos privados e métodos essenciais:

* **Iterador Circular:** O uso de `(this.#inicio + 1) % tamanho` garante que a fila aproveite espaços vazios no início do array após remoções.
* **Symbol.iterator:** Permite que a fila seja percorrida diretamente por um laço `for...of` na interface.

---

## 🔧 Como Rodar o Projeto

1. Faça o download ou clone o repositório.
2. Certifique-se de que a estrutura de pastas está preservada.
3. Abra o arquivo `index.html` em seu navegador.
4. Para visualizar o painel, clique no botão **"Painel de Atendimentos"** ou abra `pages/painel.html` em outra aba.

---

**Desenvolvido por IFSULDEMINAS - Campus Machado 🎓**