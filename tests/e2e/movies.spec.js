import { test } from "../support/index"
import data from '../support/fixture/movies.json';
import {executeSQL} from "../support/database";

test('Cadastro Válido de de um novo Filme', async ({ page }) => {

    const movie = data.guerra_mundial_z // massa de teste vinda de um arquivo
    await executeSQL(`delete from public.movies where title='${movie.title}';`)

    await page.loginPage.visit()
    await page.loginPage.submitLoginForm('admin@zombieplus.com','pwd123')
    await page.moviesPage.isLoggedIn()
    await page.moviesPage.insertMovie(movie.title,movie.overview,movie.company,movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})