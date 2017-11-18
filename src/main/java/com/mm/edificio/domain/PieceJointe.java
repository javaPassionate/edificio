package com.mm.edificio.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PieceJointe.
 */
@Entity
@Table(name = "piece_jointe")
public class PieceJointe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "id_piece_jointe", nullable = false)
    private Long idPieceJointe;

    @NotNull
    @Column(name = "name_file", nullable = false)
    private String nameFile;

    @NotNull
    @Lob
    @Column(name = "content", nullable = false)
    private byte[] content;

    @Column(name = "content_content_type", nullable = false)
    private String contentContentType;

    @NotNull
    @Column(name = "path", nullable = false)
    private String path;

    @ManyToOne
    private CourrierDepart courrierDepart;

    @ManyToOne
    private CourrierArrive courrierArrive;

    @ManyToOne
    private PvReunion pvReunion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdPieceJointe() {
        return idPieceJointe;
    }

    public PieceJointe idPieceJointe(Long idPieceJointe) {
        this.idPieceJointe = idPieceJointe;
        return this;
    }

    public void setIdPieceJointe(Long idPieceJointe) {
        this.idPieceJointe = idPieceJointe;
    }

    public String getNameFile() {
        return nameFile;
    }

    public PieceJointe nameFile(String nameFile) {
        this.nameFile = nameFile;
        return this;
    }

    public void setNameFile(String nameFile) {
        this.nameFile = nameFile;
    }

    public byte[] getContent() {
        return content;
    }

    public PieceJointe content(byte[] content) {
        this.content = content;
        return this;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public String getContentContentType() {
        return contentContentType;
    }

    public PieceJointe contentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
        return this;
    }

    public void setContentContentType(String contentContentType) {
        this.contentContentType = contentContentType;
    }

    public String getPath() {
        return path;
    }

    public PieceJointe path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public CourrierDepart getCourrierDepart() {
        return courrierDepart;
    }

    public PieceJointe courrierDepart(CourrierDepart courrierDepart) {
        this.courrierDepart = courrierDepart;
        return this;
    }

    public void setCourrierDepart(CourrierDepart courrierDepart) {
        this.courrierDepart = courrierDepart;
    }

    public CourrierArrive getCourrierArrive() {
        return courrierArrive;
    }

    public PieceJointe courrierArrive(CourrierArrive courrierArrive) {
        this.courrierArrive = courrierArrive;
        return this;
    }

    public void setCourrierArrive(CourrierArrive courrierArrive) {
        this.courrierArrive = courrierArrive;
    }

    public PvReunion getPvReunion() {
        return pvReunion;
    }

    public PieceJointe pvReunion(PvReunion pvReunion) {
        this.pvReunion = pvReunion;
        return this;
    }

    public void setPvReunion(PvReunion pvReunion) {
        this.pvReunion = pvReunion;
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
        PieceJointe pieceJointe = (PieceJointe) o;
        if (pieceJointe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pieceJointe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PieceJointe{" +
            "id=" + getId() +
            ", idPieceJointe='" + getIdPieceJointe() + "'" +
            ", nameFile='" + getNameFile() + "'" +
            ", content='" + getContent() + "'" +
            ", contentContentType='" + contentContentType + "'" +
            ", path='" + getPath() + "'" +
            "}";
    }
}
