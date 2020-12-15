describe('Login', () => {
    it('Visits the login page', () => {
        cy.visit('/login')
        cy.contains('h2', 'Sign In')
    })
});
