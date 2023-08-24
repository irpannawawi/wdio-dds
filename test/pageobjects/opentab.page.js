
/**
 * sub page containing specific selectors and methods for a specific page
 */
class OpentabPage {
    
    get tab()
    {
        return $('/html/body/main/div/div/div/form/div[1]/span')
    }

    get tab2()
    {
        return $('/html/body/main/div/div/div/form/div[2]/span')
    }
    get tab3()
    {
        return $('/html/body/main/div/div/div/form/div[3]/span')
    }
    get tab4()
    {
        return $('/html/body/main/div/div/div/form/div[4]/span')
    }
    get tab5()
    {
        return $('/html/body/main/div/div/div/form/div[5]/span')
    }


    
    async openAll(){
        await $('/html/body/main/div/div/div/form/div[1]/span').click()
        await $('/html/body/main/div/div/div/form/div[2]/span').click()
        await $('/html/body/main/div/div/div/form/div[3]/span').click()
        await $('/html/body/main/div/div/div/form/div[4]/span').click()
        await $('/html/body/main/div/div/div/form/div[5]/span').click()
    }
}

export default new OpentabPage();
