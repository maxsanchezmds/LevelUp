document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const mensajeError = document.getElementById('mensaje-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    mensajeError.style.display = 'none';

    const correo = form.correo.value;
    const contrasena = form.contrasena.value;

    try {
      const response = await fetch('../assets/jsonData/data.json');
      const usuarios = await response.json();

      const usuarioValido = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

      if (usuarioValido) {
        window.location.href = 'index.html';
      } else {
        mensajeError.textContent = 'Datos incorrectos.';
        mensajeError.style.display = 'block';
      }
    } catch (error) {
      console.error('Error al cargar los datos de usuario:', error);
    }
  });
});