import { faker } from '@faker-js/faker';
class Cadastro {
    preencherFormularioPreCadastroCompleto() {
        cy.get('input[type=radio').check('Mrs')

        cy.get('input#password').type('teste1234', { log: false })

        cy.get('[data-qa=days]').select('20')
        cy.get('[data-qa=months]').select('September')
        cy.get('[data-qa=years]').select('1992')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.state())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        cy.get('[data-qa="create-account"]').click()
    }

}

export default new Cadastro();