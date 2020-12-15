describe('register', () => {
    it('Visits the register', () => {
        cy.visit('/register')
        cy.contains('h2', 'Register')
    })
});
