"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
let fileArray = { "fileOne": "File One contents loading...", "fileTwo": "File Two contents loading..." };
app.get('/', (req, res) => {
    res.send("Express + TypeScript server");
});
// Route based on the file name inputted within the url parameter. 
// Fn: It will check the request parameter 'name' to see if its matches any within the 
// the stored files and return its contents otherwise it will throw an error to the user.
app.get('/fetch/:name', (req, res) => {
    req.params;
    //res.json(req.params);
    if (req.params['name'] in fileArray) {
        let selectedName = req.params['name'];
        const reader = fs_1.default.readFile(selectedName.toString() + '.txt', (err, input) => {
            if (err) {
                throw new Error("File path is not correct.");
            }
            ;
            return res.json({ 'name': selectedName, 'contents': (input.toString()) });
        });
    }
    else {
        throw new Error("File not found within system.");
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
