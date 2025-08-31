document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registro-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = form.correo.value.trim();

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail(?:\.com)?)$/i;
    if (correo.length > 100 || !emailRegex.test(correo)) {
      alert('El correo debe tener máximo 100 caracteres y ser @duoc.cl, @profesor.duoc.cl o @gmail');
      return;
    }
    if (password.length < 4 || password.length > 10) {
      alert('La contraseña debe tener entre 4 y 10 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      nombreCompleto: form.nombreCompleto.value,
      correo: correo,
      contrasena: password,
      telefono: form.telefono.value,
      region: form.region.value,
      comuna: form.comuna.value,
      sesionActiva: true
    };

    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuarios.forEach(u => u.sesionActiva = false);
      usuarios.push(userData);
      //Profesor, en el localstorage del explorador vamos a poner los usuario y las sesiones activas, mas q nada para no crear una conexion a la BD dado que esto no se solicita en la rubrica ni se mencionó en clases.
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      window.location.href = 'index.html';
    } catch (err) {
      console.error('Error al registrar usuario:', err);
    }
  });
});