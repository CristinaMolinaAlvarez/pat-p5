const API_URL = "http://localhost:8080/api";
const ID_CARRITO = 1; // asumimos carrito 1

const productos = {
  1: "Arroz",
  2: "Pasta integral",
  3: "Pollo",
  4: "Salmón",
  5: "Huevos",
  6: "Garbanzos",
  7: "Lentejas",
  8: "Brócoli",
  9: "Zanahoria",
  10: "Calabacín",
  11: "Tomate",
  12: "Aguacate",
  13: "Leche",
  14: "Yogur",
  15: "Pan",
  16: "Aceite"
};

document.addEventListener("DOMContentLoaded", () => {

  if (document.querySelector("#tabla-carrito")) {
    cargarCarrito();
  }

  if (document.querySelector(".btn-add")) {
    inicializarBotones();
  }

});

// =========================
// CARGAR CARRITO
// =========================
async function cargarCarrito() {
  try {
    const response = await fetch(`${API_URL}/carrito/${ID_CARRITO}`);

    if (!response.ok) throw new Error("Error al cargar carrito");

    const carrito = await response.json();

    pintarCarrito(carrito);

  } catch (error) {
    console.error(error);
  }
}

// =========================
// PINTAR CARRITO
// =========================
function pintarCarrito(carrito) {
  const tbody = document.querySelector("#tabla-carrito tbody");
  const total = document.querySelector(".total");

  tbody.innerHTML = "";

  carrito.articulos.forEach(art => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${productos[art.idArticulo]}</td>
      <td>${art.precioUnitario}€</td>
      <td>${art.unidades}</td>
      <td><button class="btn-delete" data-id="${art.idArticuloLinea}">Eliminar</button></td>
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
  const botones = document.querySelectorAll(".btn-add");

  botones.forEach(btn => {
    btn.addEventListener("click", async () => {

      const id = btn.dataset.id;
      const precio = btn.dataset.precio;

      try {
        await fetch(`${API_URL}/carrito/${ID_CARRITO}/articulos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idArticulo: Number(id),
            precioUnitario: Number(precio),
            unidades: 1
          })
        });

        alert("Producto añadido");

      } catch (error) {
        console.error(error);
      }

    });
  });
}

// =========================
// ELIMINAR PRODUCTO
// =========================
function activarBotonesEliminar() {
  const botones = document.querySelectorAll(".btn-delete");

  botones.forEach(btn => {
    btn.addEventListener("click", async () => {

      const id = btn.dataset.id;

      try {
        await fetch(`${API_URL}/articulos/${id}`, {
          method: "DELETE"
        });

        cargarCarrito();

      } catch (error) {
        console.error(error);
      }

    });
  });
}