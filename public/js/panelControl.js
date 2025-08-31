const DEFAULT_PRODUCTS = [
  {
    nombre: 'Catan',
    descripcion: 'Catan: Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.',
    precio: 29990,
    stock: 10
  },
  {
    nombre: 'Carcassonne',
    descripcion: 'Carcassonne: Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.',
    precio: 24990,
    stock: 10
  },
  {
    nombre: 'Controlador Inalámbrico Xbox Series X',
    descripcion: 'Controlador Inalámbrico Xbox Series X: Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.',
    precio: 59990,
    stock: 10
  },
  {
    nombre: 'Auriculares Gamer HyperX Cloud II',
    descripcion: 'Auriculares Gamer HyperX Cloud II: Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.',
    precio: 79990,
    stock: 10
  },
  {
    nombre: 'PlayStation 5',
    descripcion: 'PlayStation 5: La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.',
    precio: 549990,
    stock: 10
  },
  {
    nombre: 'PC Gamer ASUS ROG Strix',
    descripcion: 'PC Gamer ASUS ROG Strix: Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.',
    precio: 1299990,
    stock: 10
  },
  {
    nombre: 'Silla Gamer Secretlab Titan',
    descripcion: 'Silla Gamer Secretlab Titan: Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.',
    precio: 349990,
    stock: 10
  },
  {
    nombre: 'Mouse Gamer Logitech G502 HERO',
    descripcion: 'Mouse Gamer Logitech G502 HERO: Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.',
    precio: 49990,
    stock: 10
  },
  {
    nombre: 'Mousepad Razer Goliathus Extended Chroma',
    descripcion: 'Mousepad Razer Goliathus Extended Chroma: Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.',
    precio: 29990,
    stock: 10
  },
  {
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    descripcion: "Polera Gamer Personalizada 'Level-Up': Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.",
    precio: 14990,
    stock: 10
  }
];

function obtenerUsuarioActivo() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  return usuarios.find(u => u.sesionActiva);
}

function cargarProductos() {
  let productos = JSON.parse(localStorage.getItem('productos'));
  if (!productos || !productos.length) {
    productos = DEFAULT_PRODUCTS;
    localStorage.setItem('productos', JSON.stringify(productos));
  }
  return productos;
}

function guardarProductos(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

function renderOrdenes() {
  const contenedor = document.getElementById('section-ordenes');
  contenedor.innerHTML = '<h2>Órdenes de compra</h2>';
  const ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];
  if (ordenes.length === 0) {
    contenedor.innerHTML += '<p>No hay órdenes registradas.</p>';
    return;
  }
  ordenes.forEach((orden, idx) => {
    const div = document.createElement('div');
    div.classList.add('orden');
    const cliente = orden.cliente || {};
    let html = `<h3>Orden #${idx + 1}</h3>`;
    html += `<p><strong>Cliente:</strong> ${cliente.nombreCompleto || ''} (${cliente.correo || ''})</p>`;
    html += '<ul>';
    orden.items.forEach(item => {
      html += `<li>${item.name} x${item.quantity} - $${item.price.toLocaleString('es-CL')}</li>`;
    });
    html += '</ul>';
    html += `<p><strong>Total:</strong> $${orden.total.toLocaleString('es-CL')}</p>`;
    div.innerHTML = html;
    contenedor.appendChild(div);
  });
}

function renderUsuarios() {
  const lista = document.getElementById('usuarios-list');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.length === 0) {
    lista.innerHTML = '<p>No hay usuarios registrados.</p>';
    return;
  }
  let html = '<table class="table"><thead><tr><th>Nombre</th><th>Correo</th><th>Contraseña</th><th>Teléfono</th><th>Región</th><th>Comuna</th><th>Acciones</th></tr></thead><tbody>';
  usuarios.forEach((u, idx) => {
    html += `<tr><td>${u.nombreCompleto || ''}</td><td>${u.correo || ''}</td><td>${u.contrasena || ''}</td><td>${u.telefono || ''}</td><td>${u.region || ''}</td><td>${u.comuna || ''}</td><td><button class="btn-primary btn-eliminar-usuario" data-index="${idx}">Eliminar</button></td></tr>`;
  });
  html += '</tbody></table>';
  lista.innerHTML = html;
  lista.querySelectorAll('.btn-eliminar-usuario').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.dataset.index, 10);
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuarios.splice(idx, 1);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      renderUsuarios();
    });
  });
}

