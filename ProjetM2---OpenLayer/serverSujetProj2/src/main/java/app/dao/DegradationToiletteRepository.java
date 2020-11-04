package app.dao;

import app.modele.DegradationToilette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegradationToiletteRepository extends JpaRepository<DegradationToilette,Long> {
}
