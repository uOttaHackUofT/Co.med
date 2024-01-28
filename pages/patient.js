import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';

const patient = () => {
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
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can send the form data to your backend or perform other actions here.
  };

  return (
    <div>
      <h2>Patient Information</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
              required
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
              required
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
              required
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
              required
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

export default patient;