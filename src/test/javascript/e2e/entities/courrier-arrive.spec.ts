import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('CourrierArrive e2e test', () => {

    let navBarPage: NavBarPage;
    let courrierArriveDialogPage: CourrierArriveDialogPage;
    let courrierArriveComponentsPage: CourrierArriveComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CourrierArrives', () => {
        navBarPage.goToEntity('courrier-arrive');
        courrierArriveComponentsPage = new CourrierArriveComponentsPage();
        expect(courrierArriveComponentsPage.getTitle()).toMatch(/Courrier Arrives/);

    });

    it('should load create CourrierArrive dialog', () => {
        courrierArriveComponentsPage.clickOnCreateButton();
        courrierArriveDialogPage = new CourrierArriveDialogPage();
        expect(courrierArriveDialogPage.getModalTitle()).toMatch(/Create or edit a Courrier Arrive/);
        courrierArriveDialogPage.close();
    });

    it('should create and save CourrierArrives', () => {
        courrierArriveComponentsPage.clickOnCreateButton();
        courrierArriveDialogPage.setNumeroCourrierDepartInput('numeroCourrierDepart');
        expect(courrierArriveDialogPage.getNumeroCourrierDepartInput()).toMatch('numeroCourrierDepart');
        courrierArriveDialogPage.setEnvoyeParInput('envoyePar');
        expect(courrierArriveDialogPage.getEnvoyeParInput()).toMatch('envoyePar');
        courrierArriveDialogPage.setDateReceptionInput('2000-12-31');
        expect(courrierArriveDialogPage.getDateReceptionInput()).toMatch('2000-12-31');
        courrierArriveDialogPage.numeroProjetSelectLastOption();
        courrierArriveDialogPage.save();
        expect(courrierArriveDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CourrierArriveComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-courrier-arrive div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CourrierArriveDialogPage {
    modalTitle = element(by.css('h4#myCourrierArriveLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numeroCourrierDepartInput = element(by.css('input#field_numeroCourrierDepart'));
    envoyeParInput = element(by.css('input#field_envoyePar'));
    dateReceptionInput = element(by.css('input#field_dateReception'));
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

    setEnvoyeParInput = function (envoyePar) {
        this.envoyeParInput.sendKeys(envoyePar);
    }

    getEnvoyeParInput = function () {
        return this.envoyeParInput.getAttribute('value');
    }

    setDateReceptionInput = function (dateReception) {
        this.dateReceptionInput.sendKeys(dateReception);
    }

    getDateReceptionInput = function () {
        return this.dateReceptionInput.getAttribute('value');
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
