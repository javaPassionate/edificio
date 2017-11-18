package com.mm.edificio.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CourrierArrive.
 */
@Entity
@Table(name = "courrier_arrive")
public class CourrierArrive implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "numero_courrier_depart", nullable = false)
    private String numeroCourrierDepart;

    @Column(name = "envoye_par")
    private String envoyePar;

    @Column(name = "date_reception")
    private LocalDate dateReception;

    @OneToMany(mappedBy = "courrierArrive")
    @JsonIgnore
    private Set<PieceJointe> idPieceJointes = new HashSet<>();

    @ManyToOne
    private Projet numeroProjet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroCourrierDepart() {
        return numeroCourrierDepart;
    }

    public CourrierArrive numeroCourrierDepart(String numeroCourrierDepart) {
        this.numeroCourrierDepart = numeroCourrierDepart;
        return this;
    }

    public void setNumeroCourrierDepart(String numeroCourrierDepart) {
        this.numeroCourrierDepart = numeroCourrierDepart;
    }

    public String getEnvoyePar() {
        return envoyePar;
    }

    public CourrierArrive envoyePar(String envoyePar) {
        this.envoyePar = envoyePar;
        return this;
    }

    public void setEnvoyePar(String envoyePar) {
        this.envoyePar = envoyePar;
    }

    public LocalDate getDateReception() {
        return dateReception;
    }

    public CourrierArrive dateReception(LocalDate dateReception) {
        this.dateReception = dateReception;
        return this;
    }

    public void setDateReception(LocalDate dateReception) {
        this.dateReception = dateReception;
    }

    public Set<PieceJointe> getIdPieceJointes() {
        return idPieceJointes;
    }

    public CourrierArrive idPieceJointes(Set<PieceJointe> pieceJointes) {
        this.idPieceJointes = pieceJointes;
        return this;
    }

    public CourrierArrive addIdPieceJointe(PieceJointe pieceJointe) {
        this.idPieceJointes.add(pieceJointe);
        pieceJointe.setCourrierArrive(this);
        return this;
    }

    public CourrierArrive removeIdPieceJointe(PieceJointe pieceJointe) {
        this.idPieceJointes.remove(pieceJointe);
        pieceJointe.setCourrierArrive(null);
        return this;
    }

    public void setIdPieceJointes(Set<PieceJointe> pieceJointes) {
        this.idPieceJointes = pieceJointes;
    }

    public Projet getNumeroProjet() {
        return numeroProjet;
    }

    public CourrierArrive numeroProjet(Projet projet) {
        this.numeroProjet = projet;
        return this;
    }

    public void setNumeroProjet(Projet projet) {
        this.numeroProjet = projet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CourrierArrive courrierArrive = (CourrierArrive) o;
        if (courrierArrive.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courrierArrive.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourrierArrive{" +
            "id=" + getId() +
            ", numeroCourrierDepart='" + getNumeroCourrierDepart() + "'" +
            ", envoyePar='" + getEnvoyePar() + "'" +
            ", dateReception='" + getDateReception() + "'" +
            "}";
    }
}
