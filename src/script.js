function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    const novoUsuario = {
        nome,
        email,
        dataNascimento,
    };

    fetch('http://localhost:3001/cadastrar-usuario', {  // Atualize a URL conforme necessário
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
            alert('Usuário cadastrado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar o usuário.');
        });
}