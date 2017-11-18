package com.mm.edificio.web.rest;

import com.mm.edificio.MrsPiloteApp;

import com.mm.edificio.domain.CourrierArrive;
import com.mm.edificio.repository.CourrierArriveRepository;
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
 * Test class for the CourrierArriveResource REST controller.
 *
 * @see CourrierArriveResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MrsPiloteApp.class)
public class CourrierArriveResourceIntTest {

    private static final String DEFAULT_NUMERO_COURRIER_DEPART = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_COURRIER_DEPART = "BBBBBBBBBB";

    private static final String DEFAULT_ENVOYE_PAR = "AAAAAAAAAA";
    private static final String UPDATED_ENVOYE_PAR = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_RECEPTION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_RECEPTION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CourrierArriveRepository courrierArriveRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCourrierArriveMockMvc;

    private CourrierArrive courrierArrive;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourrierArriveResource courrierArriveResource = new CourrierArriveResource(courrierArriveRepository);
        this.restCourrierArriveMockMvc = MockMvcBuilders.standaloneSetup(courrierArriveResource)
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
    public static CourrierArrive createEntity(EntityManager em) {
        CourrierArrive courrierArrive = new CourrierArrive()
            .numeroCourrierDepart(DEFAULT_NUMERO_COURRIER_DEPART)
            .envoyePar(DEFAULT_ENVOYE_PAR)
            .dateReception(DEFAULT_DATE_RECEPTION);
        return courrierArrive;
    }

