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
 * A PvReunion.
 */
@Entity
@Table(name = "pv_reunion")
public class PvReunion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "numero_pv", nullable = false)
    private String numeroPv;

    @Column(name = "date_pv")
    private LocalDate datePv;

    @OneToMany(mappedBy = "pvReunion")
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

    public String getNumeroPv() {
        return numeroPv;
    }

    public PvReunion numeroPv(String numeroPv) {
        this.numeroPv = numeroPv;
        return this;
    }

    public void setNumeroPv(String numeroPv) {
        this.numeroPv = numeroPv;
    }

    public LocalDate getDatePv() {
        return datePv;
    }

    public PvReunion datePv(LocalDate datePv) {
        this.datePv = datePv;
        return this;
    }

    public void setDatePv(LocalDate datePv) {
        this.datePv = datePv;
    }

    public Set<PieceJointe> getIdPieceJointes() {
        return idPieceJointes;
    }

    public PvReunion idPieceJointes(Set<PieceJointe> pieceJointes) {
        this.idPieceJointes = pieceJointes;
        return this;
    }

    public PvReunion addIdPieceJointe(PieceJointe pieceJointe) {
        this.idPieceJointes.add(pieceJointe);
        pieceJointe.setPvReunion(this);
        return this;
    }

    public PvReunion removeIdPieceJointe(PieceJointe pieceJointe) {
        this.idPieceJointes.remove(pieceJointe);
        pieceJointe.setPvReunion(null);
        return this;
    }

    public void setIdPieceJointes(Set<PieceJointe> pieceJointes) {
        this.idPieceJointes = pieceJointes;
    }

    public Projet getNumeroProjet() {
        return numeroProjet;
    }

    public PvReunion numeroProjet(Projet projet) {
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
        PvReunion pvReunion = (PvReunion) o;
        if (pvReunion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pvReunion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PvReunion{" +
            "id=" + getId() +
            ", numeroPv='" + getNumeroPv() + "'" +
            ", datePv='" + getDatePv() + "'" +
            "}";
    }
}
