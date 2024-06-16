import {test as base, expect} from '@playwright/test'
import {LandingPage} from "../pages/LandingPage"
import {LoginPage} from "../pages/LoginPage"
import {MoviesPage} from "../pages/MoviesPage"
import {Toast} from "../pages/Components"

/*
    fixture com mesmo contexto do page
    const test = base.extend({
        play : async ({page}, use) =>{
            await use(page)
        }
    })
*/
const test = base.extend({
    page : async ({page}, use) =>{
        await use({
            ...page,
            landingPage: new LandingPage(page),
            loginPage: new LoginPage(page),
            moviesPage: new MoviesPage(page),
            toast: new Toast(page)

        })
    }
})

export { test, expect }