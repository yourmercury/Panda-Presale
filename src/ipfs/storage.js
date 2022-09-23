import { Web3Storage } from "web3.storage"

const client = new Web3Storage({
  token: process.env.REACT_APP_WEB3STORAGE_TOKEN,
})

export async function storeFiles(files) {
  const cidstring = await client.put(files)
  return files.map((file) => `https://${cidstring}.ipfs.w3s.link/${file.name}`)
}

export async function storeNFTMetadatas(nftMetadatas) {
  const uris = await Promise.all(
    nftMetadatas.map(async (nftMetadata) => {
      const blob = new Blob([JSON.stringify(nftMetadata)], {
        type: "application/json",
      })
      const metadata = new File([blob], "metadata.json")
      return await client.put([metadata])
    })
  )
  return uris.map((uri) => `https://${uri}.ipfs.w3s.link/metadata.json`)
}
