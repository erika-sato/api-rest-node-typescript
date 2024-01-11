import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'

interface ICidade {
    nome: string
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3) 
    }))
}))

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => { //na req, sobrescrevi no 3º parâmetro a minha interface (pois o 3º parâmetro da Request é o ReqBody, que, por padrão, é any)
    console.log(req.body)
    return res.status(StatusCodes.CREATED).send('não implementado!')
}