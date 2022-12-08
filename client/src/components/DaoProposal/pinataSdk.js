require('dotenv').config();
// récupération des infos du .env
const key = process.env.PINATA_KEY;
const secret = process.env.PINATA_SECRET;
// cconnection à pinata avec la clé
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(key, secret);
// import de fs qui est un 'systeme de fichier'
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./image.png');




// on définie des options pour l'updload du fichier
const options = {
    pinataMetadata: {
        name: "AlyraNFT 2",
    },
    pinataOptions: {
        cidVersion: 0
    }
};

// fonction qui lance l'upload du fichier
pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    const body = {
        description: "Un NFT tres beau pour alyra dedicacé par J.White 2",
        image: result.IpfsHash,
        name: "JWhiteNFT 2",
    };

    // On pin le JSON au IPFS crée avec la fonction d'avant
    pinata.pinJSONToIPFS(body, options).then((json) => {
        console.log(json);
    }).catch((err) => {
        console.log(err);
    });

}).catch((err) => {
    console.log(err);
});