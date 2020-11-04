package app.modele;


import javax.persistence.*;

@Entity
@Table(name = "degradationToilette")
public class DegradationToilette {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long idDegToi;
    @Column(name = "idToiFk")
    public Long idToiFk;
    @Column(name = "description")
    public String description;

    public Long getIdDegToi() {
        return idDegToi;
    }

    public void setIdDegToi(Long idDegToi) {
        this.idDegToi = idDegToi;
    }

    public Long getIdToiFk() {
        return idToiFk;
    }

    public void setIdToiFk(Long idToiFk) {
        this.idToiFk = idToiFk;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
