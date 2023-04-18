import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let fileArray: {[key: string]: string} = {"fileOne": "File One contents loading...", "fileTwo": "File Two contents loading..."};

app.get('/', (req: Request, res: Response) => {
    res.send("Express + TypeScript server");
});

// Route based on the file name inputted within the url parameter. 
// Fn: It will check the request parameter 'name' to see if its matches any within the 
// the stored files and return its contents otherwise it will throw an error to the user.

app.get('/fetch/:name', (req: Request, res: Response) => {

    req.params;
    //res.json(req.params);
    if (req.params['name'] in fileArray){
        let selectedName = req.params['name'];
        const reader = fs.readFile(selectedName.toString() + '.txt', (err, input) => 
        {
            if (err) {throw new Error("File path is not correct.")};
            return res.json({'name': selectedName, 'contents':(input.toString())});
        });
    }
    else{
        throw new Error("File not found within system.");
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});