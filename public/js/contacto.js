document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const mensajeExito = document.getElementById('mensaje-exito');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    mensajeExito.style.display = 'block';
    setTimeout(() => {
      mensajeExito.style.display = 'none';
    }, 2000);
  });
});