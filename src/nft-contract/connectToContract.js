import { BigNumber, ethers } from "ethers"
import NFT from "../contractsData/MyToken.json";

import UIConstants from "../ui-constants.json"

export function connectToContract(address) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, NFT.abi, signer);
    return {contract, signer};
  } catch (error) {
      throw(error);
  }
}

export async function getAddress(){
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        return await signer.getAddress();
    }catch(error){
        throw(error);
    }
}

export async function getPresaleDetails(address){
    try {   
        const {contract, signer} = connectToContract(address);

        // console.log(contract);
        // return;

        const details = {};

        details.myAddress = await contract.signer.getAddress();
        details.contract = contract.address;
        details.symbol = await contract.symbol()
        details.name = await contract.name();
        details.totalSupply = await contract.totalSupply()
        details.maxSupply = await contract.maxSupply();
        details.presale = {
            softCap: await contract.softcap(),
            fee: await contract.minMintFee(),
            maxPerWallet: await contract.maxPerWallet(),
            startAt: await contract.start(),
            endAt: await contract.end()
        };
        details.uniqueOrders = await contract.uniqeContributors();
        details.presaleSales = await contract.contribution();
        details.presaleCount = await contract.contributionCount();
        details.userOrder = await contract.contributor(details.myAddress);
        details.paidByUser = await contract.contributorValue(details.myAddress);
        details.baseUri = await contract.baseUri();

        console.log(details)
    
        let keys = Object.keys(details);
        keys.forEach((key)=> {
            details[key] = parseNumbers(details[key]);
            if(key == "presale"){
                details[key].fee = details[key].fee/10**18;
            }else if(key == "paidByUser" || key == "presaleSales") {
                details[key] = details[key] / 10**18;
            }
        })

        details.softCapETH = details.presale.softCap * details.presale.fee;

        return details
    } catch (error) {
        throw(error);
    }
}

export function parseNumbers(obj){
    if(obj._isBigNumber){
        return (parseInt(obj._hex));
    }else if(typeof obj == "string"){
        return obj;
    }else if(obj.length){
        let keys = Object.keys(obj).slice(obj.length)
        let values = Object.values(obj).slice(obj.length)
        let _obj = {};
        values.forEach((value, index)=>{
            _obj[keys[index]] = parseNumbers(value);
        })
        return _obj;
    }else {
        let keys = Object.keys(obj)
        let values = Object.values(obj)
        let _obj = {};
        values.forEach((value, index)=>{
            _obj[keys[index]] = parseNumbers(value);
        })
        return _obj;
    }
}

export async function presaleMint(fee, address){
    const {contract} = connectToContract(address);
    let pay = false;
    try {
        let tx = await contract.contribute({value: ethers.utils.parseEther(fee), gasLimit: 3**12})
        let rt = await tx.wait()
        pay = true;
    } catch (error) {
        console.log(error);
        throw(error);
    }
}

export async function withdraw(address){
    const {contract} = connectToContract(address);
    try {
        let tx = await contract.withdraw({gasLimit: 3**12})
        let rt = await tx.wait()
    } catch (error) {
        console.log(error);
        throw(error);
    }
}

export async function claim(address){
    const {contract} = connectToContract(address);
    try {
        let tx = await contract.claim({gasLimit: 3**12})
        let rt = await tx.wait()
    } catch (error) {
        console.log(error);
        throw(error);
    }
}

export async function dump(address){
    const {contract} = connectToContract(address);
    try {
        let tx = await contract.dump()
        let rt = await tx.wait()
    } catch (error) {
        console.log(error);
        throw(error);
    }
}

export async function whitelistWallet(){
    try {
        const {contract} = connectToContract("0x15CA91C1D9E46Ab3938eBAD9E5C1F7f0c9d710Bb");
        let tx = await contract.whitelistWallets(["0x8b02EA4542496d5014F2A1bc0F624eF4eaC3A761", "0x412Bb6E1feBbfCf428dd0f6a739c30C79128a244"]);
        await tx.wait();
    } catch (error) {
        throw(error);
    }
}