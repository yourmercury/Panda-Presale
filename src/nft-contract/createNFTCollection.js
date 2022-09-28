import { ethers } from "ethers"
import NFT from "../contractsData/NFT.json"

import UIConstants from "../ui-constants.json"

export async function createNFTCollection(uris, name, symbol) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  // The factory we use for deploying contracts
  const factory = new ethers.ContractFactory(NFT.abi, NFT.bytecode, signer)

  // Deploy an instance of the contract
  const contract = await factory.deploy(uris, name, symbol, {
    value: ethers.utils.parseEther(UIConstants.dropFee),
  })

  return contract.address
}
