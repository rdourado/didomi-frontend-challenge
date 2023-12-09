import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import useConsentStore from "../store";
import ConsentForm, { type FormData } from "../components/blocks/ConsentForm";

function GiveConsent() {
  const navigate = useNavigate();
  const addEntry = useConsentStore((store) => store.addEntry);

  const submitForm = async (data: FormData) => {
    try {
      await addEntry(data);
      enqueueSnackbar("Consent given. Thank you!", { variant: "success" });
      navigate("/consents");
    } catch (error) {
      enqueueSnackbar("Error saving consent.", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h4" mb={2}>
        Consent Form
      </Typography>
      <Typography component="p" variant="subtitle1" mb={3}>
        We request your informed consent to retain the personal data you provide
        to us. All such information will be handled by us with the utmost
        confidentiality.
      </Typography>

      <ConsentForm submitForm={submitForm} />
    </Container>
  );
}

export default GiveConsent;
