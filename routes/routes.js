import express from 'express';
import * as aptos from "aptos";
import * as url from 'url';
import * as path from "path";
import { default_account,test_account } from '../setting/accounts.js';



const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const routes = express.Router();

let client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");

let default_account_add = aptos.AptosAccount.fromAptosAccountObject(default_account);
let test_account_add = aptos.AptosAccount.fromAptosAccountObject(test_account);

const contract_address = "0xacf4a0ac740b9530686f91e2348d9fd7168290f4cfceb85f1838fcd121685414";


routes.get("/index", (req, res) => {
    res.render(path.join(__dirname, "../templates/index.ejs"))
});


routes.get("/details", (req, res) => {
    // res.json(req.query);
    // {
    //     tokenname: req.query.tokenname,
    //     tokendesc: req.query.tokendesc,
    //     tokenurl: req.query.tokenurl,
    //     price:req.query.price ,
    //     owner: req.query.owner
    //   }
    res.render(path.join(__dirname, "../templates/details.ejs"),{tokenname: req.query.tokenname,tokendesc: req.query.tokendesc,tokenurl: req.query.tokenurl,price:req.query.price ,owner: req.query.owner})
});



routes.get("/createnft", (req, res) => {

    res.render(path.join(__dirname, "../templates/createnft.ejs"), { message: "Create NFT with NFT.io" })
});

routes.post("/createnft", async (req, res) => {

    // try {
    //     let payload = {
    //         type: "entry_function_payload",
    //         function: `${contract_address}::marketplace::CreateNFT`,
    //         arguments: [req.body.nftname, req.body.nftdesc, req.body.nfturl],
    //         type_arguments: []
    //     }

    //     let genrtaed_trans = await client.generateTransaction(default_account_add.address(), payload);

    //     let sign_trans = await client.signTransaction(default_account_add, genrtaed_trans);

    //     let result = await client.submitTransaction(sign_trans);

    //     await client.waitForTransactionWithResult(result.hash);

    //     res.render(path.join(__dirname, "../templates/createnft.ejs"), { message: "NFT successfully created!" })

    // } catch (error) {
    //     console.log(error);
    //     res.render(path.join(__dirname, "../templates/createnft.ejs"), { message: "Failde to create new NFT." })
    // }


});

routes.get("/myitems",(req,res)=>{

    res.render(path.join(__dirname, "../templates/myitems.ejs"),{ message: "Welcome to NFT.io" })

});



routes.post("/listnft", async (req, res) => {

    console.log(req.body);

    // {
    //     "req.body.collection_name": "MD-NFTCollection",
    //     "req.body.token_name": "Amitab",
    //     "req.body.token_desc": "Amitab NFT",
    //     "req.body.token_url": "https://cdn.guardianlink.io/dropsimages/amitabh/00995.png",
    //     "req.body.token_owner": "0x883fd6ef52bd52911d0ef27c583f42cfa8c4ce7aa9e354fa5249c14a37d52bbb",
    //     "req.body.selling_price": "1",
    //     "req.body.expire_time": "1"
    //   }

    //   ListToken(req.body.collection_name,req.body.token_name,req.body.token_url,req.body.token_desc,req.body.token_owner,req.body.selling_price,expire_time:u64)

    try {
        let payload = {
            type: "entry_function_payload",
            function: `${contract_address}::marketplace::ListToken`,
            arguments: [req.body.collection_name,req.body.token_name,req.body.token_url,req.body.token_desc,req.body.token_owner,(parseInt(req.body.selling_price)*10**8),1684995089],
            type_arguments: []
        }


        let genrtaed_trans = await client.generateTransaction(default_account_add.address(), payload);

        let sign_trans = await client.signTransaction(default_account_add, genrtaed_trans);

        let result = await client.submitTransaction(sign_trans);

        await client.waitForTransactionWithResult(result.hash);

        res.redirect("/index"); 

    } catch (error) {
        console.log(error);
        res.render(path.join(__dirname, "../templates/myitems.ejs"), { message: "Failde to list NFT." })
    }
   
   

});


routes.post("/delistnft",async (req,res)=>{

    try {
        let payload = {
            type: "entry_function_payload",
            function: `${contract_address}::marketplace::RemoveFromListing`,
            arguments: [req.body.tokenname],
            type_arguments: []
        }

        let genrtaed_trans = await client.generateTransaction(default_account_add.address(), payload);

        let sign_trans = await client.signTransaction(default_account_add, genrtaed_trans);

        let result = await client.submitTransaction(sign_trans);

        await client.waitForTransactionWithResult(result.hash);

        res.redirect("/index");

    } catch (error) {
        console.log(error);
        res.render(path.join(__dirname, "../templates/myitems.ejs"), { message: "Failde to delist NFT." })
    }

});


routes.post("/buynft",async (req,res)=>{

    try {
        let payload = {
            type: "entry_function_payload",
            function: `${contract_address}::marketplace::BuyToken`,
            arguments: [req.body.tokenname],
            type_arguments: []
        }

        let genrtaed_trans = await client.generateTransaction(test_account_add.address(), payload);

        let sign_trans = await client.signTransaction(test_account_add, genrtaed_trans);

        let result = await client.submitTransaction(sign_trans);

        await client.waitForTransactionWithResult(result.hash);

        res.redirect("/index");

    } catch (error) {
        console.log(error);
        res.send("error");
    }

    res.json(req.body);
});


routes.get("/test",(req,res)=>{

   

    res.send("sdsdsdds");

});