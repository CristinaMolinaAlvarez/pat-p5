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
  }
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
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${productos[a.idArticulo]}</td>
      <td>${a.precioUnitario}€</td>
      <td>${a.unidades}</td>
      <td><button data-id="${a.idArticuloLinea}">Eliminar</button></td>
    `;
    tr.querySelector("button").onclick = async () => {
      await eliminarArticulo(a.idArticuloLinea);
      cargarCarrito();
    };
    tbody.appendChild(tr);
  });
  total.textContent = carrito.totalPrecio + "€";
}


async function asegurarCarrito() {
  const res = await fetch(`${API_URL}/carrito/${ID_CARRITO}`);

  if (!res.ok) {
    await fetch(`${API_URL}/carrito/${ID_CARRITO}`, {
      method: "POST"
    });
  }
}


async function añadirArticulo(id, precio) {
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

  if (document.querySelector("#tabla-carrito")) {
    cargarCarrito();
  }
}


async function eliminarArticulo(idLinea) {
  await fetch(`${API_URL}/articulos/${idLinea}`, {
    method: "DELETE"
  });

}


function activarBotonesAñadir() {
  document.querySelectorAll(".btn-add").forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      // Obtengo el precio desde el HTML
      const precio = Number(btn.dataset.precio);
      // Llamo a la función para añadir el producto
      añadirArticulo(id, precio);
    };

  });
}
