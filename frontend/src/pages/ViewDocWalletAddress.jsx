import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "../components/ToastContainer";
import { useNavigate } from "react-router-dom";
import DocTable from "../components/DocTable";
import ViewTypeButton from "../components/ViewType";
import { viewDocsByUser } from "../services/viewByWalletAddress"; // Adjust import as needed
import { getUrlFromIpfsHash } from "../services/getUrlFromIpfsHash";

export default function ViewByWalletAddressComponent() {
  const [walletAddress, setWalletAddress] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const docs = await viewDocsByUser(walletAddress); // Fetch documents by wallet address
      console.log("Retrieved documents:", docs);

      const formattedDocs = docs.map((doc) => ({
        docId: doc.docId,
        caseId: doc.caseId,
        docType: doc.docType,
        url: getUrlFromIpfsHash(doc.fileUrl), // Construct URL from IPFS hash
      }));

      setDataArray(formattedDocs); // Update state with formatted documents
      toast("Documents retrieved successfully!");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <CustomToastContainer />
      <ViewTypeButton />
      <form className="mx-10 my-10" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="pb-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              View documents and evidence by Wallet Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be retrieved securely from the blockchain
              network and IPFS using your Wallet Address.
            </p>
          </div>

          <div className="pb-8">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="wallet-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Wallet Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Wallet Address"
                    autoComplete="wallet-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-start gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View
          </button>
        </div>
      </form>

      <DocTable data={dataArray} /> {/* Pass dataArray to DocTable */}
    </>
  );
}
