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
        const context = page
        context['landingPage'] = new LandingPage(page)
        context['loginPage'] = new LoginPage(page)
        context['moviesPage'] = new MoviesPage(page)
        context['toast'] = new Toast(page)

        await use(context)
    }
})

export { test, expect }