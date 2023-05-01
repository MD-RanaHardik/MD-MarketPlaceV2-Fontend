
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
  
  const operationsDoc =`
    query MyQuery {
      current_table_items(
        where: {table_handle: {_eq: "0x864458b459e5557d8838170422b5b6b18871e792d16a82dc860a2aa86b1e48cc"}}
      ) {
        decoded_key
        decoded_value
      }
    }
  `;
  
  async function startFetchListedNFT() {
    const { errors, data } = await fetchGraphQL(operationsDoc,"MyQuery",{});
  
    if (errors) {
      return "Error";
    }
  
   
    return data;
   
  }
  
  