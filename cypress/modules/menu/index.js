class Menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click()
    }

    efetuarLogout() {
        cy.get('a[href="/logout"]').should('be.visible').click()
    }

    navegarParaProdutos() {
        cy.get('a[href="/products"]').click()
    }

    navegarParaContato() {
        cy.get('a[href="/contact_us"]').click()
    }

    deletarConta() {
        cy.contains('Delete Account').click()
    }

}

export default new Menu();

