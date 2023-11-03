import {sleep} from "../../../handlers/sleep";

const fs = require('fs');
const PDFDocument = require('pdf-lib').PDFDocument;
import path from 'path'

export async function splitPDF(pathToPdf: string, pathToSave: string) {

        const documentAsBytes = await fs.promises.readFile(pathToPdf);

        // Load your PDFDocument
        const pdfDoc = await PDFDocument.load(documentAsBytes)

        const numberOfPages = pdfDoc.getPages().length;

        for (let i = 0; i < numberOfPages; i++) {

                // Create a new "sub" document
                const subDocument = await PDFDocument.create();
                // copy the page at current index
                const [copiedPage] = await subDocument.copyPages(pdfDoc, [i])
                subDocument.addPage(copiedPage);
                const pdfBytes = await subDocument.save()
                await writePdfBytesToFile(path.join(pathToSave, `file-${i + 1}.pdf`), pdfBytes);
                await sleep(5000)
        }
}

function writePdfBytesToFile(fileName: string, pdfBytes: string) {
        return fs.promises.writeFile(fileName, pdfBytes);
}
