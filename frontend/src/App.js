import React from 'react'
import Forensics from './pages/Forensics';
import { Route, Routes } from "react-router-dom"
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import AllDocuments from './pages/AllDocuments';
import { NetworkForensics } from './pages/NetworkForensics';
import Logs from './pages/Logs';
import AllEvidence from './pages/AllEvidence';
import { NewCase } from './pages/NewCase';

function App() {

	// const [data, setData] = useState([])

	// useEffect(() => {
	// 	fetch("http://localhost:5000/members")
	// 		.then(res => {
	// 			// Check if the response is successful
	// 			if (!res.ok) {
	// 				throw new Error('Network response was not ok');
	// 			}
	// 			// Return the response data
	// 			return res.json();
	// 		})
	// 		.then(
	// 			data => {
	// 				setData(data.members);
	// 				console.log(data);
	// 			})
	// 		.catch(error => {
	// 			console.error('There was a problem with the fetch operation:', error);
	// 		});
	// }, [])
	return (
		// <div>
		//     {/* <h1>Members:</h1> */}
		//     {/* <ul>
		//         {data.map((member, index) => (
		//             <li key={index}>{member}</li>
		//         ))}
		//     </ul> */}
		// 	<Sidebar />
		// 	<div>
		// 	<Routes>
		// 		<Route path = '/' element = {<Dashboard />} />
		// 		<Route path = '/docs' element = {<AllDocuments />} />
		// 		<Route path = '/network' element = {<NetworkForensics />} />
		// 		<Route path = '/log' element = {<Logs />} />
		// 	</Routes>
		// 	{/* <AllCommands /> */}
		// 	{/* <Forensics /> */}
		// 	{/* <Foren /> */}
		// 	</div>

		// </div>

			<div className="flex">
				<Sidebar />
				<div className="flex-1 p-4"> 
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path='/docs' element={<AllDocuments />} />
						<Route path='/network' element={<NetworkForensics />} />
						<Route path='/log' element={<Logs />} />
						<Route path='/evidence/:case_id' element={<AllEvidence />} />
						<Route path='/forensics/:case_id' element={<Forensics />} />
						<Route path='/newCase' element={<NewCase />} />
					</Routes>
					{/* <Forensics /> */}
				</div>
			</div>

	);
}

export default App;