function renderProductos() {
  const lista = document.getElementById('stock-list');
  const productos = cargarProductos();
  let html = '<table class="table"><thead><tr><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead><tbody>';
  productos.forEach((p, idx) => {
    const stockMap = JSON.parse(localStorage.getItem('productStock')) || {};
    const stock = stockMap[p.nombre] ?? p.stock;
    html += `<tr>
      <td>${p.nombre}</td>
      <td>${p.descripcion}</td>
      <td><input type="number" id="precio-${idx}" class="input-number" value="${p.precio}"></td>
      <td><input type="number" id="stock-${idx}" class="input-number" value="${stock}"></td>
      <td><button class="btn-primary btn-guardar" data-index="${idx}">Guardar</button>
      <button class="btn-primary btn-eliminar-producto" data-index="${idx}">Eliminar</button></td>
    </tr>`;
  });
  html += '</tbody></table>';
  lista.innerHTML = html;
  lista.querySelectorAll('.btn-guardar').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.dataset.index, 10);
      const precio = parseInt(document.getElementById(`precio-${idx}`).value, 10);
      const stock = parseInt(document.getElementById(`stock-${idx}`).value, 10);
      const productos = cargarProductos();
      const stockMap = JSON.parse(localStorage.getItem('productStock')) || {};
      productos[idx].precio = precio;
      productos[idx].stock = stock;
      stockMap[productos[idx].nombre] = stock;
      guardarProductos(productos);
      localStorage.setItem('productStock', JSON.stringify(stockMap));
      renderProductos();
    });
  });
  lista.querySelectorAll('.btn-eliminar-producto').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.dataset.index, 10);
      const productos = cargarProductos();
      const nombre = productos[idx].nombre;
      productos.splice(idx, 1);
      guardarProductos(productos);
      const stockMap = JSON.parse(localStorage.getItem('productStock')) || {};
      delete stockMap[nombre];
      localStorage.setItem('productStock', JSON.stringify(stockMap));
      renderProductos();
    });
  });
}

function initForms() {
  const formUsuario = document.getElementById('form-usuario');
  formUsuario.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formUsuario));
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ ...data, sesionActiva: false });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    formUsuario.reset();
    renderUsuarios();
  });

  const formProducto = document.getElementById('form-producto');
  formProducto.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formProducto));
    data.precio = parseInt(data.precio, 10);
    data.stock = parseInt(data.stock, 10);
    const productos = cargarProductos();
    productos.push(data);
    guardarProductos(productos);
    const stockMap = JSON.parse(localStorage.getItem('productStock')) || {};
    stockMap[data.nombre] = data.stock;
    localStorage.setItem('productStock', JSON.stringify(stockMap));
    formProducto.reset();
    renderProductos();
  });
}

function initMenu(esAdmin) {
  const btnOrdenes = document.getElementById('btn-ordenes');
  const btnUsuarios = document.getElementById('btn-usuarios');
  const btnStock = document.getElementById('btn-stock');
  const sections = {
    ordenes: document.getElementById('section-ordenes'),
    usuarios: document.getElementById('section-usuarios'),
    stock: document.getElementById('section-stock')
  };

  function show(section) {
    Object.values(sections).forEach(sec => sec.classList.add('hidden'));
    sections[section].classList.remove('hidden');
    if (section === 'ordenes') renderOrdenes();
    if (section === 'usuarios') renderUsuarios();
    if (section === 'stock') renderProductos();
  }

  btnOrdenes.addEventListener('click', () => show('ordenes'));
  btnUsuarios.addEventListener('click', () => {
    if (!esAdmin) return; show('usuarios');
  });
  btnStock.addEventListener('click', () => {
    if (!esAdmin) return; show('stock');
  });

  if (!esAdmin) {
    btnUsuarios.classList.add('disabled');
    btnUsuarios.disabled = true;
    btnStock.classList.add('disabled');
    btnStock.disabled = true;
  }

  show('ordenes');
}

document.addEventListener('DOMContentLoaded', () => {
  const usuario = obtenerUsuarioActivo();
  const esAdmin = usuario && (usuario.rol === 'admin' || usuario.correo === 'admin@admin.com');
  initMenu(esAdmin);
  if (esAdmin) initForms();
});