package com.mm.edificio.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mm.edificio.domain.CourrierArrive;

import com.mm.edificio.repository.CourrierArriveRepository;
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
 * REST controller for managing CourrierArrive.
 */
@RestController
@RequestMapping("/api")
public class CourrierArriveResource {

    private final Logger log = LoggerFactory.getLogger(CourrierArriveResource.class);

    private static final String ENTITY_NAME = "courrierArrive";

    private final CourrierArriveRepository courrierArriveRepository;

    public CourrierArriveResource(CourrierArriveRepository courrierArriveRepository) {
        this.courrierArriveRepository = courrierArriveRepository;
    }

    /**
     * POST  /courrier-arrives : Create a new courrierArrive.
     *
     * @param courrierArrive the courrierArrive to create
     * @return the ResponseEntity with status 201 (Created) and with body the new courrierArrive, or with status 400 (Bad Request) if the courrierArrive has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/courrier-arrives")
    @Timed
    public ResponseEntity<CourrierArrive> createCourrierArrive(@Valid @RequestBody CourrierArrive courrierArrive) throws URISyntaxException {
        log.debug("REST request to save CourrierArrive : {}", courrierArrive);
        if (courrierArrive.getId() != null) {
            throw new BadRequestAlertException("A new courrierArrive cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CourrierArrive result = courrierArriveRepository.save(courrierArrive);
        return ResponseEntity.created(new URI("/api/courrier-arrives/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courrier-arrives : Updates an existing courrierArrive.
     *
     * @param courrierArrive the courrierArrive to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated courrierArrive,
     * or with status 400 (Bad Request) if the courrierArrive is not valid,
     * or with status 500 (Internal Server Error) if the courrierArrive couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/courrier-arrives")
    @Timed
    public ResponseEntity<CourrierArrive> updateCourrierArrive(@Valid @RequestBody CourrierArrive courrierArrive) throws URISyntaxException {
        log.debug("REST request to update CourrierArrive : {}", courrierArrive);
        if (courrierArrive.getId() == null) {
            return createCourrierArrive(courrierArrive);
        }
        CourrierArrive result = courrierArriveRepository.save(courrierArrive);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, courrierArrive.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courrier-arrives : get all the courrierArrives.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courrierArrives in body
     */
    @GetMapping("/courrier-arrives")
    @Timed
    public List<CourrierArrive> getAllCourrierArrives() {
        log.debug("REST request to get all CourrierArrives");
        return courrierArriveRepository.findAll();
        }

    /**
     * GET  /courrier-arrives/:id : get the "id" courrierArrive.
     *
     * @param id the id of the courrierArrive to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courrierArrive, or with status 404 (Not Found)
     */
    @GetMapping("/courrier-arrives/{id}")
    @Timed
    public ResponseEntity<CourrierArrive> getCourrierArrive(@PathVariable Long id) {
        log.debug("REST request to get CourrierArrive : {}", id);
        CourrierArrive courrierArrive = courrierArriveRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(courrierArrive));
    }

    /**
     * DELETE  /courrier-arrives/:id : delete the "id" courrierArrive.
     *
     * @param id the id of the courrierArrive to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/courrier-arrives/{id}")
    @Timed
    public ResponseEntity<Void> deleteCourrierArrive(@PathVariable Long id) {
        log.debug("REST request to delete CourrierArrive : {}", id);
        courrierArriveRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
