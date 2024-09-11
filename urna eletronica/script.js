// Objeto global para contar votos por candidato
const voteCounts = {};

// Função para salvar os dados no cache
function saveToCache(name, party, proposal, date, local) {
    const candidates = JSON.parse(localStorage.getItem('candidates')) || [];
    candidates.push({ name, party, proposal, date, local });
    localStorage.setItem('candidates', JSON.stringify(candidates));
}

// Função para carregar os dados armazenados no cache e atualizar a interface
function loadCachedData() {
    const resultsList = document.getElementById('resultsList');
    const candidatesContainer = document.getElementById('candidates');
    const candidates = JSON.parse(localStorage.getItem('candidates')) || [];

    // Limpar listas de resultados e candidatos
    if (resultsList) {
        resultsList.innerHTML = '';
        candidates.forEach(candidate => {
            // Adicionar à lista de resultados
            const listItem = document.createElement('li');
            listItem.textContent = `Nome: ${candidate.name}, Partido: ${candidate.party}, Proposta: ${candidate.proposal}, Data: ${candidate.date}, Local: ${candidate.local}`;
            resultsList.appendChild(listItem);
        });
    }

    if (candidatesContainer) {
        candidatesContainer.innerHTML = '';
        candidates.forEach(candidate => {
            // Adicionar aos cartões de candidatos
            const candidateCard = document.createElement('div');
            candidateCard.className = 'candidate-card';
            candidateCard.dataset.name = candidate.name;
            candidateCard.innerHTML = `
                <h3>${candidate.name}</h3>
                <p>${candidate.party}</p>
                <p>${candidate.proposal}</p>
            `;
            candidateCard.addEventListener('click', function() {
                document.querySelectorAll('.candidate-card').forEach(card => card.classList.remove('selected'));
                candidateCard.classList.add('selected');
                document.querySelector('#voto').value = candidate.name;
            });
            candidatesContainer.appendChild(candidateCard);
        });
    }
}

// Função para confirmar o voto
function confirmVote() {
    const selectedCandidate = document.querySelector('.candidate-card.selected');
    if (selectedCandidate) {
        const candidateName = selectedCandidate.dataset.name;

        // Recupera o contador
        let voteCounts = JSON.parse(localStorage.getItem('voteCounts')) || {};

        // Inicializa o contador
        if (!voteCounts[candidateName]) {
            voteCounts[candidateName] = 0;
        }

        // Incrementa o contador para o candidato selecionado
        voteCounts[candidateName]++;
        localStorage.setItem('voteCounts', JSON.stringify(voteCounts));

        // Limpar a seleção visual
        selectedCandidate.classList.remove('selected');

        alert(`Você votou em ${candidateName}`);
    } else {
        alert('Por favor, selecione um candidato!');
    }
}


// Função para encerrar a votação
function endVoting() {
    const password = prompt('Digite a senha para encerrar a votação:');
    if (password === '123456') {
        // Redirecionar para a página de resultados
        window.location.href = '../resultado/resultado.html';
    } else {
        alert('Senha incorreta!');
    }
}


// Manipulador de envio do formulário de cadastro
function handleCandidateFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const party = document.getElementById('party').value;
    const proposal = document.getElementById('proposal').value;
    const date = document.getElementById('date').value;
    const local = document.getElementById('local').value;

    if (!party) {
        document.getElementById('message').textContent = 'Por favor, selecione um partido escoteiro!';
        return;
    }

    saveToCache(name, party, proposal, date, local);

    document.getElementById('candidateForm').reset();
    document.getElementById('message').textContent = 'Candidato cadastrado com sucesso!';
}

// Manipulador para confirmar voto
function setupConfirmVoteHandler() {
    const confirmVoteButton = document.getElementById('confirmVote');
    if (confirmVoteButton) {
        confirmVoteButton.addEventListener('click', confirmVote);
    }
}

// Manipulador para encerrar a votação
function setupEndVotingHandler() {
    const endVotingButton = document.getElementById('endVoting');
    if (endVotingButton) {
        endVotingButton.addEventListener('click', endVoting);
    }
}

// Inicialização do JavaScript com base na página
function initialize() {
    const isOnRegistrationPage = document.getElementById('candidateForm');
    const isOnVotingPage = document.getElementById('candidates');

    if (isOnRegistrationPage) {
        document.getElementById('candidateForm').addEventListener('submit', handleCandidateFormSubmit);
    }

    if (isOnVotingPage) {
        loadCachedData();
        setupConfirmVoteHandler();
        setupEndVotingHandler();
    }
}
window.onload = initialize;
