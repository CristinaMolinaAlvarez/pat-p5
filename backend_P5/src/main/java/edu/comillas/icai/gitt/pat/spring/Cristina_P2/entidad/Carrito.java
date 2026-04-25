package edu.comillas.icai.gitt.pat.spring.Cristina_P2.entidad;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.persistence.Id;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
@Entity
@Table(name = "carrito")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarrito;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    //tenemos un carrito cuando hemos metido un artículo
    // por eso, en cuanto se crea tiene que haber un precio
    @PositiveOrZero
    @Column(nullable = false)
    private Double totalPrecio;

    @OneToMany(
            mappedBy = "carrito",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Articulo> articulos = new ArrayList<>();

    //MÉTODOS DE DOMINIO
    public void añadirArticulo(Articulo articulo) {
        articulos.add(articulo);
        articulo.setCarrito(this);
    }

    public void eliminarArticulo(Articulo articulo) {
        articulos.remove(articulo);
        articulo.setCarrito(null);
    }
}