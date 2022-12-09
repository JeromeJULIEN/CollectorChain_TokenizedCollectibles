import { useState } from "react"
import axios from "axios"

const FileUpload = () => {

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async() => {

    const formData = new FormData();
    
    formData.append('file', selectedFile)

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      pinataMetadata: {
        name: "AlyraNFT",
      },
      pinataOptions: {
          cidVersion: 0
      }
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: "63bb820f34b47baa1cb9",
          pinata_secret_api_key: "b5de21d37ed9d8e10799f214b508bac043704f94519db42e9ea4955d80657513"
      }});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <label class="form-label">Choose File</label>
    <input type="file"  onChange={changeHandler}/>
    <button onClick={handleSubmission}>Submit</button>
    </>
  )
}

export default FileUpload