    @Before
    public void initTest() {
        courrierArrive = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourrierArrive() throws Exception {
        int databaseSizeBeforeCreate = courrierArriveRepository.findAll().size();

        // Create the CourrierArrive
        restCourrierArriveMockMvc.perform(post("/api/courrier-arrives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrierArrive)))
            .andExpect(status().isCreated());

        // Validate the CourrierArrive in the database
        List<CourrierArrive> courrierArriveList = courrierArriveRepository.findAll();
        assertThat(courrierArriveList).hasSize(databaseSizeBeforeCreate + 1);
        CourrierArrive testCourrierArrive = courrierArriveList.get(courrierArriveList.size() - 1);
        assertThat(testCourrierArrive.getNumeroCourrierDepart()).isEqualTo(DEFAULT_NUMERO_COURRIER_DEPART);
        assertThat(testCourrierArrive.getEnvoyePar()).isEqualTo(DEFAULT_ENVOYE_PAR);
        assertThat(testCourrierArrive.getDateReception()).isEqualTo(DEFAULT_DATE_RECEPTION);
    }

    @Test
    @Transactional
    public void createCourrierArriveWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courrierArriveRepository.findAll().size();

        // Create the CourrierArrive with an existing ID
        courrierArrive.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourrierArriveMockMvc.perform(post("/api/courrier-arrives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrierArrive)))
            .andExpect(status().isBadRequest());

        // Validate the CourrierArrive in the database
        List<CourrierArrive> courrierArriveList = courrierArriveRepository.findAll();
        assertThat(courrierArriveList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumeroCourrierDepartIsRequired() throws Exception {
        int databaseSizeBeforeTest = courrierArriveRepository.findAll().size();
        // set the field null
        courrierArrive.setNumeroCourrierDepart(null);

        // Create the CourrierArrive, which fails.

        restCourrierArriveMockMvc.perform(post("/api/courrier-arrives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrierArrive)))
            .andExpect(status().isBadRequest());

        List<CourrierArrive> courrierArriveList = courrierArriveRepository.findAll();
        assertThat(courrierArriveList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCourrierArrives() throws Exception {
        // Initialize the database
        courrierArriveRepository.saveAndFlush(courrierArrive);

        // Get all the courrierArriveList
        restCourrierArriveMockMvc.perform(get("/api/courrier-arrives?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courrierArrive.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroCourrierDepart").value(hasItem(DEFAULT_NUMERO_COURRIER_DEPART.toString())))
            .andExpect(jsonPath("$.[*].envoyePar").value(hasItem(DEFAULT_ENVOYE_PAR.toString())))
            .andExpect(jsonPath("$.[*].dateReception").value(hasItem(DEFAULT_DATE_RECEPTION.toString())));
    }

    @Test
    @Transactional
    public void getCourrierArrive() throws Exception {
        // Initialize the database
        courrierArriveRepository.saveAndFlush(courrierArrive);

        // Get the courrierArrive
        restCourrierArriveMockMvc.perform(get("/api/courrier-arrives/{id}", courrierArrive.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(courrierArrive.getId().intValue()))
            .andExpect(jsonPath("$.numeroCourrierDepart").value(DEFAULT_NUMERO_COURRIER_DEPART.toString()))
            .andExpect(jsonPath("$.envoyePar").value(DEFAULT_ENVOYE_PAR.toString()))
            .andExpect(jsonPath("$.dateReception").value(DEFAULT_DATE_RECEPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCourrierArrive() throws Exception {
        // Get the courrierArrive
        restCourrierArriveMockMvc.perform(get("/api/courrier-arrives/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourrierArrive() throws Exception {
        // Initialize the database
        courrierArriveRepository.saveAndFlush(courrierArrive);
        int databaseSizeBeforeUpdate = courrierArriveRepository.findAll().size();

        // Update the courrierArrive
        CourrierArrive updatedCourrierArrive = courrierArriveRepository.findOne(courrierArrive.getId());
        updatedCourrierArrive
            .numeroCourrierDepart(UPDATED_NUMERO_COURRIER_DEPART)
            .envoyePar(UPDATED_ENVOYE_PAR)
            .dateReception(UPDATED_DATE_RECEPTION);

        restCourrierArriveMockMvc.perform(put("/api/courrier-arrives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCourrierArrive)))
            .andExpect(status().isOk());

        // Validate the CourrierArrive in the database
        List<CourrierArrive> courrierArriveList = courrierArriveRepository.findAll();
        assertThat(courrierArriveList).hasSize(databaseSizeBeforeUpdate);
        CourrierArrive testCourrierArrive = courrierArriveList.get(courrierArriveList.size() - 1);
        assertThat(testCourrierArrive.getNumeroCourrierDepart()).isEqualTo(UPDATED_NUMERO_COURRIER_DEPART);
        assertThat(testCourrierArrive.getEnvoyePar()).isEqualTo(UPDATED_ENVOYE_PAR);
        assertThat(testCourrierArrive.getDateReception()).isEqualTo(UPDATED_DATE_RECEPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingCourrierArrive() throws Exception {
        int databaseSizeBeforeUpdate = courrierArriveRepository.findAll().size();

        // Create the CourrierArrive

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourrierArriveMockMvc.perform(put("/api/courrier-arrives")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrierArrive)))
            .andExpect(status().isCreated());

        // Validate the CourrierArrive in the database
        List<CourrierArrive> courrierArriveList = courrierArriveRepository.findAll();
        assertThat(courrierArriveList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCourrierArrive() throws Exception {
        // Initialize the database
        courrierArriveRepository.saveAndFlush(courrierArrive);
        int databaseSizeBeforeDelete = courrierArriveRepository.findAll().size();

        // Get the courrierArrive
        restCourrierArriveMockMvc.perform(delete("/api/courrier-arrives/{id}", courrierArrive.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CourrierArrive> courrierArriveList = courrierArriveRepository.findAll();
        assertThat(courrierArriveList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourrierArrive.class);
        CourrierArrive courrierArrive1 = new CourrierArrive();
        courrierArrive1.setId(1L);
        CourrierArrive courrierArrive2 = new CourrierArrive();
        courrierArrive2.setId(courrierArrive1.getId());
        assertThat(courrierArrive1).isEqualTo(courrierArrive2);
        courrierArrive2.setId(2L);
        assertThat(courrierArrive1).isNotEqualTo(courrierArrive2);
        courrierArrive1.setId(null);
        assertThat(courrierArrive1).isNotEqualTo(courrierArrive2);
    }
}
