package app.modele;

import javax.persistence.*;

@Entity
@Table(name = "degradationPoubelle")
public class DegradationPoubelle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long idDegPou;
    @Column(name = "idPouFk")
    public Long idPouFk;
    @Column(name = "description")
    public String description;

    public Long getIdDegPou() {
        return idDegPou;
    }

    public void setIdDegPou(Long idDegPou) {
        this.idDegPou = idDegPou;
    }

    public Long getIdPouFk() {
        return idPouFk;
    }

    public void setIdPouFk(Long idPouFk) {
        this.idPouFk = idPouFk;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
