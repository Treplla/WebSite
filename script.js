window.onload = function() {
    setTimeout(function() {
        var loading = document.getElementById('loading');
        loading.style.display = 'none';
        
        // Redireciona para a página "br"
        window.location.href = 'br';
    }, 5000); // Ajuste o tempo conforme necessário para sincronizar com a animação
};
