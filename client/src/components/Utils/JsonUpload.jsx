import { useState } from "react"
import axios from "axios"

const JsonUpload = () => {

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async() => {

    var data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1
      },
      "pinataMetadata": {
        "name": "testing",
      },
      "pinataContent": {
        "collection":"collectionName",
        "name": "testing",
        "description":"desc text",
        "image":"imageURL",
        "initial value":"value",
        "attributes": [
          {"attribute 1": "value 1"},
          {"attribute 2": "value 2"}
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

  return (
    <>
    <label class="form-label">Choose File</label>
    <input type="file"  onChange={changeHandler}/>
    <button onClick={handleSubmission}>Submit</button>
    </>
  )
}

export default JsonUpload

