import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middleware'
import { StatusCodes } from 'http-status-codes'

interface IQueryProps {
    page?: number
    limit?: number
    filter?: string
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional()
    }))
}))

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => { //na req, escrevi no 4º parâmetro a minha interface (pois o 4º parâmetro da Request é o ReqQuery)
    res.setHeader('access-control-expose-headers', 'x-total-count') //expondo (liberando) o header para o front-end poder acessar
    res.setHeader('x-total-count' , 1)

    return res.status(StatusCodes.OK).json([
        {
            id: 1,
            nome: 'Londrina'
        }
    ])
}