import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from '@mui/material';
import Link from 'next/link';
import './styles.css';

export default function Nurse() {
    const [formData, setFormData] = useState(null);
    const [response, setResponse] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

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
        } else {
            // Handle the case where patientData is not available
            console.error('Patient Data not found.');
        }
    }, []);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const renderFormDataTable = () => {
        if (!formData) return null;

        return (
            <div className='fullChart'>

                <h2 onClick={toggleFormVisibility} style={{ cursor: 'pointer' }}>
                    Full Patient Chart:
                    {isFormVisible ? <span> &#9660;</span> : <span> &#9654;</span>}
                </h2>
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
                            <td>Recommend Triage Level:</td>
                            <td>{classification.prediction}</td>
                        </tr>
                        <tr>
                            <td>Confidence Level:</td>
                            <td>{(classification.confidence * 100).toFixed(2)}%</td>
                        </tr>
                    </tbody>
                </table>

                <Link href="/doctor">
                    <Button type="submit" variant="contained" color="primary">
                        Send to Doctor
                    </Button>
                </Link>
            </div>
        );
    };

    return (
        <div className='containerNurse'>
            <Head>
                <title>Nurse View</title>
            </Head>
            {renderClassificationInfo()}
            <br></br>
            <br></br>
            <br></br>
            {renderFormDataTable()}
            <br></br>
            <br></br>
        </div>
    );
}
