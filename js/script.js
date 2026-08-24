/*
 * Gustavo Rodolfo Leite dos Reis
 * RA: 5605886
 * Curriculum Vitae - HTML5, CSS3 e JavaScript
 */



// 1. Lógica do Formulário (Validação)
const form = document.getElementById('formContato');

form.addEventListener('submit', function(event) {
    // Evita que a página recarregue ao clicar em enviar
    event.preventDefault(); 

    // Capturando os campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Capturando os spans de erro
    const erroNome = document.getElementById('erroNome');
    const erroEmail = document.getElementById('erroEmail');
    const erroMensagem = document.getElementById('erroMensagem');
    const sucessoMensagem = document.getElementById('sucessoMensagem');

    // Limpando mensagens anteriores
    erroNome.innerText = '';
    erroEmail.innerText = '';
    erroMensagem.innerText = '';
    sucessoMensagem.innerText = '';

    let formValido = true;

    // Validando o campo Nome, diferente de vazio
    if (nome === '') {
        erroNome.innerText = 'Por favor, preencha seu nome.';
        formValido = false;
    }

    // Validando o campo E-mail, diferente de vazio e contendo "@" e "."
    if (email === '') {
        erroEmail.innerText = 'Por favor, preencha seu e-mail.';
        formValido = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        erroEmail.innerText = 'Por favor, insira um e-mail válido.';
        formValido = false;
    }

    // Validando o campo Mensagem, diferente de vazio
    if (mensagem === '') {
        erroMensagem.innerText = 'Por favor, escreva uma mensagem.';
        formValido = false;
    }

    // Se tudo estiver certo, simula o envio e apresenta a mensagem de sucesso
    if (formValido) {
        sucessoMensagem.innerText = 'Mensagem enviada com sucesso!';
        form.reset(); // Limpa os campos
    }
});



// 2. Lógica do Menu Dinâmico (Scrollspy) e Margem Dinâmica
const sessoes = document.querySelectorAll('.sessao-conteudo');
const linksMenu = document.querySelectorAll('.nav-link');
const navMenu = document.getElementById('menu');

// Função para aplicar a margem correta nas seções para o clique nativo
function ajustarMargemDasSessoes() {
    // Mede a altura exata do menu em pixels no momento atual
    const alturaDoMenu = navMenu.clientHeight; 
    
    // Injeta a margem dinamicamente no CSS de cada seção
    sessoes.forEach(sessao => {
        sessao.style.scrollMarginTop = (alturaDoMenu + 20) + 'px';
    });
}

// Executa ao carregar a página e toda vez que a janela for redimensionada
ajustarMargemDasSessoes();
window.addEventListener('resize', ajustarMargemDasSessoes);

// Monitora a rolagem para pintar o botão ativo
window.addEventListener('scroll', () => {
    let sessaoAtual = '';
    const alturaDoMenu = navMenu.clientHeight; // Pega a altura dinâmica aqui também

    // Verifica qual seção está passando pela tela
    sessoes.forEach(sessao => {
        const sessaoTop = sessao.offsetTop;
        
        // Cálculo dinâmico: Topo da seção menos a altura atual do menu
        if (scrollY >= (sessaoTop - alturaDoMenu - 30)) {
            sessaoAtual = sessao.getAttribute('id');
        }
    });

    // Remove a classe 'ativo' de todos e adiciona no link correto
    linksMenu.forEach(link => {
        link.classList.remove('ativo');
        
        if (sessaoAtual !== '' && link.getAttribute('href') === '#' + sessaoAtual) {
            link.classList.add('ativo');
        }
    });
});



// 3. Theme Toggle Logic (Dark/Light Mode)
const themeToggleBtn = document.getElementById('themeToggleBtn');
const bodyElement = document.body;

// Verifica se o usuário já havia escolhido o tema escuro antes
const savedTheme = localStorage.getItem('appTheme');
if (savedTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    themeToggleBtn.innerText = '☀️ Tema Claro';
}

// Evento de clique para alternar os temas
themeToggleBtn.addEventListener('click', () => {
    // A função toggle liga/desliga a classe 'dark-mode' do body
    bodyElement.classList.toggle('dark-mode');
    
    let currentTheme = 'light';
    
    // Verifica se a classe foi adicionada para mudar o texto e salvar a preferência
    if (bodyElement.classList.contains('dark-mode')) {
        currentTheme = 'dark';
        themeToggleBtn.innerText = '☀️ Tema Claro';
    } else {
        themeToggleBtn.innerText = '🌙 Tema Escuro';
    }
    
    // Salva a preferência atual no navegador
    localStorage.setItem('appTheme', currentTheme);
});



// 4. Máscara do Campo de Telefone
const campoTelefone = document.getElementById('telefone');

if (campoTelefone) {
    // O evento 'input' é disparado a cada tecla digitada
    campoTelefone.addEventListener('input', function (event) {
        let numero = event.target.value;
        
        // Remove tudo que não for número (uso de Regex)
        numero = numero.replace(/\D/g, ""); 
        
        // Usado o 'slice' para limitar a 11 dígitos
        if (numero.length > 11) {
            numero = numero.slice(0, 11);
        }

        // Aplica a formatação dinamicamente conforme a quantidade de números
        if (numero.length > 10) {
            // Formato para celular: (XX) XXXXX-XXXX
            numero = numero.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (numero.length > 6) {
            // Formato para fixo: (XX) XXXX-XXXX
            numero = numero.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (numero.length > 2) {
            // Formato inicial: (XX) X
            numero = numero.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
        }
        
        // Atualiza o valor do campo na tela
        event.target.value = numero;
    });
}