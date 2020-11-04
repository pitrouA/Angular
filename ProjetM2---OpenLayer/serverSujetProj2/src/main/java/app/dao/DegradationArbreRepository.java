package app.dao;


import app.modele.DegradationArbre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegradationArbreRepository extends JpaRepository<DegradationArbre,Long> {
}
