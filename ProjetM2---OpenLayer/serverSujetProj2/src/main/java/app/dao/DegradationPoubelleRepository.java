package app.dao;

import app.modele.DegradationPoubelle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegradationPoubelleRepository extends JpaRepository<DegradationPoubelle,Long> {
}
