package edu.comillas.icai.gitt.pat.spring.Cristina_P2.repositorio;

import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Articulo;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Carrito;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RepoArticulo extends CrudRepository<Articulo, Long> {

    List<Articulo> findByCarrito(Carrito carrito);
}