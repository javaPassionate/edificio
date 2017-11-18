import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Projet e2e test', () => {

    let navBarPage: NavBarPage;
    let projetDialogPage: ProjetDialogPage;
    let projetComponentsPage: ProjetComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Projets', () => {
        navBarPage.goToEntity('projet');
        projetComponentsPage = new ProjetComponentsPage();
        expect(projetComponentsPage.getTitle()).toMatch(/Projets/);

    });

    it('should load create Projet dialog', () => {
        projetComponentsPage.clickOnCreateButton();
        projetDialogPage = new ProjetDialogPage();
        expect(projetDialogPage.getModalTitle()).toMatch(/Create or edit a Projet/);
        projetDialogPage.close();
    });

    it('should create and save Projets', () => {
        projetComponentsPage.clickOnCreateButton();
        projetDialogPage.setProjetInput('projet');
        expect(projetDialogPage.getProjetInput()).toMatch('projet');
        projetDialogPage.setNumeroProjetInput('numeroProjet');
        expect(projetDialogPage.getNumeroProjetInput()).toMatch('numeroProjet');
        projetDialogPage.setMoInput('mo');
        expect(projetDialogPage.getMoInput()).toMatch('mo');
        projetDialogPage.setModInput('mod');
        expect(projetDialogPage.getModInput()).toMatch('mod');
        projetDialogPage.setArchitectureInput('architecture');
        expect(projetDialogPage.getArchitectureInput()).toMatch('architecture');
        projetDialogPage.setBetInput('bet');
        expect(projetDialogPage.getBetInput()).toMatch('bet');
        projetDialogPage.save();
        expect(projetDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProjetComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-projet div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProjetDialogPage {
    modalTitle = element(by.css('h4#myProjetLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    projetInput = element(by.css('input#field_projet'));
    numeroProjetInput = element(by.css('input#field_numeroProjet'));
    moInput = element(by.css('input#field_mo'));
    modInput = element(by.css('input#field_mod'));
    architectureInput = element(by.css('input#field_architecture'));
    betInput = element(by.css('input#field_bet'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setProjetInput = function (projet) {
        this.projetInput.sendKeys(projet);
    }

    getProjetInput = function () {
        return this.projetInput.getAttribute('value');
    }

    setNumeroProjetInput = function (numeroProjet) {
        this.numeroProjetInput.sendKeys(numeroProjet);
    }

    getNumeroProjetInput = function () {
        return this.numeroProjetInput.getAttribute('value');
    }

    setMoInput = function (mo) {
        this.moInput.sendKeys(mo);
    }

    getMoInput = function () {
        return this.moInput.getAttribute('value');
    }

    setModInput = function (mod) {
        this.modInput.sendKeys(mod);
    }

    getModInput = function () {
        return this.modInput.getAttribute('value');
    }

    setArchitectureInput = function (architecture) {
        this.architectureInput.sendKeys(architecture);
    }

    getArchitectureInput = function () {
        return this.architectureInput.getAttribute('value');
    }

    setBetInput = function (bet) {
        this.betInput.sendKeys(bet);
    }

    getBetInput = function () {
        return this.betInput.getAttribute('value');
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
