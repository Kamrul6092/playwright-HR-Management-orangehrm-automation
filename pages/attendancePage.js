const { expect } = require('@playwright/test');

class AttendancePage {
    constructor(page) {
        this.page = page;

        this.timeMenu = page.getByRole('link', { name: 'Time' });
        this.attendanceDropdown = page.getByText('Attendance', { exact: true });
        this.punchInOut = page.getByRole('menuitem', { name: 'Punch In/Out' });
        this.noteInput = page.locator('textarea');
        this.punchButton = page.getByRole('button', { name: /In|Out/ });
        this.successMessage = page.locator('.oxd-toast.oxd-toast--success');
    }

    async navigateToPunchPage() {
        await this.timeMenu.click();
        await this.attendanceDropdown.waitFor({ state: 'visible' });
        await this.attendanceDropdown.click();
        await this.punchInOut.click();

        //  Accept both punchIn and punchOut pages
        await expect(this.page).toHaveURL(/punch(In|Out)/i);
    }

    async punchIn() {
        await this.noteInput.fill('Arrived at work');
        await this.punchButton.click();
        await this.page.waitForSelector('.oxd-toast.oxd-toast--success', { timeout: 7000 });
        await expect(this.successMessage).toBeVisible();
    }

    async punchOut() {
        await this.noteInput.fill('Leaving work after 8 hours');
        await this.punchButton.click();
        await this.page.waitForSelector('.oxd-toast.oxd-toast--success', { timeout: 7000 });
        await expect(this.successMessage).toBeVisible();
    }
}

module.exports = AttendancePage;
