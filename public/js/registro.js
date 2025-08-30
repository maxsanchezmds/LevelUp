document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registro-form');

  form.addEventListener('submit', async (e) => {
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
      await fetch('/json/usuario.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData, null, 2)
      });
      window.location.href = 'index.html';
    } catch (err) {
      console.error('Error al registrar usuario:', err);
    }
  });
});