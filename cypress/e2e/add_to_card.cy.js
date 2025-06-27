import { cartPage, inventoryPage } from "../support/selectors";

describe('E-commerce - Add to Cart Flow', () => {
  let user;

  before(() => {
    cy.fixture('users').then((data) => {
      user = data.standardUser;
    });
  });

  beforeEach(() => {
    cy.login(user);
  });

  it('should add a product to the cart and display correct badge count', () => {
    cy.url().should('include', '/inventory');

    cy.get(inventoryPage.inventoryItem)
      .first()
      .find('button')
      .click();

    cy.get(inventoryPage.cartBadge).should('contain', '1');
  });

  it('should navigate to cart and confirm product presence', () => {
    cy.get(inventoryPage.inventoryItem)
      .eq(1)
      .find('button')
      .click();

    cy.get(inventoryPage.cartLink).click();
    cy.url().should('include', '/cart');

    cy.get(cartPage.cartItem).should('have.length.at.least', 1);
  });
});
