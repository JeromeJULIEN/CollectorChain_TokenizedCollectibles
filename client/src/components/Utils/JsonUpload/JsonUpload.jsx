import axios from "axios"

const JsonUpload = async(test) => {

    var data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": `${test}`,
      },
      "pinataContent": {
        "collection":"collectionName",
        "name": "testing",
        "description":"desc text",
        "image":"imageURL",
        "initial value":"value",
        "attributes": [
          {"trait_type": "trait 1", "value":"value 1"},
          {"trait_type": "trait 2", "value":"value 2"}
        ]
      }
    });

    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: { 
        'Content-Type': 'application/json', 
        pinata_api_key: "63bb820f34b47baa1cb9",
        pinata_secret_api_key: "b5de21d37ed9d8e10799f214b508bac043704f94519db42e9ea4955d80657513"
      },
      data : data
    };

    const res = await axios(config);

    console.log(res.data);  
    };

  


export default JsonUpload

