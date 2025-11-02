/// <reference types="cypress" /> 

import userData from '../fixtures/example.json'

import { 
    getRandomNumber,
    getRandomEmail
} from '../support/helpers.js';

import Menu from '../modules/menu/index.js';
import Login from '../modules/login/index.js';
import Cadastro from '../modules/cadastro/index.js';
import Produtos from '../modules/produtos/index.js';
import Contato from '../modules/contato/index.js';
import Checkout from '../modules/checkout/index.js';

describe('Automation Exercise', () => {
    beforeEach(() => {

        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')


    });

    it('1.Cadastrar um usuário', () => {

        Menu.navegarParaLogin();

        Login.preencherFormularioPreCadastro();


        Cadastro.preencherFormularioPreCadastroCompleto();
        

        cy.url().should('includes', '/account_created')        
        cy.contains('b', 'Account Created')

    });


    
    it('2.Login de usuário com e-mail e senha corretos', () => {

        Menu.navegarParaLogin();

        Login.preencherFormularioLogin(userData.email, userData.password);

        Menu.efetuarLogout();

    });

    it('3.Login de usuário com e-mail e senha incorretos', () => {
        Menu.navegarParaLogin();

        Login.preencherFormularioLogin(userData.email, '54321');

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')

    });

    it('4.Logout de usuario', () => {
        Menu.navegarParaLogin();

        Login.preencherFormularioLogin(userData.email, userData.password);
 
        Menu.efetuarLogout();

        cy.url().should('contain', 'login')
    });

    it('5.Cadastrar usuário com e-mail existente no sistema', () => {
        Menu.navegarParaLogin();

        cy.get('[data-qa="signup-name"]').type(userData.name)
        cy.get('[data-qa="signup-email"]').type(userData.email)

        cy.contains('button', 'Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    it('6.Formulário de contato', () => {
        
        Menu.navegarParaContato();  
        Contato.preencherFormularioContato();

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.') 

    });

    it('8.Verificar produtos e seus detalhes', () => {

        Menu.navegarParaProdutos();
        Produtos.navegarParaDetalheDeProduto();

        cy.get('.product-information h2').should('be.visible')
        cy.get('.product-information p').should('be.visible')
        cy.get('.product-information span').should('be.visible')
        cy.get('b').contains('Availability:').should('be.visible')
        cy.get('b').contains('Condition:').should('be.visible')
        cy.get('b').contains('Brand:').should('be.visible')
    });

    it('9.Procurar produto', () => {

        Menu.navegarParaProdutos();

        Produtos.pesquisarProduto();
        cy.get('h2').contains('Searched Products').should('be.visible')
        
        cy.get('.features_items .col-sm-4').should('have.length', 1)
    });

    it('10.Verificar incrição na home page', () => {

        cy.get('input[id="susbscribe_email"]').type(getRandomEmail())
        cy.get('#subscribe').click()

        cy.get('.alert-success').should('be.visible')
        cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')

    });

    it('15.Fazer pedido - Registrar antes do checkout', () => {
        Menu.navegarParaLogin();
        Login.preencherFormularioPreCadastro();
        Cadastro.preencherFormularioPreCadastroCompleto();
        
        cy.url().should('includes', '/account_created')        
        cy.contains('b', 'Account Created')
        cy.get('[data-qa="continue-button"]').click()

        cy.get('i.fa-user').parent().should('contain', Login.savedName);
        
        Menu.navegarParaProdutos();
        Produtos.navegarParaDetalheDeProduto();
        cy.get('button').contains('Add to cart').click()

        cy.get('.modal-content').should('be.visible')
        cy.get('a').contains('View Cart').click()

        cy.url().should('contain', '/view_cart')

        cy.get('.cart_info').should('be.visible')
        cy.contains('Proceed To Checkout').click()

        cy.contains('Address Details').should('be.visible')
        cy.contains('Review Your Order').should('be.visible')

        Checkout.preencherObservacaoPedido()
        cy.contains('Place Order').click()

        Checkout.preencherPagamento()

        cy.get('[data-qa="order-placed"] > b').should('be.visible')

        Menu.deletarConta();
        cy.contains('b', 'Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    });
}); 