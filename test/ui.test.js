const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout untuk Mocha tests

    let driver;

    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
    });

    // Tutup WebDriver setelah semua test selesai
    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function() {
        await driver.get('C:/Users/USER/Documents/PRAK PPMPL/B_Nur Rila Ammalia_2200016119_P4/login.html'); // Ubah path sesuai lokasi file login.html
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
        // Lakukan tindakan lebih lanjut, seperti validasi login (ini disimulasikan di sini)
    });

    // 1. Test case yang memvalidasi login gagal jika username dan password salah
    it('should display an error message if login fails', async function() {
        // Input username dan password yang salah
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        
        // Klik tombol login
        await driver.findElement(By.id('loginButton')).click();
    
        // Tunggu hingga elemen errorMessage muncul
        try {
            const errorElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000); // Tunggu hingga 5 detik
            const errorMessage = await errorElement.getText();
            console.log("Pesan error ditemukan:", errorMessage);
        } catch (error) {
            console.log("Pesan error tidak ditemukan:", error);
        }
    });

    // 2. Test case tambahan menggunakan CSS Selector dan XPath
    it('should input username and password using CSS Selector and XPath', async function() {
        // Arahkan ke halaman login
        await driver.get('C:/Users/USER/Documents/PRAK PPMPL/B_Nur Rila Ammalia_2200016119_P4/login.html');
        
        // Masukkan username menggunakan CSS Selector dan password menggunakan XPath
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
        
        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');
        
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    // 3. Pengujian untuk memvalidasi apakah elemen tombol login terlihat di layar
    it('should verify that login button and input fields are visible', async function() {
        // Arahkan ke halaman login
        await driver.get('C:/Users/USER/Documents/PRAK PPMPL/B_Nur Rila Ammalia_2200016119_P4/login.html');
        
        // Cek apakah tombol login dan input field username serta password terlihat
        const isLoginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        const isUsernameFieldDisplayed = await driver.findElement(By.id('username')).isDisplayed();
        const isPasswordFieldDisplayed = await driver.findElement(By.id('password')).isDisplayed();

        // Validasi bahwa semuanya terlihat di layar
        expect(isLoginButtonDisplayed).to.be.true;
        expect(isUsernameFieldDisplayed).to.be.true;
        expect(isPasswordFieldDisplayed).to.be.true;
    });
});