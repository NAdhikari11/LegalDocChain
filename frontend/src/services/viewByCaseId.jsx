import { abi } from "../../../contract/Contract.json";
import { ethers } from "ethers";

export const viewDocByCaseId = async (caseId) => {
  try {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS; // Ensure this is set in your environment
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request access to user's accounts
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Call the smart contract function to get documents by case ID
    const res = await contract.getDocumentByCaseId(caseId);

    console.log("Response from contract:", res); // Log the response for debugging

    // Ensure the response is in the expected format
    if (!Array.isArray(res) || res.length !== 3) {
      throw new Error("Unexpected response format");
    }

    // Check if the response arrays are empty
    if (res.some((array) => array.length === 0)) {
      throw new Error("No documents found for the given Case ID. Something went wrong.");
    }

    const [docIds, docTypes, docContents] = res;

    // Validate that docIds is an array
    if (!Array.isArray(docIds)) {
      throw new Error("docIds is not an array");
    }

    // Map the values and convert BigNumber to number
    const documents = docIds.map((docId, index) => ({
      docId: docId.toNumber(), // Convert BigNumber to number
      docType: docTypes[index],
      docContent: docContents[index]
    }));

    console.log(documents); // Log the retrieved documents for debugging
    return documents; // Return the list of documents
  } catch (err) {
    console.error("Error retrieving documents from blockchain:", err);
    throw new Error(`Error retrieving documents from blockchain: ${err.message}`);
  }
};
