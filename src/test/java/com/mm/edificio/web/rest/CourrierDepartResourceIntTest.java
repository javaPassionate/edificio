package com.mm.edificio.web.rest;

import com.mm.edificio.MrsPiloteApp;

import com.mm.edificio.domain.CourrierDepart;
import com.mm.edificio.repository.CourrierDepartRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mm.edificio.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CourrierDepartResource REST controller.
 *
 * @see CourrierDepartResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MrsPiloteApp.class)
public class CourrierDepartResourceIntTest {

    private static final String DEFAULT_NUMERO_COURRIER_DEPART = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_COURRIER_DEPART = "BBBBBBBBBB";

    private static final String DEFAULT_DESTINATAIRE = "AAAAAAAAAA";
    private static final String UPDATED_DESTINATAIRE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_ENVOI = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ENVOI = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CourrierDepartRepository courrierDepartRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCourrierDepartMockMvc;

    private CourrierDepart courrierDepart;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourrierDepartResource courrierDepartResource = new CourrierDepartResource(courrierDepartRepository);
        this.restCourrierDepartMockMvc = MockMvcBuilders.standaloneSetup(courrierDepartResource)
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
    public static CourrierDepart createEntity(EntityManager em) {
        CourrierDepart courrierDepart = new CourrierDepart()
            .numeroCourrierDepart(DEFAULT_NUMERO_COURRIER_DEPART)
            .destinataire(DEFAULT_DESTINATAIRE)
            .dateEnvoi(DEFAULT_DATE_ENVOI);
        return courrierDepart;
    }

