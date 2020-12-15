describe('home', () => {
    it('Visits the homepage', () => {
        cy.visit('/')
        cy.contains('tagline', 'Study With Classmates')
    })
});
