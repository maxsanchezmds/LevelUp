document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const mensajeExito = document.getElementById('mensaje-exito');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail(?:\.com)?)$/i;
    if (nombre.length > 100) {
      alert('El nombre debe tener máximo 100 caracteres');
      return;
    }
    if (correo.length > 100 || !emailRegex.test(correo)) {
      alert('El correo debe tener máximo 100 caracteres y ser @duoc.cl, @profesor.duoc.cl o @gmail');
      return;
    }
    if (mensaje.length === 0 || mensaje.length > 500) {
      alert('El comentario es obligatorio y debe tener máximo 500 caracteres');
      return;
    }
    mensajeExito.style.display = 'block';
    setTimeout(() => {
        mensajeExito.style.display = 'none';
        form.reset();
    }, 2000);
  });
});