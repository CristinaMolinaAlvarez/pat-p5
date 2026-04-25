package edu.comillas.icai.gitt.pat.spring.Cristina_P2.servicio;

import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Articulo;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Carrito;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Usuario;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.repositorio.RepoArticulo;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.repositorio.RepoCarrito;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.repositorio.RepoUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarritoService {
    @Autowired
    RepoCarrito repoCarrito;
    @Autowired
    RepoArticulo repoArticulo;
    @Autowired
    RepoUsuario repoUsuario;

    public Carrito crearCarrito(Long idUsuario) {
        //  comprobar que el usuario existe
        // Si no existe, 404 (esto NO lo valida @Valid)
        Usuario usuario = repoUsuario.findById(idUsuario).orElse(null);
        if (usuario == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
        Carrito carrito = new Carrito();
        carrito.setUsuario(usuario);
        carrito.setTotalPrecio(0.0); // Puede ser 0 porque es @PositiveOrZero
        return repoCarrito.save(carrito);
    }

    public Carrito obtenerCarrito(Long idCarrito) {
        // el carrito debe existir
        Carrito carrito = repoCarrito.findById(idCarrito).orElse(null);
        if (carrito == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no encontrado");
        }
        return carrito;
    }

    public List<Carrito> obtenerTodos() {
        Iterable<Carrito> iterable = repoCarrito.findAll();
        List<Carrito> lista = new ArrayList<>();
        for (Carrito carrito : iterable) {
            lista.add(carrito);
        }
        return lista;
    }

    public void eliminarCarrito(Long idCarrito) {
        //  no se puede borrar si no existe
        if (!repoCarrito.existsById(idCarrito)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no encontrado");
        }
        repoCarrito.deleteById(idCarrito);
    }

    public Articulo añadirArticulo(Long idCarrito, Articulo articulo) {
        Carrito carrito = repoCarrito.findById(idCarrito).orElse(null);
        if (carrito == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrito no encontrado");
        }
        articulo.setCarrito(carrito);

        Articulo articuloGuardado = repoArticulo.save(articulo);

        recalcularTotal(carrito);

        return articuloGuardado;
    }

    public void eliminarArticulo(Long idArticuloLinea) {
        Articulo articulo = repoArticulo.findById(idArticuloLinea).orElse(null);
        if (articulo == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Artículo no encontrado");
        }
        Carrito carrito = articulo.getCarrito();
        carrito.eliminarArticulo(articulo);
        repoCarrito.save(carrito);
        recalcularTotal(carrito);
    }


    private void recalcularTotal(Carrito carrito) {
        double total = 0.0;

        for (Articulo articulo : carrito.getArticulos()) {
            total += articulo.getPrecioUnitario() * articulo.getUnidades();
        }

        carrito.setTotalPrecio(total);
        repoCarrito.save(carrito);
    }
}