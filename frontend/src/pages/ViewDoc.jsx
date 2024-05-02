import React from "react";
import { useState } from "react";
import "../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "../components/ToastContainer";
import { uploadToIPFSHelper } from "../services/ipfsUpload";
import { storeDocOnBlockchain } from "../services/blockchainUploadDoc";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { viewDocByCaseId } from "../services/viewByCaseId";
import {getUrlFromIpfsHash} from "../services/getUrlFromIpfsHash";
import DocTable from "../components/DocTable";

export default function ViewDocComponent() {
  const [fileUrl, setFileUrl] = useState("");
  const [docId, setDocId] = useState("");
  const [caseId, setCaseId] = useState("");
  const [docType, setDocType] = useState("");

  const navigate = useNavigate();

  const [dataArray, setDataArray] = useState([
    { docId: 133, caseId: 29, docType: "pan card", url: "https://www.google.com"},
    { docId: 133, caseId: 29, docType: "pan card", url: "https://www.google.com"},
    { docId: 133, caseId: 29, docType: "pan card", url: "https://www.google.com"},
  ]);

  const pushToArray = (docId, caseId, docType, url) => {
    const newArray = [...dataArray, {docId: docId, caseId: caseId, docType: docType, url: url}];
    setDataArray(newArray);
    console.log(newArray);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await viewDocByCaseId(docId);
      console.log(res);

      const url = await getUrlFromIpfsHash(res[3]);
      setDocId(res[0]);
      setCaseId(res[1]);
      setDocType(res[2]);
      setFileUrl(url);

      pushToArray(docId, caseId, docType, fileUrl);

      toast("Document retrieved from blockchain ");
    } catch (err) {
      toast(`${err}`);
    }
  };

  return (
    <>
      <CustomToastContainer />

      <form className="mx-10 my-10" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="pb-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              View documents and evidence
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be retrieved securely from the blockchain
              network and IPFS.
            </p>
          </div>

          <div className="pb-8">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Document ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={docId}
                    onChange={(e) => setDocId(e.target.value)}
                    placeholder="Document ID"
                    // name="first-name"
                    // id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
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
                    // name="first-name"
                    // id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Document name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    placeholder="Document Type"
                    // name="first-name"
                    // id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-start gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              navigate("/");
            }}
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

      <DocTable data={dataArray} />
    </>
  );
}
