let conbtn = document.getElementById("connectwallet");
let connectwalletmenu = document.getElementById("connectwallet-menu");


const contract_address = "0xacf4a0ac740b9530686f91e2348d9fd7168290f4cfceb85f1838fcd121685414";

async function checkConnection()
{
    let iscon = await window.aptos.isConnected();
    if(iscon){
        conbtn.value= "Disconnect wallet"
    }else{

        if(window.location.pathname != "/index"){
            window.location.replace("/index");
        }

        conbtn.value= "Connect wallet"

    }
}

checkConnection();

async function checkConnectionmenu()
{
    let iscon = await window.aptos.isConnected();
    if(iscon){
        connectwalletmenu.value= "Disconnect wallet"
    }else{

        if(window.location.pathname != "/index"){
            window.location.replace("/index");
        }

        connectwalletmenu.value= "Connect wallet"

    }
}

connectwalletmenu.addEventListener("click",async ()=>{
    
  let iscon = await window.aptos.isConnected();
  if(iscon){
     let data = await window.aptos.disconnect();
     location.reload();

  // await CreateNFT("AdMonkey","For sale","https://openseauserdata.com/files/9dc1a378f914acfbe0dbb55f5bf122e9.png");
  
  }else{
      let data = await window.aptos.connect();
      location.reload();
     
  }

});

conbtn.addEventListener("click",async ()=>{
    
    let iscon = await window.aptos.isConnected();
    if(iscon){
       let data = await window.aptos.disconnect();
       location.reload();

    // await CreateNFT("AdMonkey","For sale","https://openseauserdata.com/files/9dc1a378f914acfbe0dbb55f5bf122e9.png");
    
    }else{
        let data = await window.aptos.connect();
        location.reload();
       
    }

});

async function CreateNFT(nftname,nftdesc,nfturl){

    const payload = {
        type: "entry_function_payload",
        function: `${contract_address}::marketplace::CreateNFT`,
        arguments: [nftname,nftdesc,nfturl],
        type_arguments: []
      };
      
      try {
        const pendingTransaction = await window.aptos.signAndSubmitTransaction(payload);
      
        const client = new window.aptosSDK.AptosClient('https://devnet.aptoslabs.com');

        const txn = await client.waitForTransactionWithResult(
          pendingTransaction.hash,
        );
      } catch (error) {
        // see "Errors"
      }

}


async function ListNFT(collection_name,token_name,token_url,token_desc,token_owner,selling_price){

    const payload = {
        type: "entry_function_payload",
        function: `${contract_address}::marketplace::ListToken`,
        arguments: [collection_name,token_name,token_url,token_desc,token_owner,(parseInt(selling_price)*10**8),1684995089],
        type_arguments: []
      };
      
      try {
        const pendingTransaction = await window.aptos.signAndSubmitTransaction(payload);
      
        const client = new window.aptosSDK.AptosClient('https://devnet.aptoslabs.com');

        const txn = await client.waitForTransactionWithResult(
          pendingTransaction.hash,
        );
      } catch (error) {
        // see "Errors"
      }

}

async function DelistNFT(token_name){

  const payload = {
      type: "entry_function_payload",
      function: `${contract_address}::marketplace::RemoveFromListing`,
      arguments: [token_name],
      type_arguments: []
    };
    
    try {
      const pendingTransaction = await window.aptos.signAndSubmitTransaction(payload);
    
      const client = new window.aptosSDK.AptosClient('https://devnet.aptoslabs.com');

      const txn = await client.waitForTransactionWithResult(
        pendingTransaction.hash,
      );
      
    } catch (error) {
      // see "Errors"
    }

}


async function BuyNFT(token_name){

  const payload = {
      type: "entry_function_payload",
      function: `${contract_address}::marketplace::BuyToken`,
      arguments: [token_name],
      type_arguments: []
    };
    
    try {
      const pendingTransaction = await window.aptos.signAndSubmitTransaction(payload);
    
      const client = new window.aptosSDK.AptosClient('https://devnet.aptoslabs.com');

      const txn = await client.waitForTransactionWithResult(
        pendingTransaction.hash,
      );
      
      window.location.replace("/myitems");
      
    } catch (error) {
      // see "Errors"
    }

}





