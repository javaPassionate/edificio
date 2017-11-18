package com.mm.edificio.web.rest;

import com.mm.edificio.MrsPiloteApp;

import com.mm.edificio.domain.PvReunion;
import com.mm.edificio.repository.PvReunionRepository;
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
 * Test class for the PvReunionResource REST controller.
 *
 * @see PvReunionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MrsPiloteApp.class)
public class PvReunionResourceIntTest {

    private static final String DEFAULT_NUMERO_PV = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_PV = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_PV = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_PV = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PvReunionRepository pvReunionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPvReunionMockMvc;

    private PvReunion pvReunion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PvReunionResource pvReunionResource = new PvReunionResource(pvReunionRepository);
        this.restPvReunionMockMvc = MockMvcBuilders.standaloneSetup(pvReunionResource)
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
    public static PvReunion createEntity(EntityManager em) {
        PvReunion pvReunion = new PvReunion()
            .numeroPv(DEFAULT_NUMERO_PV)
            .datePv(DEFAULT_DATE_PV);
        return pvReunion;
    }

    @Before
    public void initTest() {
        pvReunion = createEntity(em);
    }

    @Test
    @Transactional
    public void createPvReunion() throws Exception {
        int databaseSizeBeforeCreate = pvReunionRepository.findAll().size();

        // Create the PvReunion
        restPvReunionMockMvc.perform(post("/api/pv-reunions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pvReunion)))
            .andExpect(status().isCreated());

        // Validate the PvReunion in the database
        List<PvReunion> pvReunionList = pvReunionRepository.findAll();
        assertThat(pvReunionList).hasSize(databaseSizeBeforeCreate + 1);
        PvReunion testPvReunion = pvReunionList.get(pvReunionList.size() - 1);
        assertThat(testPvReunion.getNumeroPv()).isEqualTo(DEFAULT_NUMERO_PV);
        assertThat(testPvReunion.getDatePv()).isEqualTo(DEFAULT_DATE_PV);
    }

    @Test
    @Transactional
    public void createPvReunionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pvReunionRepository.findAll().size();

        // Create the PvReunion with an existing ID
        pvReunion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPvReunionMockMvc.perform(post("/api/pv-reunions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pvReunion)))
            .andExpect(status().isBadRequest());

        // Validate the PvReunion in the database
        List<PvReunion> pvReunionList = pvReunionRepository.findAll();
        assertThat(pvReunionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumeroPvIsRequired() throws Exception {
        int databaseSizeBeforeTest = pvReunionRepository.findAll().size();
        // set the field null
        pvReunion.setNumeroPv(null);

        // Create the PvReunion, which fails.

        restPvReunionMockMvc.perform(post("/api/pv-reunions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pvReunion)))
            .andExpect(status().isBadRequest());

        List<PvReunion> pvReunionList = pvReunionRepository.findAll();
        assertThat(pvReunionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPvReunions() throws Exception {
        // Initialize the database
        pvReunionRepository.saveAndFlush(pvReunion);

        // Get all the pvReunionList
        restPvReunionMockMvc.perform(get("/api/pv-reunions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pvReunion.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroPv").value(hasItem(DEFAULT_NUMERO_PV.toString())))
            .andExpect(jsonPath("$.[*].datePv").value(hasItem(DEFAULT_DATE_PV.toString())));
    }

    @Test
    @Transactional
    public void getPvReunion() throws Exception {
        // Initialize the database
        pvReunionRepository.saveAndFlush(pvReunion);

        // Get the pvReunion
        restPvReunionMockMvc.perform(get("/api/pv-reunions/{id}", pvReunion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pvReunion.getId().intValue()))
            .andExpect(jsonPath("$.numeroPv").value(DEFAULT_NUMERO_PV.toString()))
            .andExpect(jsonPath("$.datePv").value(DEFAULT_DATE_PV.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPvReunion() throws Exception {
        // Get the pvReunion
        restPvReunionMockMvc.perform(get("/api/pv-reunions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePvReunion() throws Exception {
        // Initialize the database
        pvReunionRepository.saveAndFlush(pvReunion);
        int databaseSizeBeforeUpdate = pvReunionRepository.findAll().size();

        // Update the pvReunion
        PvReunion updatedPvReunion = pvReunionRepository.findOne(pvReunion.getId());
        updatedPvReunion
            .numeroPv(UPDATED_NUMERO_PV)
            .datePv(UPDATED_DATE_PV);

        restPvReunionMockMvc.perform(put("/api/pv-reunions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPvReunion)))
            .andExpect(status().isOk());

        // Validate the PvReunion in the database
        List<PvReunion> pvReunionList = pvReunionRepository.findAll();
        assertThat(pvReunionList).hasSize(databaseSizeBeforeUpdate);
        PvReunion testPvReunion = pvReunionList.get(pvReunionList.size() - 1);
        assertThat(testPvReunion.getNumeroPv()).isEqualTo(UPDATED_NUMERO_PV);
        assertThat(testPvReunion.getDatePv()).isEqualTo(UPDATED_DATE_PV);
    }

    @Test
    @Transactional
    public void updateNonExistingPvReunion() throws Exception {
        int databaseSizeBeforeUpdate = pvReunionRepository.findAll().size();

        // Create the PvReunion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPvReunionMockMvc.perform(put("/api/pv-reunions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pvReunion)))
            .andExpect(status().isCreated());

        // Validate the PvReunion in the database
        List<PvReunion> pvReunionList = pvReunionRepository.findAll();
        assertThat(pvReunionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePvReunion() throws Exception {
        // Initialize the database
        pvReunionRepository.saveAndFlush(pvReunion);
        int databaseSizeBeforeDelete = pvReunionRepository.findAll().size();

        // Get the pvReunion
        restPvReunionMockMvc.perform(delete("/api/pv-reunions/{id}", pvReunion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PvReunion> pvReunionList = pvReunionRepository.findAll();
        assertThat(pvReunionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PvReunion.class);
        PvReunion pvReunion1 = new PvReunion();
        pvReunion1.setId(1L);
        PvReunion pvReunion2 = new PvReunion();
        pvReunion2.setId(pvReunion1.getId());
        assertThat(pvReunion1).isEqualTo(pvReunion2);
        pvReunion2.setId(2L);
        assertThat(pvReunion1).isNotEqualTo(pvReunion2);
        pvReunion1.setId(null);
        assertThat(pvReunion1).isNotEqualTo(pvReunion2);
    }
}
