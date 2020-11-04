package app.modele;


import javax.persistence.*;

@Entity
@Table(name="degradationBanc")
public class DegradationBanc {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long idDegBanc;
    @Column(name = "idBancFk")
    public Long idBancFk;
    @Column(name = "description")
    public String description;

    public Long getIdDegBanc() {
        return idDegBanc;
    }

    public void setIdDegBanc(Long idDegBanc) {
        this.idDegBanc = idDegBanc;
    }

    public Long getIdBancFk() {
        return idBancFk;
    }

    public void setIdBancFk(Long idBancFk) {
        this.idBancFk = idBancFk;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
