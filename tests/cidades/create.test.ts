import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

//no 1º parâmetro, descrevo qual o cenário/método que estou testando
describe('Cidades - Create', () => {

    it('Cria registro', async () => { //caso de teste (um cenário)
        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Londrina'})

        expect(res1.statusCode).toEqual(StatusCodes.CREATED) //espero que a resposta recebida (res1) seja igual a. Obs.: se der erro em um desses casos, o teste falha por inteiro
        // expect(typeof res1.body).toEqual('number') 
    })

    it('Tenta criar um registro com nome muito curto', async () => { //caso de teste (um cenário)
        const res1 = await testServer
            .post('/cidades')
            .send({nome: 'Lo'})

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST) 
        expect(res1.body).toHaveProperty('errors.body.nome') 
    })
})