import { faker } from '@faker-js/faker';
import { getRandomEmail } from '../../support/helpers.js';

class Login {

    savedName = '';
    
    preencherFormularioPreCadastro() {
        
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        this.savedName = `${firstName} ${lastName}`;

        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())
    
        cy.contains('button', 'Signup').click()
    }

    preencherFormularioLogin(user, password) {
        cy.get(`[data-qa="login-email"]`).type(user)
        cy.get(`[data-qa="login-password"]`).type(password)

        cy.get(`[data-qa="login-button"]`).click()
    }


}

export default new Login();
