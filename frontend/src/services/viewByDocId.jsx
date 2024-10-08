import { abi } from "../../../contract/Contract.json";
import { ethers } from "ethers";

export const viewDocByDocId = async ( docId ) => {
  try {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const contractABI = abi;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const res = await contract.getDocumentByDocId(docId);
    console.log(res);
    let temp = [res[0].toNumber(), res[1].toNumber(), res[2], res[3]];
    return temp;
  } catch (err) {
    console.log(err);
    throw `Error retrieving document from blockchain ${err.message}`;
  }
};
