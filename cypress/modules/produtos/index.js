class Produtos {
    navegarParaDetalheDeProduto() {
        cy.get('.features_items').should('be.visible')

        cy.get('.choose').first().click()
    }

    pesquisarProduto() {
        cy.get('#search_product').type('Winter Top')

        cy.get('#submit_search').click()
    }

}

export default new Produtos();

