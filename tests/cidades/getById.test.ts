import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetById', () => {

    it('Busca um registro pelo id', async () => { //caso de teste (um cenário)

        //Como vou iniciar com BD zerado, para testar o get(), preciso antes fazer um post()

        const res1 = await testServer
            .post('/cidades')
            .send(({nome: 'Londrina'}))
        expect(res1.statusCode).toEqual(StatusCodes.CREATED) 

        const resBuscadaPeloId = await testServer
            .get(`/cidades/${res1.body}`)
            .send()

        expect(resBuscadaPeloId.statusCode).toEqual(StatusCodes.OK) 
        expect(resBuscadaPeloId.body).toHaveProperty('nome') 

    })
})