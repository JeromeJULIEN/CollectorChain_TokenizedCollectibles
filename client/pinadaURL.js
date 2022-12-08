const axios = require("axios");
const axiosRetry = require("axios-retry");
const FormData = require("form-data");
const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlNWI1NDdlOC0xMWE5LTQ3OGUtYjRhOC01YmI3ZWNkMTIzZjciLCJlbWFpbCI6ImplanVsaWVuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2M2JiODIwZjM0YjQ3YmFhMWNiOSIsInNjb3BlZEtleVNlY3JldCI6ImI1ZGUyMWQzN2VkOWQ4ZTEwNzk5ZjIxNGI1MDhiYWMwNDM3MDRmOTQ1MTlkYjQyZTllYTQ5NTVkODA2NTc1MTMiLCJpYXQiOjE2NjkzMDA2NzN9.NLTBtXgOVSU2SAvH7WRtlpIJgmWUUw9XSRRjrdH8-nQ`

const uploadToPinata = async (sourceUrl) => {

  const axiosInstance = axios.create();

  axiosRetry(axiosInstance, { retries: 5 });
  const data = new FormData();

  const response = await axiosInstance(sourceUrl, {
    method: "GET",
    responseType: "stream",
  });
  data.append(`file`, response.data);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxBodyLength: "Infinity",
      headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          'Authorization': JWT
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error)
  }
};

uploadToPinata("https://res.cloudinary.com/ddsddskey/image/upload/v1670438629/y3p5p0iblozqgpptlj85.png")