import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "../components/ToastContainer";
import { useNavigate } from "react-router-dom";
import DocTable from "../components/DocTable";
import ViewTypeButton from "../components/ViewType";
import { viewDocByCaseId } from "../services/viewByCaseId";
import { getUrlFromIpfsHash } from "../services/getUrlFromIpfsHash";

export default function ViewByCaseIdComponent() {
  const [caseId, setCaseId] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const docs = await viewDocByCaseId(caseId); // Fetch documents by case ID
      console.log("Retrieved documents:", docs);

      const formattedDocs = docs.map((doc) => ({
        docId: doc.docId,
        caseId,
        docType: doc.docType,
        url: getUrlFromIpfsHash(doc.docContent), // Construct URL from IPFS hash
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
              View documents and evidence by Case ID
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be retrieved securely from the blockchain
              network and IPFS using Case ID.
            </p>
          </div>

          <div className="pb-8">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="case-id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Case ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
                    placeholder="Case ID"
                    autoComplete="given-name"
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
