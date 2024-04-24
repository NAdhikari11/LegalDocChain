import { useEffect } from "react";
import { abi } from "../../contract/Contract.json";
import { ethers } from "ethers";
import "./App.css";

function App() {
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
