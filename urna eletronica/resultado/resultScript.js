// Função para processar e exibir os resultados
function displayResults() {
    const resultsContainer = document.getElementById('results');
    const voteCounts = JSON.parse(localStorage.getItem('voteCounts')) || {};

    // Ordenar candidatos por número de votos em ordem decrescente
    const sortedCandidates = Object.keys(voteCounts).sort((a, b) => voteCounts[b] - voteCounts[a]);

    // Criar a lista de resultados
    sortedCandidates.forEach((candidate, index) => {
        const votes = voteCounts[candidate];
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = `${index + 1}º Lugar: ${candidate} - ${votes} votos`;
        resultsContainer.appendChild(resultItem);
    });

    // Limpar os resultados do cache
    localStorage.removeItem('voteCounts');
}

// Inicialização ao carregar a página
window.onload = displayResults;
