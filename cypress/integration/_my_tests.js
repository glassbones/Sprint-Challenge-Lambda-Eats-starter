describe('Form inputs', () => {
    it('can navigate to the site', ()=>{
        cy.visit('http://localhost:3000')
    })

    it('cannot submit without input data', ()=>{
        cy.get('button')
        .click()
        cy.get('pre').should('not.exist')
    }) 

    it('can type a name', ()=>{
        cy.get('#name')
        .type('testname')
        .should('have.value', 'testname')
    })
    
    it('can type an email', ()=>{
        cy.get('#email')
        .type('test@email.com')
        .should('have.value', 'test@email.com')
    })

    it('can type a password', ()=>{
        cy.get('#password')
        .type('password123')
    })
    
    it('can check toppings', ()=>{
        cy.get('#pepperonis')
        .check()
        cy.get('#pineapple')
        .check()
        cy.get('#olives')
        .check()
        cy.get('#sausage')
        .check()
    }) 

    it('can type special instructions', ()=>{
        cy.get('#special')
        .type(' Can you pour ranch all over the box and just dump doctor pepper on my driveway?')
    })

    it('can submit', ()=>{
        cy.get('button')
        .click()
        cy.get('pre')
    }) 
    
})