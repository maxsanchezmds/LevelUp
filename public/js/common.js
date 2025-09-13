document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    header.innerHTML = `
      <img src="../assets/LevelUpLogo.png" alt="LevelUp logo" class="logo">
      <nav>
        <ul>
          <li><a href="index.html#productos">Productos</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contacto.html">Contacto</a></li>
          <li><a href="login.html" class="btn-primary">Iniciar sesión</a></li>
          <li><a href="registro.html" class="btn-primary">Registrarse</a></li>
        </ul>
      </nav>
    `;
  }

  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `<p class="texto-secundario">&copy; 2024 LevelUp. Todos los derechos reservados.</p>`;
  }
});