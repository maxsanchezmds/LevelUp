document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const mensajeError = document.getElementById('mensaje-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    mensajeError.style.display = 'none';

    const correo = form.correo.value.trim();
    const contrasena = form.contrasena.value;
    const cuentasFijas = [
      { correo: 'admin@admin.com', contrasena: 'admin', nombreCompleto: 'Administrador', rol: 'admin' },
      { correo: 'vendedor@vendedor.com', contrasena: 'vendedor', nombreCompleto: 'Vendedor', rol: 'vendedor' }
    ];
    const esCuentaFija = cuentasFijas.some(c => c.correo === correo && c.contrasena === contrasena);
    const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail(?:\.com)?)$/i;
    if (!esCuentaFija && (correo.length > 100 || !emailRegex.test(correo))) {
      mensajeError.textContent = 'El correo debe tener máximo 100 caracteres y ser @duoc.cl, @profesor.duoc.cl o @gmail';
      mensajeError.style.display = 'block';
      return;
    }
    if (contrasena.length < 4 || contrasena.length > 10) {
      mensajeError.textContent = 'La contraseña debe tener entre 4 y 10 caracteres';
      mensajeError.style.display = 'block';
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioValido = usuarios.find(user => user.correo === correo && user.contrasena === contrasena);

    if (usuarioValido) {
      usuarios.forEach(u => u.sesionActiva = false);
      usuarioValido.sesionActiva = true;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      window.location.href = 'index.html';
    } else if (esCuentaFija) {
      usuarios.forEach(u => u.sesionActiva = false);
      const cuenta = cuentasFijas.find(c => c.correo === correo);
      const existente = usuarios.find(u => u.correo === cuenta.correo);
      if (existente) {
        Object.assign(existente, cuenta, { sesionActiva: true });
      } else {
        usuarios.push({ ...cuenta, sesionActiva: true });
      }
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      window.location.href = 'index.html';
    } else {
      mensajeError.textContent = 'Datos incorrectos.';
      mensajeError.style.display = 'block';
    }
  });
});