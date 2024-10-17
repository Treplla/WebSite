window.onload = function() {
    setTimeout(function() {
        var loading = document.getElementById('loading');
        loading.style.display = 'none';
        
        // Redireciona para a página home.html após ocultar o elemento de carregamento
        window.location.href = 'home.html';
    }, 5000); // Ajuste o tempo conforme necessário para sincronizar com a animação
};
