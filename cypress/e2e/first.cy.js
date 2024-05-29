describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="continueButton"]').click();
    cy.get('.email')

  })
})