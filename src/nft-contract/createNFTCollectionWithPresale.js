import { BigNumber, ethers } from "ethers"
import NFT from "../contractsData/MyToken.json";
// import NFT from "../../backend/artifacts/contracts/NFT_with_presale.sol/MyToken.json";

import UIConstants from "../ui-constants.json"

export async function createNFTCollectionWithPresale(baseURI, name, symbol, presale) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const deployer = await signer.getAddress();
    // The factory we use for deploying contracts
    const factory = new ethers.ContractFactory(NFT.abi, NFT.bytecode, signer)
    let startAt = (new Date(presale.startAt)).getTime() / 1000;
    let endAt = (new Date(presale.endAt)).getTime() / 1000;
    // Deploy an instance of the contract
    const contract = await factory.deploy(
      baseURI+"/",
      name,
      symbol,
      presale.maxSupply.toString(),
    //   ethers.utils.parseEther(presale.mintPrice.toString()),
      startAt.toString(),
      endAt.toString(),
      ethers.utils.parseEther(presale.fee.toString()),
      presale.maxPerWallet.toString(),
      presale.softCap.toString(),
      presale.platformFeeType.toString(),
      {
        value: ethers.utils.parseEther(UIConstants.dropFee),
      }
      
    )
    // const contract = await factory.deploy(
    //   baseURI+"/",
    //   name,
    //   symbol,
    //   ethers.utils.parseUnits(presale.maxSupply.toString()),
    // //   ethers.utils.parseEther(presale.mintPrice.toString()),
    //   ethers.utils.parseUnits(startAt.toString()),
    //   ethers.utils.parseUnits(endAt.toString()),
    //   ethers.utils.parseEther(presale.fee.toString()),
    //   ethers.utils.parseUnits(presale.maxPerWallet.toString()),
    //   ethers.utils.parseUnits(presale.softCap.toString()),
    //   ethers.utils.parseUnits(presale.platformFeeType.toString()),
    //   {
    //     value: ethers.utils.parseEther(UIConstants.dropFee),
    //   }
      
    // )
    await contract.deployTransaction.wait()
    return {address: contract.address, deployer}
  } catch (error) {
      throw(error);
  }
}
