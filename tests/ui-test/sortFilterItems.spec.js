// tests/sortFilterItems.spec.js

import { test, expect } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import { userCred } from '../../Data/userCred';


test.describe('Inventory Sorting Test', () => {
  test('should sort items A->Z and Z->A correctly', async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Step 1: Navigate to login page and log in
    await loginPage.navigate();
    await loginPage.login(userCred.username, userCred.password);

    // Step 2: Verify items are sorted by Name (A -> Z)
    let itemNames = await inventoryPage.getSortedItems();
    let sortedNames = [...itemNames].sort();
    expect(itemNames).toEqual(sortedNames);

    // Step 3: Change sorting to Name (Z -> A)
    await inventoryPage.changeSortOrder('za');

    // Step 4: Verify items are sorted by Name (Z -> A)
    itemNames = await inventoryPage.getSortedItems();
    sortedNames = [...itemNames].sort().reverse();
    
    expect(itemNames).toEqual(sortedNames);
  });
});
