import { useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import SixthStep from "./SixthStep";
import Success from "./Success";
import { AppContext } from "../Context";
import StepButton from "@mui/material/StepButton";
import SeventhStep from "./SeventhStep";

const handleSteps = (step: number) => {
  switch (step) {
    case 0:
      return <FirstStep />;
    case 1:
      return <SecondStep />;
    case 2:
      return <ThirdStep />;
    case 3:
      return <FourthStep />;
    case 4:
      return <FifthStep />;
    case 5:
      return <SixthStep />;
    case 6:
      return <SeventhStep />;
    default:
      throw new Error("Unknown step");
  }
};

export default function StepForm() {
  const { activeStep, setActiveStep, steps, formValues } =
    useContext(AppContext);

  const { bookingModule } = formValues;

  return (
    <>
      {activeStep === steps.length ? (
        <Success />
      ) : (
        <>
          <Box sx={{ my: 5 }}>
            <Typography variant="h4" align="center">
              Overall Mapping
            </Typography>
            <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
              ..
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
            {steps.map((label, index) => {
              if (bookingModule.value === "Auto") {
                return (
                  <Step key={label}>
                    <StepButton
                      color="inherit"
                      onClick={() => setActiveStep(index)}
                    >
                      <StepLabel>{label}</StepLabel>
                    </StepButton>
                  </Step>
                );
              } else {
                return (
                  index < 6 && (
                    <Step key={label}>
                      <StepButton
                        color="inherit"
                        onClick={() => setActiveStep(index)}
                      >
                        <StepLabel>{label}</StepLabel>
                      </StepButton>
                    </Step>
                  )
                );
              }
            })}
          </Stepper>

          {handleSteps(activeStep)}
        </>
      )}
    </>
  );
}
