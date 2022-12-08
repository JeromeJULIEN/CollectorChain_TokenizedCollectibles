import axios from "axios";
var FormData = require('form-data');
var data = new FormData()

var config = {
    method: 'get',
    url: 'https://api.pinata.cloud/data/testAuthentication',
    headers: { 
      'Authorization': 'Bearer' +  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlNWI1NDdlOC0xMWE5LTQ3OGUtYjRhOC01YmI3ZWNkMTIzZjciLCJlbWFpbCI6ImplanVsaWVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2M2JiODIwZjM0YjQ3YmFhMWNiOSIsInNjb3BlZEtleVNlY3JldCI6ImI1ZGUyMWQzN2VkOWQ4ZTEwNzk5ZjIxNGI1MDhiYWMwNDM3MDRmOTQ1MTlkYjQyZTllYTQ5NTVkODA2NTc1MTMiLCJpYXQiOjE2NjkzMDA2NzN9.NLTBtXgOVSU2SAvH7WRtlpIJgmWUUw9XSRRjrdH8-nQ'
    }
};

var pinFile = {
    method:'post',
    url:'https://api.pinata.cloud/pinning/pinFileToIPFS',
    data: data,
    headers:{
        pinata_api_key : '63bb820f34b47baa1cb9',
        pinata_secret_api_key: 'b5de21d37ed9d8e10799f214b508bac043704f94519db42e9ea4955d80657513'
    }

}

export function uploadFileToIPFS(value, callback) {
    console.log(value);
    data.append('file', './image.png');
    data.append('pinataOptions','{"cidVersion":1}');
    data.append('pinataMetadata', '{"name":"myfile","keyvalues": {"company":"pinata"}')

    axios(pinFile)
    .then(callback)
    .catch(console.error)

}