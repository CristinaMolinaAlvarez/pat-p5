package edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
@Table(name = "articulo")
public class Articulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idArticuloLinea;

    // Si fuese null, no tendría sentido en el modelo de negocio.
    @ManyToOne
    @JoinColumn(name = "carrito_id")
    @JsonIgnore
    private Carrito carrito;

    // nullable = false porque el id del producto es obligatorio en base de datos.
    @Column(nullable = false)
    private Long idArticulo;

    @Positive
    @Column(nullable = false)
    private Double precioUnitario;

    @Positive
    @Column(nullable = false)
    private Integer unidades;

}