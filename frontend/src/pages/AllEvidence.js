import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const AllEvidence = () => {
    const navigate = useNavigate()
    const { case_id } = useParams()

    const [evidence, setEvidence] = useState([])
    const [explanation, setExplanation] = useState(null)
    const [isExplanationVisible, setIsExplanationVisible] = useState(false);

    useEffect(() => {
        const fetchEvidence = async () => {
            try {
                const response = await fetch(`http://localhost:5000/evidence/${case_id}`);
                const data = await response.json();
                setEvidence(data);
            } catch (error) {
                console.error('Failed to fetch evidence:', error);
            }
        };

        fetchEvidence();
    }, [case_id]);

    const explainFindings = async (fileContent) => {
            try {
                const response = await fetch(`http://localhost:5000/explain`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ fileContent }),
                    }
                );
                const data = await response.json();
                if (data.message === 'Success') {
                    setExplanation(data.explanation);
                    setIsExplanationVisible(true);
                } else {
                    console.error('Error explaining findings:', data.message);
                }
            } catch (error) {
                console.error('Error explaining findings:', error);
            }
    };

    const handleCloseExplanation = () => {
        setIsExplanationVisible(false);  
    };


    return (
        <div className='h-full w-full bg-slate-200 p-6 flex flex-col rounded-md'>
            <p className='mx-auto p-4'>Evidence found by performing Network Forensics</p>
            {/* <p>{case_id}</p> */}
            <div className='flex justify-center pb-4'>
                <button className='bg-blue-200 p-2 rounded-md w-5/6 border-blue-950 border-2' onClick={() => { navigate(`/forensics/${case_id}`) }}>Perform further analysis</button>
            </div>
            <ul>
                {
                    evidence.map((evidenceItem) => {
                        return (  // Add return here to render each item
                            <li key={evidenceItem.id}>
                                <div className='h-fit w-5/6 bg-white mx-auto border-blue-950 border-2 rounded-xl p-4'>
                                    <p className='p-1'>Case Id: {evidenceItem.cases_id}</p>
                                    <p className='p-1'>Title: {evidenceItem.title}</p>
                                    <p className='p-1'>Commands: {evidenceItem.commands}</p>
                                    <p className='p-1'>Result: {evidenceItem.query_result}</p>
                                    <div className='flex justify-center p-1'>
                                        <button className='bg-blue-200 p-2 rounded-sm w-3/4'>Check evidence</button>
                                    </div>
                                    <div className='flex justify-center p-1'>
                                        <button
                                            className='bg-blue-200 p-2 rounded-sm w-3/4'
                                            onClick={() => explainFindings(evidenceItem.query_result)}>
                                            Explain Findings
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
            {isExplanationVisible && explanation && (
                <div className="mt-4 p-4 bg-white border-2 border-blue-950 rounded-xl">
                    <h3 className="font-bold">Explanation</h3>
                    <p>{explanation}</p>
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={handleCloseExplanation} 
                            className="bg-red-200 p-2 rounded-md"
                        >
                            Close Explanation
                        </button>
                    </div>
                </div>
            )}

        </div>
    )

}
export default AllEvidence