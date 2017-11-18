package com.mm.edificio.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Plan.
 */
@Entity
@Table(name = "plan")
public class Plan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "numero_plan", nullable = false)
    private String numeroPlan;

    @Column(name = "type_plan")
    private String typePlan;

    @Column(name = "contenu_plan")
    private String contenuPlan;

    @ManyToOne
    private Projet numeroProjet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroPlan() {
        return numeroPlan;
    }

    public Plan numeroPlan(String numeroPlan) {
        this.numeroPlan = numeroPlan;
        return this;
    }

    public void setNumeroPlan(String numeroPlan) {
        this.numeroPlan = numeroPlan;
    }

    public String getTypePlan() {
        return typePlan;
    }

    public Plan typePlan(String typePlan) {
        this.typePlan = typePlan;
        return this;
    }

    public void setTypePlan(String typePlan) {
        this.typePlan = typePlan;
    }

    public String getContenuPlan() {
        return contenuPlan;
    }

    public Plan contenuPlan(String contenuPlan) {
        this.contenuPlan = contenuPlan;
        return this;
    }

    public void setContenuPlan(String contenuPlan) {
        this.contenuPlan = contenuPlan;
    }

    public Projet getNumeroProjet() {
        return numeroProjet;
    }

    public Plan numeroProjet(Projet projet) {
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
        Plan plan = (Plan) o;
        if (plan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Plan{" +
            "id=" + getId() +
            ", numeroPlan='" + getNumeroPlan() + "'" +
            ", typePlan='" + getTypePlan() + "'" +
            ", contenuPlan='" + getContenuPlan() + "'" +
            "}";
    }
}
