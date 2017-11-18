package com.mm.edificio.repository;

import com.mm.edificio.domain.CourrierArrive;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CourrierArrive entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourrierArriveRepository extends JpaRepository<CourrierArrive, Long> {

}
