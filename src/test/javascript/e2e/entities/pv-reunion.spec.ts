import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('PvReunion e2e test', () => {

    let navBarPage: NavBarPage;
    let pvReunionDialogPage: PvReunionDialogPage;
    let pvReunionComponentsPage: PvReunionComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PvReunions', () => {
        navBarPage.goToEntity('pv-reunion');
        pvReunionComponentsPage = new PvReunionComponentsPage();
        expect(pvReunionComponentsPage.getTitle()).toMatch(/Pv Reunions/);

    });

    it('should load create PvReunion dialog', () => {
        pvReunionComponentsPage.clickOnCreateButton();
        pvReunionDialogPage = new PvReunionDialogPage();
        expect(pvReunionDialogPage.getModalTitle()).toMatch(/Create or edit a Pv Reunion/);
        pvReunionDialogPage.close();
    });

    it('should create and save PvReunions', () => {
        pvReunionComponentsPage.clickOnCreateButton();
        pvReunionDialogPage.setNumeroPvInput('numeroPv');
        expect(pvReunionDialogPage.getNumeroPvInput()).toMatch('numeroPv');
        pvReunionDialogPage.setDatePvInput('2000-12-31');
        expect(pvReunionDialogPage.getDatePvInput()).toMatch('2000-12-31');
        pvReunionDialogPage.numeroProjetSelectLastOption();
        pvReunionDialogPage.save();
        expect(pvReunionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PvReunionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-pv-reunion div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PvReunionDialogPage {
    modalTitle = element(by.css('h4#myPvReunionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numeroPvInput = element(by.css('input#field_numeroPv'));
    datePvInput = element(by.css('input#field_datePv'));
    numeroProjetSelect = element(by.css('select#field_numeroProjet'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNumeroPvInput = function (numeroPv) {
        this.numeroPvInput.sendKeys(numeroPv);
    }

    getNumeroPvInput = function () {
        return this.numeroPvInput.getAttribute('value');
    }

    setDatePvInput = function (datePv) {
        this.datePvInput.sendKeys(datePv);
    }

    getDatePvInput = function () {
        return this.datePvInput.getAttribute('value');
    }

    numeroProjetSelectLastOption = function () {
        this.numeroProjetSelect.all(by.tagName('option')).last().click();
    }

    numeroProjetSelectOption = function (option) {
        this.numeroProjetSelect.sendKeys(option);
    }

    getNumeroProjetSelect = function () {
        return this.numeroProjetSelect;
    }

    getNumeroProjetSelectedOption = function () {
        return this.numeroProjetSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
