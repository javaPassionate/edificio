import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Plan e2e test', () => {

    let navBarPage: NavBarPage;
    let planDialogPage: PlanDialogPage;
    let planComponentsPage: PlanComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Plans', () => {
        navBarPage.goToEntity('plan');
        planComponentsPage = new PlanComponentsPage();
        expect(planComponentsPage.getTitle()).toMatch(/Plans/);

    });

    it('should load create Plan dialog', () => {
        planComponentsPage.clickOnCreateButton();
        planDialogPage = new PlanDialogPage();
        expect(planDialogPage.getModalTitle()).toMatch(/Create or edit a Plan/);
        planDialogPage.close();
    });

    it('should create and save Plans', () => {
        planComponentsPage.clickOnCreateButton();
        planDialogPage.setNumeroPlanInput('numeroPlan');
        expect(planDialogPage.getNumeroPlanInput()).toMatch('numeroPlan');
        planDialogPage.setTypePlanInput('typePlan');
        expect(planDialogPage.getTypePlanInput()).toMatch('typePlan');
        planDialogPage.setContenuPlanInput('contenuPlan');
        expect(planDialogPage.getContenuPlanInput()).toMatch('contenuPlan');
        planDialogPage.numeroProjetSelectLastOption();
        planDialogPage.save();
        expect(planDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PlanComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-plan div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PlanDialogPage {
    modalTitle = element(by.css('h4#myPlanLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numeroPlanInput = element(by.css('input#field_numeroPlan'));
    typePlanInput = element(by.css('input#field_typePlan'));
    contenuPlanInput = element(by.css('input#field_contenuPlan'));
    numeroProjetSelect = element(by.css('select#field_numeroProjet'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNumeroPlanInput = function (numeroPlan) {
        this.numeroPlanInput.sendKeys(numeroPlan);
    }

    getNumeroPlanInput = function () {
        return this.numeroPlanInput.getAttribute('value');
    }

    setTypePlanInput = function (typePlan) {
        this.typePlanInput.sendKeys(typePlan);
    }

    getTypePlanInput = function () {
        return this.typePlanInput.getAttribute('value');
    }

    setContenuPlanInput = function (contenuPlan) {
        this.contenuPlanInput.sendKeys(contenuPlan);
    }

    getContenuPlanInput = function () {
        return this.contenuPlanInput.getAttribute('value');
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
