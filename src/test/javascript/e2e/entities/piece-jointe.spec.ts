import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('PieceJointe e2e test', () => {

    let navBarPage: NavBarPage;
    let pieceJointeDialogPage: PieceJointeDialogPage;
    let pieceJointeComponentsPage: PieceJointeComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PieceJointes', () => {
        navBarPage.goToEntity('piece-jointe');
        pieceJointeComponentsPage = new PieceJointeComponentsPage();
        expect(pieceJointeComponentsPage.getTitle()).toMatch(/Piece Jointes/);

    });

    it('should load create PieceJointe dialog', () => {
        pieceJointeComponentsPage.clickOnCreateButton();
        pieceJointeDialogPage = new PieceJointeDialogPage();
        expect(pieceJointeDialogPage.getModalTitle()).toMatch(/Create or edit a Piece Jointe/);
        pieceJointeDialogPage.close();
    });

    it('should create and save PieceJointes', () => {
        pieceJointeComponentsPage.clickOnCreateButton();
        pieceJointeDialogPage.setIdPieceJointeInput('5');
        expect(pieceJointeDialogPage.getIdPieceJointeInput()).toMatch('5');
        pieceJointeDialogPage.setNameFileInput('nameFile');
        expect(pieceJointeDialogPage.getNameFileInput()).toMatch('nameFile');
        pieceJointeDialogPage.setContentInput(absolutePath);
        pieceJointeDialogPage.setPathInput('path');
        expect(pieceJointeDialogPage.getPathInput()).toMatch('path');
        pieceJointeDialogPage.courrierDepartSelectLastOption();
        pieceJointeDialogPage.courrierArriveSelectLastOption();
        pieceJointeDialogPage.pvReunionSelectLastOption();
        pieceJointeDialogPage.save();
        expect(pieceJointeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PieceJointeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-piece-jointe div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PieceJointeDialogPage {
    modalTitle = element(by.css('h4#myPieceJointeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idPieceJointeInput = element(by.css('input#field_idPieceJointe'));
    nameFileInput = element(by.css('input#field_nameFile'));
    contentInput = element(by.css('input#file_content'));
    pathInput = element(by.css('input#field_path'));
    courrierDepartSelect = element(by.css('select#field_courrierDepart'));
    courrierArriveSelect = element(by.css('select#field_courrierArrive'));
    pvReunionSelect = element(by.css('select#field_pvReunion'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setIdPieceJointeInput = function (idPieceJointe) {
        this.idPieceJointeInput.sendKeys(idPieceJointe);
    }

    getIdPieceJointeInput = function () {
        return this.idPieceJointeInput.getAttribute('value');
    }

    setNameFileInput = function (nameFile) {
        this.nameFileInput.sendKeys(nameFile);
    }

    getNameFileInput = function () {
        return this.nameFileInput.getAttribute('value');
    }

    setContentInput = function (content) {
        this.contentInput.sendKeys(content);
    }

    getContentInput = function () {
        return this.contentInput.getAttribute('value');
    }

    setPathInput = function (path) {
        this.pathInput.sendKeys(path);
    }

    getPathInput = function () {
        return this.pathInput.getAttribute('value');
    }

    courrierDepartSelectLastOption = function () {
        this.courrierDepartSelect.all(by.tagName('option')).last().click();
    }

    courrierDepartSelectOption = function (option) {
        this.courrierDepartSelect.sendKeys(option);
    }

    getCourrierDepartSelect = function () {
        return this.courrierDepartSelect;
    }

    getCourrierDepartSelectedOption = function () {
        return this.courrierDepartSelect.element(by.css('option:checked')).getText();
    }

    courrierArriveSelectLastOption = function () {
        this.courrierArriveSelect.all(by.tagName('option')).last().click();
    }

    courrierArriveSelectOption = function (option) {
        this.courrierArriveSelect.sendKeys(option);
    }

    getCourrierArriveSelect = function () {
        return this.courrierArriveSelect;
    }

    getCourrierArriveSelectedOption = function () {
        return this.courrierArriveSelect.element(by.css('option:checked')).getText();
    }

    pvReunionSelectLastOption = function () {
        this.pvReunionSelect.all(by.tagName('option')).last().click();
    }

    pvReunionSelectOption = function (option) {
        this.pvReunionSelect.sendKeys(option);
    }

    getPvReunionSelect = function () {
        return this.pvReunionSelect;
    }

    getPvReunionSelectedOption = function () {
        return this.pvReunionSelect.element(by.css('option:checked')).getText();
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
