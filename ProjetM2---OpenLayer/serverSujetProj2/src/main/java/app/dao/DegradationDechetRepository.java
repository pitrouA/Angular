package app.dao;

import app.modele.DegradationDechet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegradationDechetRepository extends JpaRepository<DegradationDechet,Long> {
}
