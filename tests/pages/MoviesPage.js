import {expect} from "@playwright/test";

export class MoviesPage {
    constructor(page) {
        this.page = page
    }

    async isLoggedIn(){
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async openForm(){
        /*
        a[href^="register"] => $ localizador com expressão regular que procura dentro do elemento 'a' a propriedade 'href' com o valor que inicia com 'register'
        a[href$="register"] => $ localizador com expressão regular que procura dentro do elemento 'a' a propriedade 'href' com o valor que termina com 'register'
        a[href*="register"] => * localizador com expressão regular que procura dentro do elemento 'a' a propriedade 'href' com o valor que contém 'register'
     */
        await this.page.locator('a[href$="register"]').click()
    }

    async submitForm(){
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async insertMovie(title, overview, company, release_year){
        await this.openForm()
        /*
            locator('#title]') # localizador que procura elemento com id 'title'
            locator('input[name=title]') localizador que procura dentro do elemento 'input' a propriedade 'name' com o valor igual a 'title'

            Como o elemento de entrada do título do filme (input=title) está conectado ao elemento pai label no código html pela instrução 'label for(id)', onde id=title, é possivel localizar o elemento de input pelo label do elemento pai
         */
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator').click()

        //const contextHTML = this.page.context()
        //console.log(contextHTML)
        /*
        . selecionar elemnto pela classe
         */
        await this.page.locator('.react-select__option').filter({hasText: company}).click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({hasText: release_year}).click()

        await this.submitForm()

    }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

}