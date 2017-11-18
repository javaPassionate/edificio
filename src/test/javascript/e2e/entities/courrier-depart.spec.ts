import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('CourrierDepart e2e test', () => {

    let navBarPage: NavBarPage;
    let courrierDepartDialogPage: CourrierDepartDialogPage;
    let courrierDepartComponentsPage: CourrierDepartComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CourrierDeparts', () => {
        navBarPage.goToEntity('courrier-depart');
        courrierDepartComponentsPage = new CourrierDepartComponentsPage();
        expect(courrierDepartComponentsPage.getTitle()).toMatch(/Courrier Departs/);

    });

    it('should load create CourrierDepart dialog', () => {
        courrierDepartComponentsPage.clickOnCreateButton();
        courrierDepartDialogPage = new CourrierDepartDialogPage();
        expect(courrierDepartDialogPage.getModalTitle()).toMatch(/Create or edit a Courrier Depart/);
        courrierDepartDialogPage.close();
    });

    it('should create and save CourrierDeparts', () => {
        courrierDepartComponentsPage.clickOnCreateButton();
        courrierDepartDialogPage.setNumeroCourrierDepartInput('numeroCourrierDepart');
        expect(courrierDepartDialogPage.getNumeroCourrierDepartInput()).toMatch('numeroCourrierDepart');
        courrierDepartDialogPage.setDestinataireInput('destinataire');
        expect(courrierDepartDialogPage.getDestinataireInput()).toMatch('destinataire');
        courrierDepartDialogPage.setDateEnvoiInput('2000-12-31');
        expect(courrierDepartDialogPage.getDateEnvoiInput()).toMatch('2000-12-31');
        courrierDepartDialogPage.numeroProjetSelectLastOption();
        courrierDepartDialogPage.save();
        expect(courrierDepartDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CourrierDepartComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-courrier-depart div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CourrierDepartDialogPage {
    modalTitle = element(by.css('h4#myCourrierDepartLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numeroCourrierDepartInput = element(by.css('input#field_numeroCourrierDepart'));
    destinataireInput = element(by.css('input#field_destinataire'));
    dateEnvoiInput = element(by.css('input#field_dateEnvoi'));
    numeroProjetSelect = element(by.css('select#field_numeroProjet'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNumeroCourrierDepartInput = function (numeroCourrierDepart) {
        this.numeroCourrierDepartInput.sendKeys(numeroCourrierDepart);
    }

    getNumeroCourrierDepartInput = function () {
        return this.numeroCourrierDepartInput.getAttribute('value');
    }

    setDestinataireInput = function (destinataire) {
        this.destinataireInput.sendKeys(destinataire);
    }

    getDestinataireInput = function () {
        return this.destinataireInput.getAttribute('value');
    }

    setDateEnvoiInput = function (dateEnvoi) {
        this.dateEnvoiInput.sendKeys(dateEnvoi);
    }

    getDateEnvoiInput = function () {
        return this.dateEnvoiInput.getAttribute('value');
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
