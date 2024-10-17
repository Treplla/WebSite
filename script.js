// scripts.js

// Configurações do Discord OAuth2
const CLIENT_ID = '1259321234433376348'; // Substitua pelo seu Client ID
const REDIRECT_URI = 'https://akon.pro'; // Atualizado para sua URL de produção
const SCOPE = 'identify';
const RESPONSE_TYPE = 'token';
const OAUTH2_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

// Seletores de elementos
const loginButton = document.getElementById('login-button');
// Removido: loginButtonHero, pois o botão foi removido do HTML
const userInfoDiv = document.getElementById('user-info');
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const logoutContainer = document.getElementById('logout-container');

/**
 * Iniciar o processo de login com Discord
 */
function iniciarLoginDiscord() {
  window.location.href = OAUTH2_URL;
}

/**
 * Extrair o token de acesso do URL
 */
function obterTokenDoURL() {
  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    return params.get('access_token');
  }
  return null;
}

/**
 * Buscar informações do usuário no Discord
 */
async function buscarUserInfo(token) {
  try {
    const response = await fetch('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Falha ao obter informações do usuário');
    }
    const user = await response.json();
    return {
      username: `${user.username}#${user.discriminator}`,
      avatarURL: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://via.placeholder.com/40'
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Exibir as informações do usuário na navbar
 */
function mostrarUserInfo(user) {
  userInfoDiv.innerHTML = `
    <img src="${user.avatarURL}" alt="Avatar">
    <span class="username">${user.username}</span>
  `;
  
  // Exibir o botão de Logout no menu lateral
  logoutContainer.classList.remove('hidden');

  // Ocultar o botão de login após o login
  if (loginButton) loginButton.style.display = 'none';
}

/**
 * Processar o login após redirecionamento do Discord
 */
async function processarLogin() {
  const token = obterTokenDoURL();
  if (token) {
    const user = await buscarUserInfo(token);
    if (user) {
      // Salva os dados no localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access_token', token);
      // Remove o token da URL para limpeza
      window.history.replaceState({}, document.title, REDIRECT_URI);
      // Atualiza a UI
      mostrarUserInfo(user);
    } else {
      alert('Erro ao obter informações do usuário.');
    }
  } else {
    // Verifica se já há informação do usuário no localStorage
    const userInfo = localStorage.getItem('user');
    const accessToken = localStorage.getItem('access_token');

    if (userInfo && accessToken) {
      const user = JSON.parse(userInfo);
      mostrarUserInfo(user);
    } else {
      // Adiciona o event listener para o botão de login na navbar
      if (loginButton) loginButton.addEventListener('click', iniciarLoginDiscord);
      // Removido: loginButtonHero, pois o botão foi removido
    }
  }
}

/**
 * Realizar o logout
 */
function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('access_token');
  location.reload();
}

/**
 * Alternar a visibilidade da sidebar
 */
function alternarSidebar() {
  sidebar.classList.toggle('active');
}

/**
 * Inicialização quando o DOM está totalmente carregado
 */
document.addEventListener('DOMContentLoaded', () => {
  processarLogin();
  if (menuIcon) menuIcon.addEventListener('click', alternarSidebar);
  
  // Adiciona o event listener para o botão de logout
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
});
