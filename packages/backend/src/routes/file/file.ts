import { Express, Request, Response } from 'express';
import path from 'path'
import fs from 'fs'
import hexCode from "../../constants/hexCode";
import {splitPDF} from "./helpers/splitPdfToPages";

export const file = (app: Express) => {

    
    app.get('/file/count/:folderName', async (req:Request,res:Response) => {
        console.log(req.params)
        const count = await countFilesInFolder(path.join(__dirname, 'uploads', req.params.folderName)) || 0
        res.send({count})
    })
    
    app.post('/file/upload',async (req:Request,res:Response) => {
        console.log(req.params)
        if (!req.files) res.status(400).send('No files were uploaded.');
        const file = req.files?.file;
        if (file.data.toString('hex', 0, 4) !== hexCode.PDFFileCode) res.send(418)
        const fileCount = await countFilesInFolder(path.join(__dirname, 'uploads'))
            .then(count => `${count}`)
        const uploadPath = path.join(__dirname, 'uploads', fileCount + 1);
        await fs.mkdir(uploadPath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Ошибка при создании папки');
            }
        })
        console.log(file.data.toString('hex', 0, 4))
         await file.mv(path.join(uploadPath, '1.pdf'), async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            splitPDF(path.join(uploadPath, '1.pdf'), path.join(uploadPath));
            res.send({folderName: fileCount+1});
    })
})
}

function countFilesInFolder(folderPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.length);
            }
        });
    });
    
}
