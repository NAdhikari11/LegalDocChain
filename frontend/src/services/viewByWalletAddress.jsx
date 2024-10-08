import { abi } from "../../../contract/Contract.json";
import { ethers } from "ethers";

export const viewDocsByUser = async () => {
  try {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const contractABI = abi;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request account access
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Call the getDocumentByUser function from the contract
    const res = await contract.getDocumentByUser();
    
    // Extract the results
    const documentList = res[0].map((docId, index) => {
      return {
        docId: docId.toNumber(),          // Convert BigNumber to number
        caseId: res[1][index].toNumber(), // Convert BigNumber to number
        docType: res[2][index],            // Document type (already a string)
        fileUrl: res[3][index]             // Document content or file URL
      };
    });

    console.log(documentList);
    return documentList; // Return the formatted list of documents
  } catch (err) {
    console.log(err);
    throw new Error(`Error retrieving documents from blockchain: ${err.message}`);
  }
};
