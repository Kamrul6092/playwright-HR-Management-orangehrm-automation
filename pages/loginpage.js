const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = this.page.getByPlaceholder('Username');
        this.password = this.page.getByPlaceholder('Password');
        this.submitButton = this.page.getByRole('button', { name: 'Login' });
        this.loginHeader = this.page.locator("//h5[normalize-space()='Login']");
    }

    async LoginToWeb() {
        await this.username.fill('Admin');
        await this.password.fill('admin123');
        await this.submitButton.click();
    }

    async verifySignIn() {
        await this.page.waitForSelector("//h5[normalize-space()='Login']", { timeout: 5000 }); //  Wait before assert
        await expect(this.loginHeader).toBeVisible();
    }
}

module.exports = LoginPage;
