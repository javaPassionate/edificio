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
 * A CourrierDepart.
 */
@Entity
@Table(name = "courrier_depart")
public class CourrierDepart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "numero_courrier_depart", nullable = false)
    private String numeroCourrierDepart;

    @Column(name = "destinataire")
    private String destinataire;

    @Column(name = "date_envoi")
    private LocalDate dateEnvoi;

    @OneToMany(mappedBy = "courrierDepart")
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

    public CourrierDepart numeroCourrierDepart(String numeroCourrierDepart) {
        this.numeroCourrierDepart = numeroCourrierDepart;
        return this;
    }

    public void setNumeroCourrierDepart(String numeroCourrierDepart) {
        this.numeroCourrierDepart = numeroCourrierDepart;
    }

    public String getDestinataire() {
        return destinataire;
    }

    public CourrierDepart destinataire(String destinataire) {
        this.destinataire = destinataire;
        return this;
    }

    public void setDestinataire(String destinataire) {
        this.destinataire = destinataire;
    }

    public LocalDate getDateEnvoi() {
        return dateEnvoi;
    }

    public CourrierDepart dateEnvoi(LocalDate dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
        return this;
    }

    public void setDateEnvoi(LocalDate dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
    }

    public Set<PieceJointe> getIdPieceJointes() {
        return idPieceJointes;
    }

    public CourrierDepart idPieceJointes(Set<PieceJointe> pieceJointes) {
        this.idPieceJointes = pieceJointes;
        return this;
    }

    public CourrierDepart addIdPieceJointe(PieceJointe pieceJointe) {
        this.idPieceJointes.add(pieceJointe);
        pieceJointe.setCourrierDepart(this);
        return this;
    }

    public CourrierDepart removeIdPieceJointe(PieceJointe pieceJointe) {
        this.idPieceJointes.remove(pieceJointe);
        pieceJointe.setCourrierDepart(null);
        return this;
    }

    public void setIdPieceJointes(Set<PieceJointe> pieceJointes) {
        this.idPieceJointes = pieceJointes;
    }

    public Projet getNumeroProjet() {
        return numeroProjet;
    }

    public CourrierDepart numeroProjet(Projet projet) {
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
        CourrierDepart courrierDepart = (CourrierDepart) o;
        if (courrierDepart.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courrierDepart.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourrierDepart{" +
            "id=" + getId() +
            ", numeroCourrierDepart='" + getNumeroCourrierDepart() + "'" +
            ", destinataire='" + getDestinataire() + "'" +
            ", dateEnvoi='" + getDateEnvoi() + "'" +
            "}";
    }
}
