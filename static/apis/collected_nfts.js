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
  
  
  
 
  
  async function startFeatchCollectedNFT(address) {

    const operationsDoc1 = `
    query MyQuery {
      current_token_ownerships(
        where: {collection_name: {_eq: "MD-NFTCollection"}, creator_address: {_eq: "0xacf4a0ac740b9530686f91e2348d9fd7168290f4cfceb85f1838fcd121685414"}, owner_address: {_eq: "${address}"}}
      ) {
        creator_address
        amount
        current_token_data {
          collection_name
          creator_address
          description
          metadata_uri
          name
          supply
          last_transaction_timestamp
        }
        owner_address
      }
    }
  `;

    const { errors, data } = await fetchGraphQL(
        operationsDoc1,
        "MyQuery",
        {}
      );
  
    if (errors) {
      
    
      return errors;
    }
  
     
    return data;
  }
  
