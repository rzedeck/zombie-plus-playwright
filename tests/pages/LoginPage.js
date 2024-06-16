import {expect } from "@playwright/test";

export class LoginPage{

    constructor(page){
        this.page = page
    }

    async visit(){
        await this.page.goto('http://localhost:3000/admin/login')
        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submitLoginForm(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.locator('//button[text()="Entrar"]').click()
        //await this.page.getByText('Entrar').click()
    }

    async alertHaveText(target){
        await expect(this.page.locator('span[class$=alert]')).toHaveText(target)
    }
}