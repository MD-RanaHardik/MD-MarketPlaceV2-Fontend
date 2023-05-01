/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
      "https://indexer-devnet.staging.gcp.aptosdev.com/v1/graphql",
      {
        method: "POST",
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );
  
    return await result.json();
  }
  
 
  
  
    
  async function startFetchAccountBalance(address) {
    const operationsDoc = `
    query MyQuery {
      coin_balances(
        where: {owner_address: {_eq: "${address}"}}
      ) {
        amount
      }
    }
  `;
    const { errors, data } = await fetchGraphQL(
        operationsDoc,
        "MyQuery",
        {}
      );
  
    if (errors) {
      // handle those errors like a pro
      return "error";
    }
  
    // do something great with this precious data
    return data;
  }
  
