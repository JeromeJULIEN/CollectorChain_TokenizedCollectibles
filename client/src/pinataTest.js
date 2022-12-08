const axios = require('axios')
const FormData = require('form-data')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlNWI1NDdlOC0xMWE5LTQ3OGUtYjRhOC01YmI3ZWNkMTIzZjciLCJlbWFpbCI6ImplanVsaWVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2M2JiODIwZjM0YjQ3YmFhMWNiOSIsInNjb3BlZEtleVNlY3JldCI6ImI1ZGUyMWQzN2VkOWQ4ZTEwNzk5ZjIxNGI1MDhiYWMwNDM3MDRmOTQ1MTlkYjQyZTllYTQ5NTVkODA2NTc1MTMiLCJpYXQiOjE2NjkzMDA2NzN9.NLTBtXgOVSU2SAvH7WRtlpIJgmWUUw9XSRRjrdH8-nQ'

export const pinFileToIPFS = async (src) => {
    const formData = new FormData();
    
    // console.log('file======>',file);
    formData.append('file', src)
    
    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}