    @Before
    public void initTest() {
        courrierDepart = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourrierDepart() throws Exception {
        int databaseSizeBeforeCreate = courrierDepartRepository.findAll().size();

        // Create the CourrierDepart
        restCourrierDepartMockMvc.perform(post("/api/courrier-departs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrierDepart)))
            .andExpect(status().isCreated());

        // Validate the CourrierDepart in the database
        List<CourrierDepart> courrierDepartList = courrierDepartRepository.findAll();
        assertThat(courrierDepartList).hasSize(databaseSizeBeforeCreate + 1);
        CourrierDepart testCourrierDepart = courrierDepartList.get(courrierDepartList.size() - 1);
        assertThat(testCourrierDepart.getNumeroCourrierDepart()).isEqualTo(DEFAULT_NUMERO_COURRIER_DEPART);
        assertThat(testCourrierDepart.getDestinataire()).isEqualTo(DEFAULT_DESTINATAIRE);
        assertThat(testCourrierDepart.getDateEnvoi()).isEqualTo(DEFAULT_DATE_ENVOI);
    }

    @Test
    @Transactional
    public void createCourrierDepartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courrierDepartRepository.findAll().size();

        // Create the CourrierDepart with an existing ID
        courrierDepart.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourrierDepartMockMvc.perform(post("/api/courrier-departs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrierDepart)))
            .andExpect(status().isBadRequest());

        // Validate the CourrierDepart in the database
        List<CourrierDepart> courrierDepartList = courrierDepartRepository.findAll();
        assertThat(courrierDepartList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumeroCourrierDepartIsRequired() throws Exception {
        int databaseSizeBeforeTest = courrierDepartRepository.findAll().size();
        // set the field null
        courrierDepart.setNumeroCourrierDepart(null);

        // Create the CourrierDepart, which fails.

        restCourrierDepartMockMvc.perform(post("/api/courrier-departs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrierDepart)))
            .andExpect(status().isBadRequest());

        List<CourrierDepart> courrierDepartList = courrierDepartRepository.findAll();
        assertThat(courrierDepartList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCourrierDeparts() throws Exception {
        // Initialize the database
        courrierDepartRepository.saveAndFlush(courrierDepart);

        // Get all the courrierDepartList
        restCourrierDepartMockMvc.perform(get("/api/courrier-departs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courrierDepart.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroCourrierDepart").value(hasItem(DEFAULT_NUMERO_COURRIER_DEPART.toString())))
            .andExpect(jsonPath("$.[*].destinataire").value(hasItem(DEFAULT_DESTINATAIRE.toString())))
            .andExpect(jsonPath("$.[*].dateEnvoi").value(hasItem(DEFAULT_DATE_ENVOI.toString())));
    }

    @Test
    @Transactional
    public void getCourrierDepart() throws Exception {
        // Initialize the database
        courrierDepartRepository.saveAndFlush(courrierDepart);

        // Get the courrierDepart
        restCourrierDepartMockMvc.perform(get("/api/courrier-departs/{id}", courrierDepart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(courrierDepart.getId().intValue()))
            .andExpect(jsonPath("$.numeroCourrierDepart").value(DEFAULT_NUMERO_COURRIER_DEPART.toString()))
            .andExpect(jsonPath("$.destinataire").value(DEFAULT_DESTINATAIRE.toString()))
            .andExpect(jsonPath("$.dateEnvoi").value(DEFAULT_DATE_ENVOI.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCourrierDepart() throws Exception {
        // Get the courrierDepart
        restCourrierDepartMockMvc.perform(get("/api/courrier-departs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourrierDepart() throws Exception {
        // Initialize the database
        courrierDepartRepository.saveAndFlush(courrierDepart);
        int databaseSizeBeforeUpdate = courrierDepartRepository.findAll().size();

        // Update the courrierDepart
        CourrierDepart updatedCourrierDepart = courrierDepartRepository.findOne(courrierDepart.getId());
        updatedCourrierDepart
            .numeroCourrierDepart(UPDATED_NUMERO_COURRIER_DEPART)
            .destinataire(UPDATED_DESTINATAIRE)
            .dateEnvoi(UPDATED_DATE_ENVOI);

        restCourrierDepartMockMvc.perform(put("/api/courrier-departs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCourrierDepart)))
            .andExpect(status().isOk());

        // Validate the CourrierDepart in the database
        List<CourrierDepart> courrierDepartList = courrierDepartRepository.findAll();
        assertThat(courrierDepartList).hasSize(databaseSizeBeforeUpdate);
        CourrierDepart testCourrierDepart = courrierDepartList.get(courrierDepartList.size() - 1);
        assertThat(testCourrierDepart.getNumeroCourrierDepart()).isEqualTo(UPDATED_NUMERO_COURRIER_DEPART);
        assertThat(testCourrierDepart.getDestinataire()).isEqualTo(UPDATED_DESTINATAIRE);
        assertThat(testCourrierDepart.getDateEnvoi()).isEqualTo(UPDATED_DATE_ENVOI);
    }

    @Test
    @Transactional
    public void updateNonExistingCourrierDepart() throws Exception {
        int databaseSizeBeforeUpdate = courrierDepartRepository.findAll().size();

        // Create the CourrierDepart

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourrierDepartMockMvc.perform(put("/api/courrier-departs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrierDepart)))
            .andExpect(status().isCreated());

        // Validate the CourrierDepart in the database
        List<CourrierDepart> courrierDepartList = courrierDepartRepository.findAll();
        assertThat(courrierDepartList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCourrierDepart() throws Exception {
        // Initialize the database
        courrierDepartRepository.saveAndFlush(courrierDepart);
        int databaseSizeBeforeDelete = courrierDepartRepository.findAll().size();

        // Get the courrierDepart
        restCourrierDepartMockMvc.perform(delete("/api/courrier-departs/{id}", courrierDepart.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CourrierDepart> courrierDepartList = courrierDepartRepository.findAll();
        assertThat(courrierDepartList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourrierDepart.class);
        CourrierDepart courrierDepart1 = new CourrierDepart();
        courrierDepart1.setId(1L);
        CourrierDepart courrierDepart2 = new CourrierDepart();
        courrierDepart2.setId(courrierDepart1.getId());
        assertThat(courrierDepart1).isEqualTo(courrierDepart2);
        courrierDepart2.setId(2L);
        assertThat(courrierDepart1).isNotEqualTo(courrierDepart2);
        courrierDepart1.setId(null);
        assertThat(courrierDepart1).isNotEqualTo(courrierDepart2);
    }
}
