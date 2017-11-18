package com.mm.edificio.repository;

import com.mm.edificio.domain.CourrierDepart;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CourrierDepart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourrierDepartRepository extends JpaRepository<CourrierDepart, Long> {

}
