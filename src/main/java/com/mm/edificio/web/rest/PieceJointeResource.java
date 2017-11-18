package com.mm.edificio.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mm.edificio.domain.PieceJointe;

import com.mm.edificio.repository.PieceJointeRepository;
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
 * REST controller for managing PieceJointe.
 */
@RestController
@RequestMapping("/api")
public class PieceJointeResource {

    private final Logger log = LoggerFactory.getLogger(PieceJointeResource.class);

    private static final String ENTITY_NAME = "pieceJointe";

    private final PieceJointeRepository pieceJointeRepository;

    public PieceJointeResource(PieceJointeRepository pieceJointeRepository) {
        this.pieceJointeRepository = pieceJointeRepository;
    }

    /**
     * POST  /piece-jointes : Create a new pieceJointe.
     *
     * @param pieceJointe the pieceJointe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pieceJointe, or with status 400 (Bad Request) if the pieceJointe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/piece-jointes")
    @Timed
    public ResponseEntity<PieceJointe> createPieceJointe(@Valid @RequestBody PieceJointe pieceJointe) throws URISyntaxException {
        log.debug("REST request to save PieceJointe : {}", pieceJointe);
        if (pieceJointe.getId() != null) {
            throw new BadRequestAlertException("A new pieceJointe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PieceJointe result = pieceJointeRepository.save(pieceJointe);
        return ResponseEntity.created(new URI("/api/piece-jointes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /piece-jointes : Updates an existing pieceJointe.
     *
     * @param pieceJointe the pieceJointe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pieceJointe,
     * or with status 400 (Bad Request) if the pieceJointe is not valid,
     * or with status 500 (Internal Server Error) if the pieceJointe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/piece-jointes")
    @Timed
    public ResponseEntity<PieceJointe> updatePieceJointe(@Valid @RequestBody PieceJointe pieceJointe) throws URISyntaxException {
        log.debug("REST request to update PieceJointe : {}", pieceJointe);
        if (pieceJointe.getId() == null) {
            return createPieceJointe(pieceJointe);
        }
        PieceJointe result = pieceJointeRepository.save(pieceJointe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pieceJointe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /piece-jointes : get all the pieceJointes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pieceJointes in body
     */
    @GetMapping("/piece-jointes")
    @Timed
    public List<PieceJointe> getAllPieceJointes() {
        log.debug("REST request to get all PieceJointes");
        return pieceJointeRepository.findAll();
        }

    /**
     * GET  /piece-jointes/:id : get the "id" pieceJointe.
     *
     * @param id the id of the pieceJointe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pieceJointe, or with status 404 (Not Found)
     */
    @GetMapping("/piece-jointes/{id}")
    @Timed
    public ResponseEntity<PieceJointe> getPieceJointe(@PathVariable Long id) {
        log.debug("REST request to get PieceJointe : {}", id);
        PieceJointe pieceJointe = pieceJointeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pieceJointe));
    }

    /**
     * DELETE  /piece-jointes/:id : delete the "id" pieceJointe.
     *
     * @param id the id of the pieceJointe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/piece-jointes/{id}")
    @Timed
    public ResponseEntity<Void> deletePieceJointe(@PathVariable Long id) {
        log.debug("REST request to delete PieceJointe : {}", id);
        pieceJointeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
