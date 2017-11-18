package com.mm.edificio.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mm.edificio.domain.CourrierDepart;

import com.mm.edificio.repository.CourrierDepartRepository;
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
 * REST controller for managing CourrierDepart.
 */
@RestController
@RequestMapping("/api")
public class CourrierDepartResource {

    private final Logger log = LoggerFactory.getLogger(CourrierDepartResource.class);

    private static final String ENTITY_NAME = "courrierDepart";

    private final CourrierDepartRepository courrierDepartRepository;

    public CourrierDepartResource(CourrierDepartRepository courrierDepartRepository) {
        this.courrierDepartRepository = courrierDepartRepository;
    }

    /**
     * POST  /courrier-departs : Create a new courrierDepart.
     *
     * @param courrierDepart the courrierDepart to create
     * @return the ResponseEntity with status 201 (Created) and with body the new courrierDepart, or with status 400 (Bad Request) if the courrierDepart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/courrier-departs")
    @Timed
    public ResponseEntity<CourrierDepart> createCourrierDepart(@Valid @RequestBody CourrierDepart courrierDepart) throws URISyntaxException {
        log.debug("REST request to save CourrierDepart : {}", courrierDepart);
        if (courrierDepart.getId() != null) {
            throw new BadRequestAlertException("A new courrierDepart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CourrierDepart result = courrierDepartRepository.save(courrierDepart);
        return ResponseEntity.created(new URI("/api/courrier-departs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courrier-departs : Updates an existing courrierDepart.
     *
     * @param courrierDepart the courrierDepart to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated courrierDepart,
     * or with status 400 (Bad Request) if the courrierDepart is not valid,
     * or with status 500 (Internal Server Error) if the courrierDepart couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/courrier-departs")
    @Timed
    public ResponseEntity<CourrierDepart> updateCourrierDepart(@Valid @RequestBody CourrierDepart courrierDepart) throws URISyntaxException {
        log.debug("REST request to update CourrierDepart : {}", courrierDepart);
        if (courrierDepart.getId() == null) {
            return createCourrierDepart(courrierDepart);
        }
        CourrierDepart result = courrierDepartRepository.save(courrierDepart);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, courrierDepart.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courrier-departs : get all the courrierDeparts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courrierDeparts in body
     */
    @GetMapping("/courrier-departs")
    @Timed
    public List<CourrierDepart> getAllCourrierDeparts() {
        log.debug("REST request to get all CourrierDeparts");
        return courrierDepartRepository.findAll();
        }

    /**
     * GET  /courrier-departs/:id : get the "id" courrierDepart.
     *
     * @param id the id of the courrierDepart to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courrierDepart, or with status 404 (Not Found)
     */
    @GetMapping("/courrier-departs/{id}")
    @Timed
    public ResponseEntity<CourrierDepart> getCourrierDepart(@PathVariable Long id) {
        log.debug("REST request to get CourrierDepart : {}", id);
        CourrierDepart courrierDepart = courrierDepartRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(courrierDepart));
    }

    /**
     * DELETE  /courrier-departs/:id : delete the "id" courrierDepart.
     *
     * @param id the id of the courrierDepart to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/courrier-departs/{id}")
    @Timed
    public ResponseEntity<Void> deleteCourrierDepart(@PathVariable Long id) {
        log.debug("REST request to delete CourrierDepart : {}", id);
        courrierDepartRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
