describe('Add to card', ()=> {
    beforeEach(()=> {
        //Visiter le site + se connecter
        cy.visit('http://www.saucedemo.com');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
    })

    


it('adds a product to the cart and checks the badge', () => {
    //Verifie que la redirection vers la page produits est faite 
    cy.url().should('include','/inventory');
    //Ajoute le premier produit au panier
    cy.get('.inventory_item').first().find('button').click();

    //Verifie que le badge au panier affiche 1
    cy.get('.shopping_cart_badge').should('contain','1');
});

it('navigates to the cart and confirms product presence', () => {
    //Ajout un produit 
    cy.get('.inventory_item').eq(1).find('button').click();

    //cliquer sur l'icone du panier
    cy.get('.shopping_cart_link').click();

    //Verifie qu'on est bien sur la page du panier
    cy.url().should('include','/cart');


    // Vérifie qu’un produit est bien présent dans le panier
    cy.get('.cart_item').should('have.length.at.least', 1);
  
})
});