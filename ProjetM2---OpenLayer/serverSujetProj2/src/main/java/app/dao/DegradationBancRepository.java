package app.dao;

import app.modele.DegradationBanc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegradationBancRepository extends JpaRepository<DegradationBanc,Long> {
}
