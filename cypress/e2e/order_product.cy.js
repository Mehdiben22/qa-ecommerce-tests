describe('Complete Order Flow', () => {

    beforeEach(() => {
      cy.visit('https://www.saucedemo.com')
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.get('#login-button').click()
    });
  
    it('completes an order successfully', () => {
      // Vérifie qu’on est sur la page produits
      cy.url().should('include', '/inventory');
  
      // Ajoute un produit au panier
      cy.get('.inventory_item').first().find('button').click();
  
      // Va au panier
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart');
  
      // Clique sur le bouton Checkout
      cy.get('[data-test="checkout"]').click();
      cy.url().should('include', '/checkout-step-one');
  
      // Remplir les informations de l'utilisateur
      cy.get('[data-test="firstName"]').type('Ali');
      cy.get('[data-test="lastName"]').type('Khan');
      cy.get('[data-test="postalCode"]').type('20000');
  
      // Continue vers la page de vérification
      cy.get('[data-test="continue"]').click();
      cy.url().should('include', '/checkout-step-two');
  
      // Vérifie que le produit est bien présent
      cy.get('.cart_item').should('have.length.at.least', 1);
  
      // Terminer la commande
      cy.get('[data-test="finish"]').click();
  
      // Vérifie le message de confirmation
      cy.get('.complete-header').should('contain', 'Thank you for your order');
      cy.url().should('include', '/checkout-complete');

      //Back to home page
      cy.get('[data-test="back-to-products"]').click();
      cy.url().should('include', '/inventory');
        });
  
  });
  