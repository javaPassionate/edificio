package com.mm.edificio.web.rest;

import com.mm.edificio.MrsPiloteApp;

import com.mm.edificio.domain.PieceJointe;
import com.mm.edificio.repository.PieceJointeRepository;
import com.mm.edificio.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mm.edificio.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PieceJointeResource REST controller.
 *
 * @see PieceJointeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MrsPiloteApp.class)
public class PieceJointeResourceIntTest {

    private static final Long DEFAULT_ID_PIECE_JOINTE = 1L;
    private static final Long UPDATED_ID_PIECE_JOINTE = 2L;

    private static final String DEFAULT_NAME_FILE = "AAAAAAAAAA";
    private static final String UPDATED_NAME_FILE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_CONTENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CONTENT = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_CONTENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CONTENT_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    @Autowired
    private PieceJointeRepository pieceJointeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPieceJointeMockMvc;

    private PieceJointe pieceJointe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PieceJointeResource pieceJointeResource = new PieceJointeResource(pieceJointeRepository);
        this.restPieceJointeMockMvc = MockMvcBuilders.standaloneSetup(pieceJointeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PieceJointe createEntity(EntityManager em) {
        PieceJointe pieceJointe = new PieceJointe()
            .idPieceJointe(DEFAULT_ID_PIECE_JOINTE)
            .nameFile(DEFAULT_NAME_FILE)
            .content(DEFAULT_CONTENT)
            .contentContentType(DEFAULT_CONTENT_CONTENT_TYPE)
            .path(DEFAULT_PATH);
        return pieceJointe;
    }

    @Before
    public void initTest() {
        pieceJointe = createEntity(em);
    }

    @Test
    @Transactional
    public void createPieceJointe() throws Exception {
        int databaseSizeBeforeCreate = pieceJointeRepository.findAll().size();

        // Create the PieceJointe
        restPieceJointeMockMvc.perform(post("/api/piece-jointes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pieceJointe)))
            .andExpect(status().isCreated());

        // Validate the PieceJointe in the database
        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeCreate + 1);
        PieceJointe testPieceJointe = pieceJointeList.get(pieceJointeList.size() - 1);
        assertThat(testPieceJointe.getIdPieceJointe()).isEqualTo(DEFAULT_ID_PIECE_JOINTE);
        assertThat(testPieceJointe.getNameFile()).isEqualTo(DEFAULT_NAME_FILE);
        assertThat(testPieceJointe.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testPieceJointe.getContentContentType()).isEqualTo(DEFAULT_CONTENT_CONTENT_TYPE);
        assertThat(testPieceJointe.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createPieceJointeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pieceJointeRepository.findAll().size();

        // Create the PieceJointe with an existing ID
        pieceJointe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPieceJointeMockMvc.perform(post("/api/piece-jointes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pieceJointe)))
            .andExpect(status().isBadRequest());

        // Validate the PieceJointe in the database
        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdPieceJointeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pieceJointeRepository.findAll().size();
        // set the field null
        pieceJointe.setIdPieceJointe(null);

        // Create the PieceJointe, which fails.

        restPieceJointeMockMvc.perform(post("/api/piece-jointes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pieceJointe)))
            .andExpect(status().isBadRequest());

        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameFileIsRequired() throws Exception {
        int databaseSizeBeforeTest = pieceJointeRepository.findAll().size();
        // set the field null
        pieceJointe.setNameFile(null);

        // Create the PieceJointe, which fails.

        restPieceJointeMockMvc.perform(post("/api/piece-jointes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pieceJointe)))
            .andExpect(status().isBadRequest());

        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = pieceJointeRepository.findAll().size();
        // set the field null
        pieceJointe.setContent(null);

        // Create the PieceJointe, which fails.

        restPieceJointeMockMvc.perform(post("/api/piece-jointes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pieceJointe)))
            .andExpect(status().isBadRequest());

        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPathIsRequired() throws Exception {
        int databaseSizeBeforeTest = pieceJointeRepository.findAll().size();
        // set the field null
        pieceJointe.setPath(null);

        // Create the PieceJointe, which fails.

        restPieceJointeMockMvc.perform(post("/api/piece-jointes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pieceJointe)))
            .andExpect(status().isBadRequest());

        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPieceJointes() throws Exception {
        // Initialize the database
        pieceJointeRepository.saveAndFlush(pieceJointe);

        // Get all the pieceJointeList
        restPieceJointeMockMvc.perform(get("/api/piece-jointes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pieceJointe.getId().intValue())))
            .andExpect(jsonPath("$.[*].idPieceJointe").value(hasItem(DEFAULT_ID_PIECE_JOINTE.intValue())))
            .andExpect(jsonPath("$.[*].nameFile").value(hasItem(DEFAULT_NAME_FILE.toString())))
            .andExpect(jsonPath("$.[*].contentContentType").value(hasItem(DEFAULT_CONTENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONTENT))))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }

    @Test
    @Transactional
    public void getPieceJointe() throws Exception {
        // Initialize the database
        pieceJointeRepository.saveAndFlush(pieceJointe);

        // Get the pieceJointe
        restPieceJointeMockMvc.perform(get("/api/piece-jointes/{id}", pieceJointe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pieceJointe.getId().intValue()))
            .andExpect(jsonPath("$.idPieceJointe").value(DEFAULT_ID_PIECE_JOINTE.intValue()))
            .andExpect(jsonPath("$.nameFile").value(DEFAULT_NAME_FILE.toString()))
            .andExpect(jsonPath("$.contentContentType").value(DEFAULT_CONTENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.content").value(Base64Utils.encodeToString(DEFAULT_CONTENT)))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPieceJointe() throws Exception {
        // Get the pieceJointe
        restPieceJointeMockMvc.perform(get("/api/piece-jointes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePieceJointe() throws Exception {
        // Initialize the database
        pieceJointeRepository.saveAndFlush(pieceJointe);
        int databaseSizeBeforeUpdate = pieceJointeRepository.findAll().size();

        // Update the pieceJointe
        PieceJointe updatedPieceJointe = pieceJointeRepository.findOne(pieceJointe.getId());
        updatedPieceJointe
            .idPieceJointe(UPDATED_ID_PIECE_JOINTE)
            .nameFile(UPDATED_NAME_FILE)
            .content(UPDATED_CONTENT)
            .contentContentType(UPDATED_CONTENT_CONTENT_TYPE)
            .path(UPDATED_PATH);

        restPieceJointeMockMvc.perform(put("/api/piece-jointes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPieceJointe)))
            .andExpect(status().isOk());

        // Validate the PieceJointe in the database
        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeUpdate);
        PieceJointe testPieceJointe = pieceJointeList.get(pieceJointeList.size() - 1);
        assertThat(testPieceJointe.getIdPieceJointe()).isEqualTo(UPDATED_ID_PIECE_JOINTE);
        assertThat(testPieceJointe.getNameFile()).isEqualTo(UPDATED_NAME_FILE);
        assertThat(testPieceJointe.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testPieceJointe.getContentContentType()).isEqualTo(UPDATED_CONTENT_CONTENT_TYPE);
        assertThat(testPieceJointe.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingPieceJointe() throws Exception {
        int databaseSizeBeforeUpdate = pieceJointeRepository.findAll().size();

        // Create the PieceJointe

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPieceJointeMockMvc.perform(put("/api/piece-jointes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pieceJointe)))
            .andExpect(status().isCreated());

        // Validate the PieceJointe in the database
        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePieceJointe() throws Exception {
        // Initialize the database
        pieceJointeRepository.saveAndFlush(pieceJointe);
        int databaseSizeBeforeDelete = pieceJointeRepository.findAll().size();

        // Get the pieceJointe
        restPieceJointeMockMvc.perform(delete("/api/piece-jointes/{id}", pieceJointe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PieceJointe> pieceJointeList = pieceJointeRepository.findAll();
        assertThat(pieceJointeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PieceJointe.class);
        PieceJointe pieceJointe1 = new PieceJointe();
        pieceJointe1.setId(1L);
        PieceJointe pieceJointe2 = new PieceJointe();
        pieceJointe2.setId(pieceJointe1.getId());
        assertThat(pieceJointe1).isEqualTo(pieceJointe2);
        pieceJointe2.setId(2L);
        assertThat(pieceJointe1).isNotEqualTo(pieceJointe2);
        pieceJointe1.setId(null);
        assertThat(pieceJointe1).isNotEqualTo(pieceJointe2);
    }
}
