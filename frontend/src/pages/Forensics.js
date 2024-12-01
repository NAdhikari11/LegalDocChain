import React from 'react'
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Forensics = () => {

  const case_id = useParams()
  const [title, setTitle] = useState('');
  const [inputFile, setinputFile] = useState('');
  const [filterExpressions, setfilterExpressions] = useState('');
  const [outputFile, setoutputFile] = useState('');
  const [inputCommand, setinputCommand] = useState('');

  const history = useNavigate()

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleInputFileChange = (event) => {
    setinputFile(event.target.value);
  };

  const handleOutputFileChange = (event) => {
    setoutputFile(event.target.value);
  };

  const handleFilterChange = (event) => {
    setfilterExpressions(event.target.value);
  };

  const handleInputCommandChange = (event) => {
    setinputCommand(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('inputFile', inputFile);
      formData.append('inputCommand', inputCommand);
      formData.append('filterExpressions', filterExpressions);
      formData.append('outputFile', outputFile);
      formData.append('case_id', case_id.case_id);

      const response = await fetch(`http://localhost:5000/forensics/${case_id.case_id}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(response.data);
      
      if(data.evidence_id){
        history.push(`evidence/${case_id.case_id}`)
      }
      else{
        console.error('Failed to save evidence', data.error)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form>
      <div className='w-4/5 mx-auto border-2 p-12 mt-10 rounded-lg'>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-7 text-gray-900">Network Forensics</h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter the information needed to run TShark Commands
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-950 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Input File"
                      onChange={handleTitleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Input File
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-950 sm:max-w-md">
                    <input
                      type="text"
                      name="inputFile"
                      id="inputFile"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Input File"
                      onChange={handleInputFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Filter Expressions
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-950 sm:max-w-md">
                    <input
                      type="text"
                      name="filterExpressions"
                      id="filterExpressions"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Filter Expressions"
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Output File
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-950 sm:max-w-md">
                    <input
                      type="text"
                      name="outputFile"
                      id="outputFile"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Output File"
                      onChange={handleOutputFileChange}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Input Commands
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-950 sm:max-w-md">
                    <input
                      type="text"
                      name="inputCommand"
                      id="inputCommand"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Input Commands"
                      onChange={handleInputCommandChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950" onClick={handleSubmit}>
            Enter
          </button>
        </div>
      </div>

    </form>
  )
}

export default Forensics


