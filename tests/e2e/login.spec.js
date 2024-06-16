import { test } from "../support"

test('Administrator Login Válido', async ({ page}) =>{
    await page.loginPage.visit()
    await page.loginPage.submitLoginForm('admin@zombieplus.com','pwd123')
    await page.moviesPage.isLoggedIn()
})

test('Administrator Login Inválido - Senha Incorreta', async ({ page}) =>{
    await page.loginPage.visit()
    await page.loginPage.submitLoginForm('admin@zombieplus.com','abc123')
    await page.toast.haveText('Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.')
})

test('Administrator Login Inválido - Email com formato inválido', async ({ page}) =>{
    await page.loginPage.visit()
    await page.loginPage.submitLoginForm('admin.zombieplus.com','abc123')
    await page.loginPage.alertHaveText('Email incorreto')
})

test('Administrator Login Inválido - Email em branco', async ({ page}) =>{
    await page.loginPage.visit()
    await page.loginPage.submitLoginForm('','abc123')
    await page.loginPage.alertHaveText('Campo obrigatório')
})

test('Administrator Login Inválido - Senha em branco', async ({ page}) =>{
    await page.loginPage.visit()
    await page.loginPage.submitLoginForm('admin@zombieplus.com','')
    await page.loginPage.alertHaveText('Campo obrigatório')
})

test('Administrator Login Inválido - Email e Senha em branco', async ({ page}) =>{
    await page.loginPage.visit()
    await page.loginPage.submitLoginForm('','')
    await page.loginPage.alertHaveText(['Campo obrigatório','Campo obrigatório'])
})