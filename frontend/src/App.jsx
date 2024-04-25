import { useEffect, useState } from "react";
import { abi } from "../../contract/Contract.json";
import { ethers } from "ethers";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [docId, setDocId] = useState("");
  const [caseId, setCaseId] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [docType, setDocType] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [role, setRole] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append("file", file);
      const metadata = JSON.stringify({
        name: file.name || "file",
      });
      fileData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      fileData.append("pinataOptions", options);

      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        },
      });

      const fileUrl =
        "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;

      const { IpfsHash } = responseData.data;
      console.log("Hash: ", IpfsHash);
      console.log("URL: ", fileUrl);
      setFileHash(IpfsHash);

      // Send inputs to backend
      await sendInputsToBackend(
        IpfsHash,
        docId,
        caseId,
        docType,
        name,
        addr,
        role
      );
    } catch (error) {
      console.error("Error uploading file to Pinata:", error);
    }
  };
  const sendInputsToBackend = async (
    ipfsHash,
    docId,
    caseId,
    docType,
    name,
    addr,
    role
  ) => {
    try {
      const response = await axios.post("http://localhost:3000/api/submit", {
        ipfsHash,
        docId,
        caseId,
        docType,
        name,
        addr,
        role,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending inputs to backend:", error);
    }
  };


  return (
    <>
      <Web3 />
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            placeholder="Document ID"
          />
          <input
            type="text"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            placeholder="Case ID"
          />
          <input
            type="text"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            placeholder="Document Type"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="Address"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />
          <button type="submit">Submit</button>
        </form>
        {fileHash && <div>File Hash: {fileHash}</div>}
      </div>
    </>
  );
}

function Web3() {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const contractABI = abi;

  useEffect(() => {
    const contractFunction = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("reached after provider");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const val = await contract.getUser(
        "0xB650612d3bB13faEBcD82042A4343dbce00BC93E"
      );
      console.log(val);
    };

    contractFunction();
  }, []);

  return (
    <>
      <div>contract address {contractAddress}</div>
    </>
  );
}

export default App;
