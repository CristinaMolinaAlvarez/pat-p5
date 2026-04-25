package edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    // @Email para asegurar formato correcto.
    // unique = true porque no pueden existir dos usuarios con el mismo correo en la BD.
    @NotBlank
    @Email
    @Column(nullable = false, unique = true)
    private String correo;
}