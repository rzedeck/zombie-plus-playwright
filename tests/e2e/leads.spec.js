import {test, expect} from "../support";
import { faker } from '@faker-js/faker'

test('Cadastro Válido de lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  await page.landingPage.visit()
  await page.landingPage.openLeadModal()
  await page.landingPage.submitLeadForm(leadName, leadEmail)
  const toastMessage = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.haveText(toastMessage)
})

test('Cadastro Inválido de lead na fila de espera - Email já cadastrado', async ({ request, page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  const newLead = await request.post('http://localhost:3333/leads',{
    data:{
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.landingPage.visit()
  await page.landingPage.openLeadModal()
  await page.landingPage.submitLeadForm(leadName, leadEmail)
  const toastMessage = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.haveText(toastMessage)
})

test('Cadastro Inválido de lead na fila de espera - Formato de Email inválido', async ({ page }) => {
  const leadName = faker.person.fullName()
  await page.landingPage.visit()
  await page.landingPage.openLeadModal()
  await page.landingPage.submitLeadForm(leadName, 'nome.email.com')
  await page.landingPage.alertHaveText('Email incorreto')
})

test('Cadastro Inválido de lead na fila de espera - Nome em branco', async ({ page }) => {
  const leadEmail = faker.internet.email()
  await page.landingPage.visit()
  await page.landingPage.openLeadModal()
  await page.landingPage.submitLeadForm('', leadEmail)
  await page.landingPage.alertHaveText('Campo obrigatório')
})

test('Cadastro Inválido de lead na fila de espera - Email em branco', async ({ page }) => {
  const leadName = faker.person.fullName()
  await page.landingPage.visit()
  await page.landingPage.openLeadModal()
  await page.landingPage.submitLeadForm(leadName, '')
  await page.landingPage.alertHaveText('Campo obrigatório')
})

test('Cadastro Inválido de lead na fila de espera - Nome e email em branco', async ({ page }) => {
  await page.landingPage.visit()
  await page.landingPage.openLeadModal()
  await page.landingPage.submitLeadForm('', '')
  await page.landingPage.alertHaveText(['Campo obrigatório','Campo obrigatório'])
})