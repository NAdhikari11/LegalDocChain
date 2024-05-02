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

export function UploadDocComponent() {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [docId, setDocId] = useState("");
  const [caseId, setCaseId] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [docType, setDocType] = useState("");

  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const tempFileHash = await uploadToIPFSHelper(file);
      toast("File uploaded to IPFS");

      const fileUrl = `${import.meta.env.VITE_IPFS_URL}${tempFileHash}`;
      setFileUrl(fileUrl);
      setFileHash(tempFileHash);

      await storeDocOnBlockchain(docId, caseId, docType, tempFileHash);
      toast("Document stored on blockchain ");
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
              Upload documents and evidence
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be securely stored on the blockchain network
              and IPFS.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-3">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Document
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-10 w-10 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-2 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PDF, PNG, JPG, or any other file type
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
              <div className="sm:col-span-3">
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
              </div>
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
            Upload
          </button>
        </div>
      </form>

      {/* <div>----------------------------------------------</div>
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

      <br /> */}
    </>
  );
}
