import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const NetworkForensics = () => {
  const navigate = useNavigate()

  const [cases, setCases] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/newCase')
      .then(response => response.json())
      .then(data => setCases(data))
  }, [])

  return (
    <div className='h-full w-full bg-slate-200 p-6 flex flex-col rounded-md'>
      <p className='mx-auto p-4'>Forensic Analysis of all network data</p>
      <div className='flex justify-center pb-4'>
        <button className='bg-blue-200 p-2 rounded-md w-5/6 border-blue-950 border-2' onClick={() => { navigate(`/newCase`) }}>New Case</button>
      </div>
      <ul>
        {
          cases.map((caseItem) => (
            <li key={caseItem.id}>
              <div className='h-fit w-5/6 bg-white mx-auto border-blue-950 border-2 rounded-xl p-4' onClick={() => { navigate(`/evidence/${caseItem.id}`) }}>
                <div className='p-4'>
                  <p className='px-1'>Case Id: {caseItem.id}</p>
                  <p className='px-1'>Case Name: {caseItem.name}</p>                  
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
