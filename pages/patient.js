import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import './styles.css'; // Import your CSS file
import example_data from './data/trainedData.json'

const Patient = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhoneNumber: '',
    medicalHistory: '',
    recentInjuries: '',
    recentIllnesses: '',
    substanceUseHistory: '',
    symptoms: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate formDataString based on form data fields
    const formDataString =
      `DOB: ${formData.dateOfBirth}\n` +
      `Gender: ${formData.gender}\n` +
      `Medical History: ${formData.medicalHistory}\n` +
      `Recent Injuries: ${formData.recentInjuries}\n` +
      `Recent Illnesses: ${formData.recentIllnesses}\n` +
      `Symptoms ${formData.symptoms}\n` +
      `Substance Use History: ${formData.substanceUseHistory}\n`;

    // Create an object with the formatted data
    const formattedData = {
      "examples": example_data,
      "inputs": [
        formDataString,
      ],
    };

    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const responseBody = await response.json(); 
        // Handle a successful response here
        console.log('Form data submitted successfully');
        console.log('Response Body:', responseBody);
      } else {
        // Handle errors here
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <h1>Patient Information</h1>

          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="date"

              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="email"
            />
          </Grid>

          <h1>Emergency Contact</h1>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="emergencyContactPhoneNumber"
              value={formData.emergencyContactPhoneNumber}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              type="tel"
            />
          </Grid>

          <h1>Medical History</h1>
          <Grid item xs={12}>
            <TextField
              label="Please Specify Medical History"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <h1>Recent Injuries</h1>
          <Grid item xs={12}>
            <TextField
              label="Recent Injuries"
              name="recentInjuries"
              value={formData.recentInjuries}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Recent Illnesses"
              name="recentIllnesses"
              value={formData.recentIllnesses}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <h1>Substance Use History</h1>
          <Grid item xs={12}>
            <TextField
              label="Please Specify Substances"
              name="substanceUseHistory"
              value={formData.substanceUseHistory}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <h1>Symptoms</h1>
          <Grid item xs={12}>
            <TextField
              label="Symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <h1>Declaration of Consent</h1>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />
              }
              label="I, the undersigned, hereby consent to medical examination and treatment. I understand that providing accurate and complete information is essential for proper medical care."
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Patient;