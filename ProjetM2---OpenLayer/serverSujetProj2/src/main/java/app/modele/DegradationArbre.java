package app.modele;


import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "degradationArbre")
public class DegradationArbre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long idDegAr;
    @Column(name = "idArbreFK") //waiting
    public Long idArbreFK;
    @Column(name = "description")
    public String description;

    public Long getIdDegAr() {
        return idDegAr;
    }

    public void setIdDegAr(Long idDegAr) {
        this.idDegAr = idDegAr;
    }

    public Long getIdArbreFK() {
        return idArbreFK;
    }

    public void setIdArbreFK(Long idArbreFK) {
        this.idArbreFK = idArbreFK;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
