document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registro-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      nombreCompleto: form.nombreCompleto.value,
      correo: form.correo.value,
      contrasena: password,
      telefono: form.telefono.value,
      region: form.region.value,
      comuna: form.comuna.value,
      sesionActiva: true
    };

    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuarios.push(userData);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      window.location.href = 'index.html';
    } catch (err) {
      console.error('Error al registrar usuario:', err);
    }
  });
});