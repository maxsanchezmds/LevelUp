document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const mensajeError = document.getElementById('mensaje-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    mensajeError.style.display = 'none';

    const correo = form.correo.value;
    const contrasena = form.contrasena.value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);
    if (usuarioValido) {
      window.location.href = 'index.html';
    } else {
      mensajeError.textContent = 'Datos incorrectos.';
      mensajeError.style.display = 'block';
    }
  });
});