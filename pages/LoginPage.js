// pages/LoginPage.js

import { expect } from '@playwright/test';
import { userCred } from '../Data/userCred';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByTestId("username");
        this.passwordInput = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-button");
    }

    // Navigate to the login page
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Fill in credentials, add assertions, and log in
    async login(username, password) {
      
        // Fill in username and password
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        // // Assertions to verify username and password
        expect(userCred.username).toBe("standard_user");
        expect(userCred.password).toBe("secret_sauce");

        // Click the login button
        await this.loginButton.click();
    }
}

export default LoginPage;
