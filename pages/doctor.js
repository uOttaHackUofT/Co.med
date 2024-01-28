import { useEffect, useState } from 'react';
import Head from 'next/head';
import './styles.css';

export default function Doctor() {
  const [formData, setFormData] = useState(null);
  const [response, setResponse] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [chatResponse, setChatResponse] = useState('');
  const [chatCitationResponse, setChatCitationResponse] = useState('');

  useEffect(() => {
    // Retrieve the data from local storage
    const patientDataJSON = localStorage.getItem('patientData');

    if (patientDataJSON) {
      // Parse the JSON string to get the patientData object
      const patientData = JSON.parse(patientDataJSON);

      // Access formData and response from patientData
      const { formData, response } = patientData;

      // Set the state variables
      setFormData(formData);
      setResponse(response);

      // Construct the message to send to the API
      const message = `Do not give a disclaimer about being an ai and not being able to give medical advice. The text you generate will be read by a doctor, I need you to be a co-pilot for a doctor. What would you diagnose the following patient and recommend as treatment plans. Dont forget citations. 40 words max: ${JSON.stringify(formData)}`;

      // Use the constructed message in the API request
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // Send the message as the API request body
      };

      // Make the API request to /api/chat
      fetch('/api/chat', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // Update the chatResponse state with the API response
          setChatResponse(data.text);
          console.log(data)
          setChatCitationResponse(data.citations);
        })
        .catch((error) => {
          console.error('Error with chat API:', error);
          setChatResponse('Error processing chat request');
        });
    } else {
      // Handle the case where patientData is not available
      console.error('Patient Data not found.');
    }
  }, []); // Empty dependency array to ensure this effect runs only once

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const renderFormDataTable = () => {
    if (!formData) return null;

    return (
      <div className='fullChart'>

        <h3 onClick={toggleFormVisibility} style={{ cursor: 'pointer' }}>
          Full Patient Chart:
          {isFormVisible ? <span> &#9660;</span> : <span> &#9654;</span>}
        </h3>
        {isFormVisible && (
          <table>
            <tbody>
              {Object.entries(formData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  const chat = () => {
    if (!formData) return null;

    return (
      <div className='chat'>
        <h3>Diagnosis and Treatment Plan Recommendation</h3>
        {/* Display chatResponse here */}
        <p>{chatResponse}</p>
      </div>
    );
  };

  const renderPapers = () => {
    if (!formData) return null;
  
    return (
      <div className='fullChart'>
        <h3> Relevant Research Paper </h3>
        <p>{chatCitationResponse}</p>
      </div>
    );
  };
  

  const renderClassificationInfo = () => {
    if (!response || !response.classifications || response.classifications.length === 0) {
      return null;
    }

    const classification = response.classifications[0]; // Assuming there is only one classification

    return (
      <div className='rec'>
        <h3><strong>Patient:</strong> {formData.firstName} {formData.lastName}</h3>
        <table>
          <tbody>
            <tr>
              <td>Triage Level:</td>
              <td>{classification.prediction}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className='containerDoctor'>
      <Head>
        <title>Doctor View</title>
      </Head>
      {renderClassificationInfo()}

      {chat()}
      {renderPapers()}

      {renderFormDataTable()}
      <br></br>
      <br></br>
    </div>
  );
}
