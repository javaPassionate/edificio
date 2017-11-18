package com.mm.edificio.web.rest;

import com.mm.edificio.MrsPiloteApp;

import com.mm.edificio.domain.Projet;
import com.mm.edificio.repository.ProjetRepository;
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

import javax.persistence.EntityManager;
import java.util.List;

import static com.mm.edificio.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProjetResource REST controller.
 *
 * @see ProjetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MrsPiloteApp.class)
public class ProjetResourceIntTest {

    private static final String DEFAULT_PROJET = "AAAAAAAAAA";
    private static final String UPDATED_PROJET = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_PROJET = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_PROJET = "BBBBBBBBBB";

    private static final String DEFAULT_MO = "AAAAAAAAAA";
    private static final String UPDATED_MO = "BBBBBBBBBB";

    private static final String DEFAULT_MOD = "AAAAAAAAAA";
    private static final String UPDATED_MOD = "BBBBBBBBBB";

    private static final String DEFAULT_ARCHITECTURE = "AAAAAAAAAA";
    private static final String UPDATED_ARCHITECTURE = "BBBBBBBBBB";

    private static final String DEFAULT_BET = "AAAAAAAAAA";
    private static final String UPDATED_BET = "BBBBBBBBBB";

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProjetMockMvc;

    private Projet projet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjetResource projetResource = new ProjetResource(projetRepository);
        this.restProjetMockMvc = MockMvcBuilders.standaloneSetup(projetResource)
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
    public static Projet createEntity(EntityManager em) {
        Projet projet = new Projet()
            .projet(DEFAULT_PROJET)
            .numeroProjet(DEFAULT_NUMERO_PROJET)
            .mo(DEFAULT_MO)
            .mod(DEFAULT_MOD)
            .architecture(DEFAULT_ARCHITECTURE)
            .bet(DEFAULT_BET);
        return projet;
    }

    @Before
    public void initTest() {
        projet = createEntity(em);
    }

