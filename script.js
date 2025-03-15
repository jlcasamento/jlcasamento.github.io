$(document).ready(function() {
    $('#envelope').click(function() {
        $(this).addClass('open');

        setTimeout(function() {
            $('#invitation').addClass('show');
            $('#envelope-container').addClass('minimized');

            // Inicia a criação contínua de corações
            startContinuousHearts();
        }, 1000);
    });

    // Função para criar corações continuamente
    function startContinuousHearts() {
        // Cria corações iniciais
        createHearts();

        // Continua criando corações em intervalos
        setInterval(function() {
            createHearts(5); // Cria 5 corações a cada intervalo
        }, 3000); // A cada 3 segundos
    }

    function createHearts(count = 20) {
        const container = $('.container');
        const documentHeight = $(document).height(); // Altura total do documento
        
        for (let i = 0; i < count; i++) {
            const heart = $('<div class="hearts">❤</div>');
            const left = Math.random() * 100;
            const size = Math.random() * 20 + 10;

            heart.css({
                left: left + '%',
                top: '-50px',
                opacity: Math.random() * 0.7 + 0.3,
                fontSize: size + 'px',
                position: 'fixed' // Alterado para fixed para funcionar com toda a página
            });

            $('body').append(heart); // Adicionando ao body em vez do container

            // Calculando a distância para animar até o final da página
            const distance = documentHeight + 50; // +50 para garantir que saia da tela

            heart.animate({
                top: distance + 'px'
            }, Math.random() * 5000 + 3000, function() {
                $(this).remove();
            });
        }
    }

    // Funcionalidade para copiar o número PIX
    $('#copyBtn').click(function() {
        const pixNumber = document.getElementById('pixNumber').innerText;
        navigator.clipboard.writeText(pixNumber).then(function() {
            // Mostra feedback visual
            const feedback = $('#copyFeedback');
            feedback.addClass('show');

            // Esconde o feedback após 2 segundos
            setTimeout(function() {
                feedback.removeClass('show');
            }, 2000);
        }).catch(function(err) {
            console.error('Erro ao copiar: ', err);
        });
    });
});