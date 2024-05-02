import { abi } from "../../../contract/Contract.json";
import { ethers } from "ethers";

export const storeDocOnBlockchain = async (
  docId,
  caseId,
  docType,
  fileHash
) => {
  try {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const contractABI = abi;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log("reached after provider");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // const val = await contract.getUser(
    //   "0xB650612d3bB13faEBcD82042A4343dbce00BC93E"
    // );
    // console.log(val);

    const owner = await signer.getAddress();
    // console.log(`owner: ${owner}`);
    const creator = owner;
    // console.log(`creator: ${creator}`);

    // console.log(`docId: ${docId}`);
    // console.log(`caseId: ${caseId}`);
    // console.log(`docType: ${docType}`);
    // console.log(`fileHash: ${fileHash}`);

    // const response = await contract.storeDocument(caseId, docId, docType, fileHash, owner, creator);
    // console.log(`response: ${response}`);

    const data = await contract.getDocumentByDocId(docId);
    console.log(`data: ${data}`);
  } catch (err) {
    console.log(err);
    throw "Error storing document on blockchain";
  }
};
