import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - Delete', () => {

    it('Deleta registro', async () => { //caso de teste (um cenário)

        //Como vou iniciar com BD zerado, para testar o delete(), preciso antes fazer um post()

        const res1 = await testServer
            .post('/cidades')
            .send(({nome: 'Londrina'}))
        expect(res1.statusCode).toEqual(StatusCodes.CREATED) 

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .send()

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT) 
    })
})