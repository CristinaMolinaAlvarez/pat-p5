<<<<<<< HEAD
# Práctica 2 – API REST Carrito

## Descripción
Este proyecto implementa una API REST sencilla usando Spring Boot que permite realizar operaciones CRUD (Create, Read, Update, Delete) sobre el recurso **Carrito**, modelando un caso simplificado de e-commerce.

Cada carrito contiene un único producto, tal y como se indica en el enunciado de la práctica.

La persistencia se simula mediante un HashMap en memoria.

---

## Modelo de datos

El recurso **Carrito** tiene los siguientes campos:
- idCarrito: identificador único del carrito
- idArticulo: identificador del artículo
- descripcion: descripción del artículo
- unidades: número de unidades
- precioFinal: importe final del carrito (campo proporcionado por el cliente, sin lógica de cálculo asociada y devuelto en las respuestas)

Se han aplicado validaciones básicas usando Bean Validation para evitar valores inválidos.

---


## Endpoints de la API

| Método | Ruta | Cuerpo (Body) | Descripción | Respuestas |
|------|------|------|------|------|
| POST | /api/carrito | JSON Carrito | Crea un nuevo carrito | 201 Created, 400 Bad Request |
| GET | /api/carrito | – | Devuelve la lista de carritos | 200 OK |
| GET | /api/carrito/{idCarrito} | – | Devuelve un carrito por su id | 200 OK |
| PUT | /api/carrito/{idCarrito} | JSON Carrito | Modifica un carrito existente | 200 OK, 400 Bad Request |
| DELETE | /api/carrito/{idCarrito} | – | Elimina un carrito | 200 OK |

---

## Validaciones

Se utiliza Bean Validation mediante anotaciones en el modelo Carrito:
- @Positive para ids, unidades y precio
- @NotBlank para la descripción

Las validaciones se activan en los endpoints POST y PUT usando la anotación @Valid.  
Si los datos no cumplen las restricciones, la API devuelve automáticamente un **400 Bad Request**.
=======
# pat-p3
>>>>>>> f3b6327106122e222794b4bf12297c4e1a783cbb
