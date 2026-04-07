function atualizarUltimoAtendimento() {
    const ultimoJson = localStorage.getItem('ultimoAtendido')
    const atual = document.getElementById("atendimento")

    if (ultimoJson !== null) {
        atual.textContent = JSON.stringify(ultimoJson);
        return
    }
    atual.textContent = "Aguardando..."
}
atualizarUltimoAtendimento();

setInterval(atualizarUltimoAtendimento, 1000)