import { StatusCodes } from 'http-status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - UpdateById', () => {

    it('Atualiza registro', async () => { //caso de teste (um cenário)

        //Como vou iniciar com BD zerado, para testar o update(), preciso antes fazer um post()

        const res1 = await testServer
            .post('/cidades')
            .send(({nome: 'Londrina'}))
        expect(res1.statusCode).toEqual(StatusCodes.CREATED) 

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({nome: 'Londrina'})

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT) 
    })

    it('Tenta atuzlizar registro que não existe', async () => { //caso de teste (um cenário)
        const res1 = await testServer
            .put('/cidades/999999')

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR) 
        expect(res1.body).toHaveProperty('errors.default') 
    }) 
})