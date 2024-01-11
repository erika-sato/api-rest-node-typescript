/* eslint-disable @typescript-eslint/no-explicit-any */
//essa fç precisa retornar um middleware (fç de validação)

import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import {Schema, ValidationError} from 'yup'

type TProperty = 'body' | 'header' | 'params' | 'query'
type TGetSchema = <T>(schema: Schema<T>) => Schema<T> //fç que é capaz de retornar um único schema. O <T> é uma tipagem que ainda não sei qual (genérica). Assim, quem utilizar o TGetSchema, vai poder dizer qual é a tipagem que será usada na fç
type TAllSchemas = Record<TProperty, Schema<any>>
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas> //fç capaz de retornar todos os schemas de uma vez 
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler

export const validation: TValidation = ( getAllSchemas ) => async (req, res, next) => { //recebo todos os tipos de schemas (body, query, params, header) para validá-los

    const schemas = getAllSchemas(schema => schema)
    const errorsResult: Record<string, Record<string, string>> = {}
   
    Object.entries(schemas).forEach(([key, schema]) => { //entries() transforma os schemas em array. Agora para cada array, pego a key (body, query, params...) e faço a validação dos dados que recebi na req
        try {

            schema.validateSync(req[key as TProperty], {abortEarly: false}) //abortEarly: vai validar todos os erros primeiro, antes de reclamar deles. o validateSync espera a validação acontecer, e depois nos retorna sucesso ou msg de erro
        
        } catch (err) {
        
            const yupError = err as ValidationError
            const errors: Record<string, string> = {} //todos os erros que acontecerem e suas respectivas msg serão colocadas dentro desse objeto
        
            yupError.inner.forEach(error => { //o inner é uma lista de validationErrors. Então, para cada erro, vou executar determinadas funções
                if(error.path === undefined) return // para evitar o erro de 'path is possible undefined". Tbm pode ser escrito assim: if (!error.path) return
                errors[error.path] = error.message
            })
            //aqui não posso encerrar a chamada com return pq posso ter recebido um schema para validar header, outro para validar o body, por ex.
            errorsResult[key] = errors //jogando todos os erros (que foram gerados no body) para dentro da variável errorsResult
           
        }
    })
   
    
    if(Object.entries(errorsResult).length === 0) { //se tudo ocorreu com sucesso, executo a próx fç, do create por ex.
        return next()
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({errors: errorsResult})
    }

}