import express from 'express';
import { routes } from '../routes/routes.js';
import * as url from 'url';
import * as path from "path";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));



const app = express()
const port = 8000

app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"../static")));
app.use('',routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))