package edu.comillas.icai.gitt.pat.spring.Cristina_P2.repositorio;

import org.springframework.data.repository.CrudRepository;
import edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad.Usuario;

public interface RepoUsuario extends CrudRepository<Usuario, Long> {
//puede que lo necesitemos en otras prácticas más elaboradas
    // para autenticacion y auth
    boolean existsByCorreo(String correo);
}
