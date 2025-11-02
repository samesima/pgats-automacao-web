import { faker } from '@faker-js/faker';

class Contato {
    preencherFormularioContato() {
        cy.get('[data-qa="name"]').type(faker.person.fullName())
        cy.get('[data-qa="email"]').type(faker.internet.email())
        cy.get('[data-qa="subject"]').type(faker.lorem.words(3))
        cy.get('[data-qa="message"]').type(faker.lorem.paragraph())


        cy.fixture('example.json').as('arquivo')
        cy.get('input[type="file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()
    }

}

export default new Contato();