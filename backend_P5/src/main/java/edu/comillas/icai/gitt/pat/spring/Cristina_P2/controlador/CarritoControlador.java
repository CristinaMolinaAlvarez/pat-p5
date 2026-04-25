package edu.comillas.icai.gitt.pat.spring.Cristina_P2.controlador;

import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Articulo;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Carrito;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Usuario;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.servicio.CarritoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
public class CarritoControlador {

    @Autowired
    private CarritoService carritoService;


    // Crear carrito para un usuario
    @PostMapping("/api/carrito/{idUsuario}")
    @ResponseStatus(HttpStatus.CREATED)
    public Carrito crearCarrito(@PathVariable Long idUsuario) {
        return carritoService.crearCarrito(idUsuario);
    }


    // Obtener todos los carritos
    @GetMapping("/api/carrito")
    public List<Carrito> getCarritos() {
        return carritoService.obtenerTodos();
    }


    // Obtener un carrito concreto
    @GetMapping("/api/carrito/{idCarrito}")
    public Carrito getCarrito(@PathVariable Long idCarrito) {
        return carritoService.obtenerCarrito(idCarrito);
    }


    // Borrar carrito
    @DeleteMapping("/api/carrito/{idCarrito}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrarCarrito(@PathVariable Long idCarrito) {
        carritoService.eliminarCarrito(idCarrito);
    }


    // Añadir línea de carrito (artículo)
    @PostMapping("/api/carrito/{idCarrito}/articulos")
    @ResponseStatus(HttpStatus.CREATED)
    public Articulo añadirArticulo(
            @PathVariable Long idCarrito,
            @Valid @RequestBody Articulo articulo) {

        return carritoService.añadirArticulo(idCarrito, articulo);
    }


    // Borrar línea de carrito
    @DeleteMapping("/api/articulos/{idArticuloLinea}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarArticulo(@PathVariable Long idArticuloLinea) {
        carritoService.eliminarArticulo(idArticuloLinea);
    }

}