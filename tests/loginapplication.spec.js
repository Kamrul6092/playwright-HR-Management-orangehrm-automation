
const { test, expect } = require('@playwright/test');
const LoginPage = require("../pages/loginpage")
const Homepage = require("../pages/homepage")
const AttendancePage = require("../pages/attendancePage")

test('Attendance Punch In/Out Test', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    const loginPage = new LoginPage(page);
    await loginPage.LoginToWeb();

    const homepage = new Homepage(page);
    await homepage.verifyqustionicon(); //assertion 

    const attendancePage = new AttendancePage(page);
    await attendancePage.navigateToPunchPage();

    await attendancePage.punchIn();

    // Simulate wait (optional)
    await page.waitForTimeout(2000); // Just pause to simulate time passing

    await attendancePage.punchOut();

    await homepage.LogoutFromWeb();
    await page.waitForURL('**/auth/login');
    await loginPage.verifySignIn() //assertion 
});
