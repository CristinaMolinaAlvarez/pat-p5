const API_URL = "http://localhost:8080/api";

// ID fijo del carrito para un user
const ID_CARRITO = 1;

// Mapa para traducir id de producto a nombre
const productos = {
  1: "Arroz", 2: "Pasta integral", 3: "Pollo", 4: "Salmón",
  5: "Huevos", 6: "Garbanzos", 7: "Lentejas", 8: "Brócoli",
  9: "Zanahoria", 10: "Calabacín", 11: "Tomate", 12: "Aguacate",
  13: "Leche", 14: "Yogur", 15: "Pan", 16: "Aceite"
};


document.addEventListener("DOMContentLoaded", async () => {
  // Me aseguro de que existe el carrito en backend
  await asegurarCarrito();
  // Si estoy en la página del carrito, lo cargo
  if (document.querySelector("#tabla-carrito")) {
    cargarCarrito();
  activarBotonesAñadir();

});


async function cargarCarrito() {
  const res = await fetch(`${API_URL}/carrito/${ID_CARRITO}`);
  if (!res.ok) return;
  const carrito = await res.json();
  const tbody = document.querySelector("#tabla-carrito tbody");
  const total = document.querySelector(".total");
  // Si no existen, no hago nada
  if (!tbody || !total) return;

  // Limpio la tabla antes de pintar
  tbody.innerHTML = "";

  // Recorro todos los artículos del carrito
  carrito.articulos.forEach(a => {

    // Creo una fila
    const tr = document.createElement("tr");

    // Inserto el contenido dinámico
    tr.innerHTML = `
      <td>${productos[a.idArticulo]}</td>
      <td>${a.precioUnitario}€</td>
      <td>${a.unidades}</td>
      <td><button data-id="${a.idArticuloLinea}">Eliminar</button></td>
    `;

    // Asigno evento al botón eliminar
    tr.querySelector("button").onclick = async () => {
      await eliminarArticulo(a.idArticuloLinea);
      cargarCarrito();
    };

    // Añado la fila a la tabla
    tbody.appendChild(tr);
  });

  // Actualizo el total del carrito
  total.textContent = carrito.totalPrecio + "€";
}


// Función para asegurar que existe el carrito (POST si no existe)
async function asegurarCarrito() {

  // Intento obtener el carrito
  const res = await fetch(`${API_URL}/carrito/${ID_CARRITO}`);

  // Si no existe, lo creo
  if (!res.ok) {
    await fetch(`${API_URL}/carrito/${ID_CARRITO}`, {
      method: "POST"
    });
  }
}


// Función para añadir un artículo (POST)
async function añadirArticulo(id, precio) {

  // Llamada al endpoint POST /carrito/{id}/articulos
  await fetch(`${API_URL}/carrito/${ID_CARRITO}/articulos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idArticulo: id,
      precioUnitario: precio,
      unidades: 1
    })
  });

  // Si estoy en la página carrito, lo recargo
  if (document.querySelector("#tabla-carrito")) {
    cargarCarrito();
  }
}


// Función para eliminar un artículo (DELETE)
async function eliminarArticulo(idLinea) {

  // Llamada al endpoint DELETE /articulos/{id}
  await fetch(`${API_URL}/articulos/${idLinea}`, {
    method: "DELETE"
  });

}


// Activo los botones de añadir producto
function activarBotonesAñadir() {

  // Selecciono todos los botones con clase btn-add
  document.querySelectorAll(".btn-add").forEach(btn => {

    // Asigno el evento click
    btn.onclick = () => {

      // Obtengo el id del producto desde el HTML
      const id = Number(btn.dataset.id);

      // Obtengo el precio desde el HTML
      const precio = Number(btn.dataset.precio);

      // Llamo a la función para añadir el producto
      añadirArticulo(id, precio);
    };

  });
}

/*const API_URL = "http://localhost:8080/api";
const ID_CARRITO = 1;

const productos = {
  1: "Arroz", 2: "Pasta integral", 3: "Pollo", 4: "Salmón",
  5: "Huevos", 6: "Garbanzos", 7: "Lentejas", 8: "Brócoli",
  9: "Zanahoria", 10: "Calabacín", 11: "Tomate", 12: "Aguacate",
  13: "Leche", 14: "Yogur", 15: "Pan", 16: "Aceite"
};
document.addEventListener("DOMContentLoaded", async () => {

  await asegurarCarrito();

  if (document.querySelector(".btn-add")) {
    inicializarBotones();
  }

  if (document.querySelector("#tabla-carrito")) {
    cargarCarrito();
  }
});
// =========================
// ASEGURAR CARRITO
// =========================

async function asegurarCarrito() {
  try {
    const res = await fetch(`${API_URL}/carrito/${ID_CARRITO}`);

    if (!res.ok) {
      await fetch(`${API_URL}/carrito/${ID_CARRITO}`, {
        method: "POST"
      });
    }

  } catch (error) {
    console.error(error);
  }
}


// =========================
// CARGAR CARRITO
// =========================

async function cargarCarrito() {
  try {
    const res = await fetch(`${API_URL}/carrito/${ID_CARRITO}`);

    if (!res.ok) return;

    const carrito = await res.json();
    pintarCarrito(carrito);

  } catch (error) {
    console.error(error);
  }
}


// =========================
// PINTAR
// =========================

function pintarCarrito(carrito) {

  const tabla = document.querySelector("#tabla-carrito");
  if (!tabla) return;

  const tbody = tabla.querySelector("tbody");
  const total = document.querySelector(".total");

  if (!tbody || !total) return;

  tbody.innerHTML = "";

  carrito.articulos.forEach(a => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${productos[a.idArticulo]}</td>
      <td>${a.precioUnitario}€</td>
      <td>${a.unidades}</td>
      <td><button class="btn-delete" data-id="${a.idArticuloLinea}">Eliminar</button></td>
    `;

    tbody.appendChild(tr);
  });

  total.textContent = carrito.totalPrecio + "€";

  activarBotonesEliminar();
}


// =========================
// AÑADIR PRODUCTO
// =========================

function inicializarBotones() {

  document.querySelectorAll(".btn-add").forEach(btn => {

    btn.onclick = async () => {

      const id = Number(btn.dataset.id);
      const precio = Number(btn.dataset.precio);

      try {

        const res = await fetch(`${API_URL}/carrito/${ID_CARRITO}/articulos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idArticulo: id,
            precioUnitario: precio,
            unidades: 1
          })
        });

        if (!res.ok) return;

      } catch (error) {
        console.error(error);
      }
    };
  });
}


// =========================
// ELIMINAR PRODUCTO
// =========================

function activarBotonesEliminar() {

  document.querySelectorAll(".btn-delete").forEach(btn => {

    btn.onclick = async () => {

      const id = btn.dataset.id;

      try {

        const res = await fetch(`${API_URL}/articulos/${id}`, {
          method: "DELETE"
        });

        if (!res.ok) return;

        cargarCarrito();

      } catch (error) {
        console.error(error);
      }
    };
  });
}*/