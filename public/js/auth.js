document.addEventListener('DOMContentLoaded', () => {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioActivo = usuarios.find(u => u.sesionActiva);
  const navList = document.querySelector('header nav ul');
  if (!navList) return;

  const loginItem = navList.querySelector('a[href="login.html"]')?.parentElement;
  const registroItem = navList.querySelector('a[href="registro.html"]')?.parentElement;

  if (usuarioActivo) {
    if (loginItem) loginItem.remove();
    if (registroItem) registroItem.remove();

    const userLi = document.createElement('li');
    const nameSpan = document.createElement('span');
    nameSpan.textContent = usuarioActivo.nombreCompleto;
    nameSpan.classList.add('btn-primary');
    userLi.appendChild(nameSpan);

    const logoutLi = document.createElement('li');
    const logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.textContent = 'Cerrar sesión';
    logoutBtn.classList.add('btn-primary');
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuarios.forEach(u => u.sesionActiva = false);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      window.location.href = 'index.html';
    });
    logoutLi.appendChild(logoutBtn);

    navList.appendChild(userLi);
    navList.appendChild(logoutLi);
  } else {
    if (loginItem) loginItem.style.display = '';
    if (registroItem) registroItem.style.display = '';
  }
});