    @Test
    @Transactional
    public void createProjet() throws Exception {
        int databaseSizeBeforeCreate = projetRepository.findAll().size();

        // Create the Projet
        restProjetMockMvc.perform(post("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isCreated());

        // Validate the Projet in the database
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeCreate + 1);
        Projet testProjet = projetList.get(projetList.size() - 1);
        assertThat(testProjet.getProjet()).isEqualTo(DEFAULT_PROJET);
        assertThat(testProjet.getNumeroProjet()).isEqualTo(DEFAULT_NUMERO_PROJET);
        assertThat(testProjet.getMo()).isEqualTo(DEFAULT_MO);
        assertThat(testProjet.getMod()).isEqualTo(DEFAULT_MOD);
        assertThat(testProjet.getArchitecture()).isEqualTo(DEFAULT_ARCHITECTURE);
        assertThat(testProjet.getBet()).isEqualTo(DEFAULT_BET);
    }

    @Test
    @Transactional
    public void createProjetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projetRepository.findAll().size();

        // Create the Projet with an existing ID
        projet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjetMockMvc.perform(post("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isBadRequest());

        // Validate the Projet in the database
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkProjetIsRequired() throws Exception {
        int databaseSizeBeforeTest = projetRepository.findAll().size();
        // set the field null
        projet.setProjet(null);

        // Create the Projet, which fails.

        restProjetMockMvc.perform(post("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isBadRequest());

        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroProjetIsRequired() throws Exception {
        int databaseSizeBeforeTest = projetRepository.findAll().size();
        // set the field null
        projet.setNumeroProjet(null);

        // Create the Projet, which fails.

        restProjetMockMvc.perform(post("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isBadRequest());

        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProjets() throws Exception {
        // Initialize the database
        projetRepository.saveAndFlush(projet);

        // Get all the projetList
        restProjetMockMvc.perform(get("/api/projets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projet.getId().intValue())))
            .andExpect(jsonPath("$.[*].projet").value(hasItem(DEFAULT_PROJET.toString())))
            .andExpect(jsonPath("$.[*].numeroProjet").value(hasItem(DEFAULT_NUMERO_PROJET.toString())))
            .andExpect(jsonPath("$.[*].mo").value(hasItem(DEFAULT_MO.toString())))
            .andExpect(jsonPath("$.[*].mod").value(hasItem(DEFAULT_MOD.toString())))
            .andExpect(jsonPath("$.[*].architecture").value(hasItem(DEFAULT_ARCHITECTURE.toString())))
            .andExpect(jsonPath("$.[*].bet").value(hasItem(DEFAULT_BET.toString())));
    }

    @Test
    @Transactional
    public void getProjet() throws Exception {
        // Initialize the database
        projetRepository.saveAndFlush(projet);

        // Get the projet
        restProjetMockMvc.perform(get("/api/projets/{id}", projet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(projet.getId().intValue()))
            .andExpect(jsonPath("$.projet").value(DEFAULT_PROJET.toString()))
            .andExpect(jsonPath("$.numeroProjet").value(DEFAULT_NUMERO_PROJET.toString()))
            .andExpect(jsonPath("$.mo").value(DEFAULT_MO.toString()))
            .andExpect(jsonPath("$.mod").value(DEFAULT_MOD.toString()))
            .andExpect(jsonPath("$.architecture").value(DEFAULT_ARCHITECTURE.toString()))
            .andExpect(jsonPath("$.bet").value(DEFAULT_BET.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProjet() throws Exception {
        // Get the projet
        restProjetMockMvc.perform(get("/api/projets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProjet() throws Exception {
        // Initialize the database
        projetRepository.saveAndFlush(projet);
        int databaseSizeBeforeUpdate = projetRepository.findAll().size();

        // Update the projet
        Projet updatedProjet = projetRepository.findOne(projet.getId());
        updatedProjet
            .projet(UPDATED_PROJET)
            .numeroProjet(UPDATED_NUMERO_PROJET)
            .mo(UPDATED_MO)
            .mod(UPDATED_MOD)
            .architecture(UPDATED_ARCHITECTURE)
            .bet(UPDATED_BET);

        restProjetMockMvc.perform(put("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProjet)))
            .andExpect(status().isOk());

        // Validate the Projet in the database
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeUpdate);
        Projet testProjet = projetList.get(projetList.size() - 1);
        assertThat(testProjet.getProjet()).isEqualTo(UPDATED_PROJET);
        assertThat(testProjet.getNumeroProjet()).isEqualTo(UPDATED_NUMERO_PROJET);
        assertThat(testProjet.getMo()).isEqualTo(UPDATED_MO);
        assertThat(testProjet.getMod()).isEqualTo(UPDATED_MOD);
        assertThat(testProjet.getArchitecture()).isEqualTo(UPDATED_ARCHITECTURE);
        assertThat(testProjet.getBet()).isEqualTo(UPDATED_BET);
    }

    @Test
    @Transactional
    public void updateNonExistingProjet() throws Exception {
        int databaseSizeBeforeUpdate = projetRepository.findAll().size();

        // Create the Projet

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProjetMockMvc.perform(put("/api/projets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projet)))
            .andExpect(status().isCreated());

        // Validate the Projet in the database
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProjet() throws Exception {
        // Initialize the database
        projetRepository.saveAndFlush(projet);
        int databaseSizeBeforeDelete = projetRepository.findAll().size();

        // Get the projet
        restProjetMockMvc.perform(delete("/api/projets/{id}", projet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Projet> projetList = projetRepository.findAll();
        assertThat(projetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Projet.class);
        Projet projet1 = new Projet();
        projet1.setId(1L);
        Projet projet2 = new Projet();
        projet2.setId(projet1.getId());
        assertThat(projet1).isEqualTo(projet2);
        projet2.setId(2L);
        assertThat(projet1).isNotEqualTo(projet2);
        projet1.setId(null);
        assertThat(projet1).isNotEqualTo(projet2);
    }
}
