describe('E2E tests', () => {
  const fillRatingInformationForm = () => {
    cy.get('[data-cy="firstName-input"]').type('Jon');
    cy.get('[data-cy="lastName-input"]').type('Snow');
    cy.get('[data-cy="line1-input"]').type('123 A Street');
    cy.get('[data-cy="city-input"]').type('SLC');
    cy.chooseFromSelect('state-select', 'Utah');
    cy.get('[data-cy="zipCode-input"]').type('84101');
  };

  it('navigates to Quote Overview page after submiting Rating Information form', () => {
    cy.visit('/');
    cy.url().should('include', '/rating-information');
    fillRatingInformationForm();
    cy.contains('Get quote').click();
    cy.url().should('include', '/quote-overview');
  });

  it('should update premium if Deductible policy coverage option is changed', () => {
    cy.visit('/');
    fillRatingInformationForm();
    cy.contains('Get quote').click();
    return cy.get('[data-cy="premium-value"]').then((el) => {
      const oldPremium = el.text();
      cy.log(oldPremium);
      cy.chooseFromSelect('deductible-select', '$1,000');
      cy.get('[data-cy="premium-value"]').should('not.have.text', oldPremium);
    });
  });

  it('should update premium if Asteroid Collision policy coverage option is changed', () => {
    cy.visit('/');
    fillRatingInformationForm();
    cy.contains('Get quote').click();
    return cy.get('[data-cy="premium-value"]').then((el) => {
      const oldPremium = el.text();
      cy.log(oldPremium);
      cy.chooseFromSelect('asteroid_collision-select', '$1,000');
      cy.get('[data-cy="premium-value"]').should('not.have.text', oldPremium);
    });
  });
});
