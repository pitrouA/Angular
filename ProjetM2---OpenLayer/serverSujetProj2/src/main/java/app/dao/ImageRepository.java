package app.dao;

import app.modele.ImageArbre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageArbre,Long> {

}
