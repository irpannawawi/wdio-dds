
/**
 * sub page containing specific selectors and methods for a specific page
 */
class OpentabPage {

    get tab() {
        return $('/html/body/main/div/div/div/form/div[1]/span')
    }

    get tab2() {
        return $('#form_dds_warga > div:nth-child(3) > span')
    }
    get tab3() {
        return $('/html/body/main/div/div/div/form/div[3]/span')
    }
    get tab4() {
        return $('/html/body/main/div/div/div/form/div[4]/span')
    }
    get tab5() {
        return $('/html/body/main/div/div/div/form/div[5]/span')
    }



    async openAll() {
        await Promise.all([
           this.tab.waitForDisplayed(),
           this.tab.click(),
            
            console.log('open tab 2'),
            // $('/html/body/main/div/div/div/form/div[2]/span').waitForDisplayed(),
            // $('/html/body/main/div/div/div/form/div[2]/span').click(),
            // $('/html/body/main/div/div/div/form/div[3]/span').waitForDisplayed(),
            // $('/html/body/main/div/div/div/form/div[3]/span').click(),
            // $('/html/body/main/div/div/div/form/div[4]/span').waitForDisplayed(),
            // $('/html/body/main/div/div/div/form/div[4]/span').click(),
            // $('/html/body/main/div/div/div/form/div[5]/span').waitForDisplayed(),
            // $('/html/body/main/div/div/div/form/div[5]/span').click(),
        ]);
    }
}

export default new OpentabPage();
