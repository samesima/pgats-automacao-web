import { faker } from '@faker-js/faker';

class Checkout {
    preencherPagamento() {
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type('4242 4242 4242 4242')
        cy.get('[data-qa="cvc"]').type('123')
        cy.get('[data-qa="expiry-month"]').type('12')
        cy.get('[data-qa="expiry-year"]').type('2025')
        cy.get('#submit').click()

    }

    preencherObservacaoPedido() {
        cy.get('.form-control').type('Teste comentário')
    }

}

export default new Checkout();