package app.modele;


import javax.persistence.*;

@Entity
@Table(name = "degradationDechet")
public class DegradationDechet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long idDegDec;
    @Column(name = "idDecFk")
    public Long idDecFk;
    @Column(name = "description")
    public String description;

    public Long getIdDegDec() {
        return idDegDec;
    }

    public void setIdDegDec(Long idDegDec) {
        this.idDegDec = idDegDec;
    }

    public Long getIdDecFk() {
        return idDecFk;
    }

    public void setIdDecFk(Long idDecFk) {
        this.idDecFk = idDecFk;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
