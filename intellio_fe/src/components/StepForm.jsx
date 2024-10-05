import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const StepForm = ({ activeStep, formData, handleChange, handleNext, handleBack, handleSubmit, steps, reassuringMessages }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {activeStep === 0 && (
        <TextField
          label="How much experience do you have?"
          variant="outlined"
          fullWidth
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      )}
      {activeStep === 1 && (
        <TextField
          label="Where do you see yourself in 5 years?"
          variant="outlined"
          fullWidth
          name="futureGoals"
          value={formData.futureGoals}
          onChange={handleChange}
        />
      )}
      {activeStep === 2 && (
        <TextField
          label="What do you want to be when you grow up?"
          variant="outlined"
          fullWidth
          name="dreamJob"
          value={formData.dreamJob}
          onChange={handleChange}
        />
      )}
      {activeStep === 3 && (
        <TextField
          label="Do you have a target company in mind?"
          variant="outlined"
          fullWidth
          name="targetCompany"
          value={formData.targetCompany}
          onChange={handleChange}
        />
      )}
      {activeStep === 4 && (
        <TextField
          label="What skills would you like to improve?"
          variant="outlined"
          fullWidth
          name="skillsToImprove"
          value={formData.skillsToImprove}
          onChange={handleChange}
        />
      )}
      {activeStep === 5 && (
        <TextField
          label="What is your ideal work environment?"
          variant="outlined"
          fullWidth
          name="idealWorkEnvironment"
          value={formData.idealWorkEnvironment}
          onChange={handleChange}
        />
      )}
      <Box sx={{ mt: 4 }}>
        {activeStep < steps.length - 1 && (
          <>
            <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>
              {reassuringMessages[activeStep]}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleNext} sx={{ mr: 2 }}>
              Next
            </Button>
          </>
        )}
        {activeStep === steps.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        {activeStep > 0 && (
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StepForm;
