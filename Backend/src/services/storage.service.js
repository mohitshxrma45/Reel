const Imagekit = require("imagekit");


//video upload service
const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

//function to upload file to imagekit
async function uploadFile(file, fileName) {
    const result = await imagekit.upload({

        file: file,//buffer or base64 string 
        fileName: fileName
    })
    return result;
}

module.exports = {
    uploadFile
}