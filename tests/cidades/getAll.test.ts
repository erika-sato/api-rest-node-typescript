import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetAll', () => {

    it('Busca todos os registros', async () => { //caso de teste (um cenário)

        //Como vou iniciar com BD zerado, para testar o get(), preciso antes fazer um post()

        const res1 = await testServer
            .post('/cidades')
            .send(({nome: 'Londrina'}))
        expect(res1.statusCode).toEqual(StatusCodes.CREATED) 

        const resBuscada = await testServer
            .get('/cidades')

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK) 
        expect(resBuscada.body.length).toBeGreaterThan(0) 
        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0) 
    })
})