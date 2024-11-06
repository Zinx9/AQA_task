// pages/InventoryPage.js

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.itemNames = page.locator('.inventory_item_name');
  }

  async getSortedItems() {
    return await this.itemNames.allInnerTexts();
  }

  async changeSortOrder(order) {
    await this.sortDropdown.selectOption(order);
  }
}

export default InventoryPage;
