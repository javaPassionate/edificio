package com.mm.edificio.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Projet.
 */
@Entity
@Table(name = "projet")
public class Projet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "projet", nullable = false)
    private String projet;

    @NotNull
    @Column(name = "numero_projet", nullable = false)
    private String numeroProjet;

    @Column(name = "mo")
    private String mo;

    @Column(name = "jhi_mod")
    private String mod;

    @Column(name = "architecture")
    private String architecture;

    @Column(name = "bet")
    private String bet;

    @OneToMany(mappedBy = "numeroProjet")
    @JsonIgnore
    private Set<CourrierDepart> courrierDeparts = new HashSet<>();

    @OneToMany(mappedBy = "numeroProjet")
    @JsonIgnore
    private Set<CourrierArrive> courrierArrives = new HashSet<>();

    @OneToMany(mappedBy = "numeroProjet")
    @JsonIgnore
    private Set<PvReunion> pvReunions = new HashSet<>();

    @OneToMany(mappedBy = "numeroProjet")
    @JsonIgnore
    private Set<Plan> plans = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjet() {
        return projet;
    }

    public Projet projet(String projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(String projet) {
        this.projet = projet;
    }

    public String getNumeroProjet() {
        return numeroProjet;
    }

    public Projet numeroProjet(String numeroProjet) {
        this.numeroProjet = numeroProjet;
        return this;
    }

    public void setNumeroProjet(String numeroProjet) {
        this.numeroProjet = numeroProjet;
    }

    public String getMo() {
        return mo;
    }

    public Projet mo(String mo) {
        this.mo = mo;
        return this;
    }

    public void setMo(String mo) {
        this.mo = mo;
    }

    public String getMod() {
        return mod;
    }

    public Projet mod(String mod) {
        this.mod = mod;
        return this;
    }

    public void setMod(String mod) {
        this.mod = mod;
    }

    public String getArchitecture() {
        return architecture;
    }

    public Projet architecture(String architecture) {
        this.architecture = architecture;
        return this;
    }

    public void setArchitecture(String architecture) {
        this.architecture = architecture;
    }

    public String getBet() {
        return bet;
    }

    public Projet bet(String bet) {
        this.bet = bet;
        return this;
    }

    public void setBet(String bet) {
        this.bet = bet;
    }

    public Set<CourrierDepart> getCourrierDeparts() {
        return courrierDeparts;
    }

    public Projet courrierDeparts(Set<CourrierDepart> courrierDeparts) {
        this.courrierDeparts = courrierDeparts;
        return this;
    }

    public Projet addCourrierDepart(CourrierDepart courrierDepart) {
        this.courrierDeparts.add(courrierDepart);
        courrierDepart.setNumeroProjet(this);
        return this;
    }

    public Projet removeCourrierDepart(CourrierDepart courrierDepart) {
        this.courrierDeparts.remove(courrierDepart);
        courrierDepart.setNumeroProjet(null);
        return this;
    }

    public void setCourrierDeparts(Set<CourrierDepart> courrierDeparts) {
        this.courrierDeparts = courrierDeparts;
    }

    public Set<CourrierArrive> getCourrierArrives() {
        return courrierArrives;
    }

    public Projet courrierArrives(Set<CourrierArrive> courrierArrives) {
        this.courrierArrives = courrierArrives;
        return this;
    }

    public Projet addCourrierArrive(CourrierArrive courrierArrive) {
        this.courrierArrives.add(courrierArrive);
        courrierArrive.setNumeroProjet(this);
        return this;
    }

    public Projet removeCourrierArrive(CourrierArrive courrierArrive) {
        this.courrierArrives.remove(courrierArrive);
        courrierArrive.setNumeroProjet(null);
        return this;
    }

    public void setCourrierArrives(Set<CourrierArrive> courrierArrives) {
        this.courrierArrives = courrierArrives;
    }

    public Set<PvReunion> getPvReunions() {
        return pvReunions;
    }

    public Projet pvReunions(Set<PvReunion> pvReunions) {
        this.pvReunions = pvReunions;
        return this;
    }

    public Projet addPvReunion(PvReunion pvReunion) {
        this.pvReunions.add(pvReunion);
        pvReunion.setNumeroProjet(this);
        return this;
    }

    public Projet removePvReunion(PvReunion pvReunion) {
        this.pvReunions.remove(pvReunion);
        pvReunion.setNumeroProjet(null);
        return this;
    }

    public void setPvReunions(Set<PvReunion> pvReunions) {
        this.pvReunions = pvReunions;
    }

    public Set<Plan> getPlans() {
        return plans;
    }

    public Projet plans(Set<Plan> plans) {
        this.plans = plans;
        return this;
    }

    public Projet addPlan(Plan plan) {
        this.plans.add(plan);
        plan.setNumeroProjet(this);
        return this;
    }

    public Projet removePlan(Plan plan) {
        this.plans.remove(plan);
        plan.setNumeroProjet(null);
        return this;
    }

    public void setPlans(Set<Plan> plans) {
        this.plans = plans;
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
        Projet projet = (Projet) o;
        if (projet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), projet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Projet{" +
            "id=" + getId() +
            ", projet='" + getProjet() + "'" +
            ", numeroProjet='" + getNumeroProjet() + "'" +
            ", mo='" + getMo() + "'" +
            ", mod='" + getMod() + "'" +
            ", architecture='" + getArchitecture() + "'" +
            ", bet='" + getBet() + "'" +
            "}";
    }
}
