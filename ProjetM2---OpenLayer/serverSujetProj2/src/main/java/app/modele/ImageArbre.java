package app.modele;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Table(name = "images")
@EntityListeners(AuditingEntityListener.class)
public class ImageArbre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long idImgA;
    @Column(name = "idArbreFK", nullable = true) //waiting
    public Long idArbreFK;
    @Column(name = "descImgA", nullable = true)
    public String descImgA;
    @Column(name = "nameImgA", nullable = true)
    public String nameImgA;
    @Column(name = "dataImgA", nullable = true,columnDefinition="TEXT") //waiting
    public String dataImgA;
    @Column(name = "longitude")
    public Float longitude;
    @Column(name = "latitude")
    public Float latitude;

    public Long getIdImgA() {
        return idImgA;
    }

    public void setIdImgA(Long idImgA) {
        this.idImgA = idImgA;
    }

    public String getNameImgA() {
        return nameImgA;
    }

    public void setNameImgA(String nameImgA) {
        this.nameImgA = nameImgA;
    }

    public String getDataImgA() {
        return dataImgA;
    }

    public void setDataImgA(String dataImgA) {
        this.dataImgA = dataImgA;
    }

    public String getDescImgA() {
        return descImgA;
    }

    public void setDescImgA(String descImgA) {
        this.descImgA = descImgA;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }
}
