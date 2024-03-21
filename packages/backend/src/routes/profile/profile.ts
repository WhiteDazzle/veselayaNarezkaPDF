import { Express, Request, Response } from 'express';
import {authenticateUser, createUser, deleteUserSession, getUserBySessionId} from "../../PostgreSQL/users";
import {NameValidation, passwordValidation} from "./handlers/formValidation";
import {createValidateError} from "../../handlers/createValidateError";

export const profile = (app: Express) => {
    app.post('/profile/create', async (req:Request,res:Response) => {
        const {name, email, password } = req.body
        await createUser(name, email, password).then((BDResponse) => {
            res.send(BDResponse)
        }).catch((e) => res.send(e))
    })
    
    app.get('/profile', async (req:Request,res:Response) => {
        await getUserBySessionId(req.cookies.session_id).then((BDResponse) => {
            res.cookie('session_id', BDResponse.session_id)
            res.send(BDResponse)
        }).catch(() => res.send(401))
    })
    
    app.post('/profile',async (req:Request,res:Response) => {
        const {name, password } = req.body
        const nameValidateMessage = NameValidation(name)
        const passwordValidateMessage = passwordValidation(password)
        if (nameValidateMessage || passwordValidateMessage) {
            res.send(createValidateError(nameValidateMessage, passwordValidateMessage))
        }
        authenticateUser(name, password).then((BDResponse) => {
            if (typeof BDResponse === 'string') {
                res.send(BDResponse)
            }
            res.cookie('session_id', BDResponse.session_id)
            res.send({success: true})
        }).catch(() => res.send(401))
    })

    app.delete('/profile/session',async (req:Request,res:Response) => {
        const { session_id } = req.cookies
        if (!session_id) res.send('чтобы выйти, нужно сначала войти (с) Конфуций')
        deleteUserSession(session_id).then((BDResponse) => {
            if (typeof BDResponse === 'string') {
                res.clearCookie('session_id');
                res.send(BDResponse)
            }
            res.clearCookie('session_id');
            res.send({success: true})
        }).catch(() => res.send(401))
    })
}
