const { expect } = require('@playwright/test')


class Homepage {
    constructor(page) {
        this.page = page;
        this.qustionicon = this.page.locator("i.oxd-icon.bi-question-lg");
        this.userdropdown = "//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']"
        this.logoutoption = "//a[normalize-space()='Logout']"
    }


    async verifyqustionicon() {
        await this.page.waitForSelector("i.oxd-icon.bi-question-lg", { timeout: 10000 });
        await expect(this.qustionicon).toBeVisible();
    }

    async LogoutFromWeb() {
        await this.page.click(this.userdropdown)
        await this.page.click(this.logoutoption)


    }

}

module.exports = Homepage
