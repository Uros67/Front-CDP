import Web3 from "web3";
import ContractABI from "./contract/VaultInfoABI.json"
import { Buffer } from "buffer";
import {bytesToString} from "@defisaver/tokens/esm/utils.js"

const contractAddress = "0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d";

window.Buffer = window.Buffer || Buffer;

async function connectWallet() {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
        }
        catch (err) {
            console.log("Connect wallet", err)
        }
    } else {
        alert("Please install Metamask")
    }
}
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(ContractABI, contractAddress);



function convertWei(amount){
    return Math.floor(Number(amount) / 1e18);
}
async function getCdp(cdpId){
    const { ilk, collateral, debt } = await contract.methods.getCdpInfo(cdpId).call();
    const ilkString = bytesToString(ilk);
    const convertedColl = convertWei(collateral);
    const convertedDebt = convertWei(debt);
    return ({ cdpId, ilkString, convertedColl, convertedDebt });

}



export {

    getCdp,
    connectWallet,

}