package com.mm.edificio.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mm.edificio.domain.PvReunion;

import com.mm.edificio.repository.PvReunionRepository;
import com.mm.edificio.web.rest.errors.BadRequestAlertException;
import com.mm.edificio.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PvReunion.
 */
@RestController
@RequestMapping("/api")
public class PvReunionResource {

    private final Logger log = LoggerFactory.getLogger(PvReunionResource.class);

    private static final String ENTITY_NAME = "pvReunion";

    private final PvReunionRepository pvReunionRepository;

    public PvReunionResource(PvReunionRepository pvReunionRepository) {
        this.pvReunionRepository = pvReunionRepository;
    }

    /**
     * POST  /pv-reunions : Create a new pvReunion.
     *
     * @param pvReunion the pvReunion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pvReunion, or with status 400 (Bad Request) if the pvReunion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pv-reunions")
    @Timed
    public ResponseEntity<PvReunion> createPvReunion(@Valid @RequestBody PvReunion pvReunion) throws URISyntaxException {
        log.debug("REST request to save PvReunion : {}", pvReunion);
        if (pvReunion.getId() != null) {
            throw new BadRequestAlertException("A new pvReunion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PvReunion result = pvReunionRepository.save(pvReunion);
        return ResponseEntity.created(new URI("/api/pv-reunions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pv-reunions : Updates an existing pvReunion.
     *
     * @param pvReunion the pvReunion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pvReunion,
     * or with status 400 (Bad Request) if the pvReunion is not valid,
     * or with status 500 (Internal Server Error) if the pvReunion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pv-reunions")
    @Timed
    public ResponseEntity<PvReunion> updatePvReunion(@Valid @RequestBody PvReunion pvReunion) throws URISyntaxException {
        log.debug("REST request to update PvReunion : {}", pvReunion);
        if (pvReunion.getId() == null) {
            return createPvReunion(pvReunion);
        }
        PvReunion result = pvReunionRepository.save(pvReunion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pvReunion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pv-reunions : get all the pvReunions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pvReunions in body
     */
    @GetMapping("/pv-reunions")
    @Timed
    public List<PvReunion> getAllPvReunions() {
        log.debug("REST request to get all PvReunions");
        return pvReunionRepository.findAll();
        }

    /**
     * GET  /pv-reunions/:id : get the "id" pvReunion.
     *
     * @param id the id of the pvReunion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pvReunion, or with status 404 (Not Found)
     */
    @GetMapping("/pv-reunions/{id}")
    @Timed
    public ResponseEntity<PvReunion> getPvReunion(@PathVariable Long id) {
        log.debug("REST request to get PvReunion : {}", id);
        PvReunion pvReunion = pvReunionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pvReunion));
    }

    /**
     * DELETE  /pv-reunions/:id : delete the "id" pvReunion.
     *
     * @param id the id of the pvReunion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pv-reunions/{id}")
    @Timed
    public ResponseEntity<Void> deletePvReunion(@PathVariable Long id) {
        log.debug("REST request to delete PvReunion : {}", id);
        pvReunionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
