import React, { useState } from 'react';
import { Container, Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import StepForm from './components/StepForm';

const App = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    experience: '',
    futureGoals: '',
    dreamJob: '',
    targetCompany: '',
    skillsToImprove: '',
    idealWorkEnvironment: ''
  });

  const steps = [
    'How much experience do you have?',
    'Where do you see yourself in 5 years?',
    'What do you want to be when you grow up?',
    'Do you have a target company in mind?',
    'What skills would you like to improve?',
    'What is your ideal work environment?'
  ];

  const reassuringMessages = [
    'Great, every experience counts!',
    'That’s a solid plan, keep pushing towards it!',
    'Awesome, it’s important to have dreams!',
    'Aiming high is the key to success!',
    'Continuous improvement is the way to go!',
    'Finding the right environment is crucial for growth!'
  ];

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('Form submitted successfully! Thank you for sharing.');
  };

  return (
    <Container maxWidth="mb">
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Intellio
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Let's explore your path and goals!
        </Typography>
      </Box>

      <Box sx={{ mt: 4, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <StepForm 
        activeStep={activeStep} 
        formData={formData} 
        handleChange={handleChange} 
        handleNext={handleNext} 
        handleBack={handleBack} 
        handleSubmit={handleSubmit}
        steps={steps}
        reassuringMessages={reassuringMessages}
      />
    </Container>
  );
};

export default App;
