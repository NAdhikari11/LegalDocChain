import { useEffect, useState } from "react";
import { abi } from "../../contract/Contract.json";
import { ethers } from "ethers";
import axios from "axios";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "./components/ToastContainer";
import { uploadToIPFSHelper } from "./services/ipfsUpload";
import { storeDocOnBlockchain } from "./services/blockchainUploadDoc";

function App() {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [docId, setDocId] = useState("");
  const [caseId, setCaseId] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [docType, setDocType] = useState("");

  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [role, setRole] = useState("");

  // const uploadToIPFS = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const fileData = new FormData();
  //     fileData.append("file", file);

  //     const responseData = await axios({
  //       method: "post",
  //       url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       data: fileData,
  //       headers: {
  //         pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
  //         pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     const fileUrl = `https://gateway.pinata.cloud/ipfs/${responseData.data.IpfsHash}`;
  //     console.log("URL: ", fileUrl);

  //     setFileUrl(fileUrl);
  //   } catch (error) {
  //     toast("Error uploading file to IPFS");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tempFileHash = await uploadToIPFSHelper(file);

    if (tempFileHash != undefined) {
      toast("File uploaded to IPFS");

      const fileUrl = `${import.meta.env.VITE_IPFS_URL}${tempFileHash}`;
      setFileUrl(fileUrl);
      setFileHash(tempFileHash);

      await storeDocOnBlockchain(docId, caseId, docType, tempFileHash);
    } else {
      toast("Error uploading file to IPFS");
    }
  };

  return (
    <>
      <CustomToastContainer />
      <div></div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <br />
        <input
          type="text"
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
          placeholder="Document ID"
        />
        <br />
        <input
          type="text"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
          placeholder="Case ID"
        />
        <br />
        <input
          type="text"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          placeholder="Document Type"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <br />
        <input
          type="text"
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          placeholder="Address"
        />
        <br />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <br />

      {/* <div>
        {fileUrl && (
          <a href={fileUrl} download>
            {fileUrl}
          </a>
        )}
      </div> */}
    </>
  );
}

export default App;
