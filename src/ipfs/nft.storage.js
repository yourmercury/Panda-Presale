import { NFTStorage, File, Blob } from "nft.storage"

const API_KEY = process.env.NFT_STORAGE_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE5M0I4NGFlNThkMDNkOTAwQjc5MzExOGEzNDQ2ZEZCZUU5NTVERmEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTUxMDYyMDg2MCwibmFtZSI6IlNUUiAtIE1hcmtldHBsYWNlICJ9.D71kmGtnh1wOLBF2BfVqMtuCPk79wvEiFxuhpuKgqwA"
const client = new NFTStorage({ token: API_KEY });

async function createMetadata(image, tokenId) {
  try {
    let url = URL.createObjectURL(image)
    let res = await fetch(url)
    let blob = await res.blob()
    const content = new File([image], tokenId + "." + blob.type.split("/")[1])
    const cid = await client.storeBlob(content)
    console.log("this is the image cid ", "https://nftstorage.link/ipfs/"+cid)
    return cid
  } catch (error) {
    throw error;
  }
}

export async function uploadToIpfs(metadatas, images) {
  try {
    const processed = []

    for(let index=0; index<metadatas.length; index++){
        try {
            let cid = await createMetadata(images[index], (index + 1))
            metadatas[index].image = "https://nftstorage.link/ipfs/" + cid;
            processed.push(metadatas[index])
          } catch (error) {
              console.log(error);
          }
    }

    console.log("this is processed ", processed);

    const directory = processed.map((metadata, index) => {
      return new File([JSON.stringify(metadata)], (index + 1).toString());
    });

    const baseURI = await client.storeDirectory(directory);
    console.log("https://nftstorage.link/ipfs/"+baseURI);
    return "https://nftstorage.link/ipfs/"+baseURI;
  } catch (error) {
    console.log(error)
  }
}
