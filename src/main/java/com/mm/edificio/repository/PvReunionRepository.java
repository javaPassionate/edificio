package com.mm.edificio.repository;

import com.mm.edificio.domain.PvReunion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PvReunion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PvReunionRepository extends JpaRepository<PvReunion, Long> {

}
