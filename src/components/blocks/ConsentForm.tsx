import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Consent, Entry, consentLabels } from "../../store";

const EMAIL_PATTERN =
  /(?![_.-])((?![_.-][_.-])[\w.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}/; // Source: https://stackoverflow.com/a/65442112

type FormData = Omit<Entry, "id">;

type SubmitEvent = React.SyntheticEvent<HTMLFormElement>;

interface Props {
  submitForm: (data: FormData) => Promise<void>;
}

function ConsentForm({ submitForm }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = React.useCallback(
    (event: SubmitEvent) => void handleSubmit(submitForm)(event),
    [handleSubmit, submitForm]
  );

  const checkboxProps = {
    ...register("consents", { required: true }),
    inputProps: {
      "data-testid": "services-check",
    } as React.InputHTMLAttributes<HTMLInputElement>,
  };

  return (
    <Box component="form" name="consent" onSubmit={onSubmit}>
      <Grid container spacing={2} mb={3}>
        <Grid xs={12} sm={6}>
          <TextField
            label="Name"
            autoComplete="name"
            fullWidth
            {...register("name", { required: true })}
            error={Boolean(errors.name)}
            inputProps={{ "data-testid": "name-input" }}
          />
        </Grid>

        <Grid xs={12} sm={6}>
          <TextField
            label="Email Address"
            autoComplete="email"
            type="email"
            fullWidth
            {...register("email", {
              required: true,
              pattern: EMAIL_PATTERN,
            })}
            error={Boolean(errors.email)}
            inputProps={{ "data-testid": "email-input" }}
          />
        </Grid>

        <Grid xs={12} mt={2}>
          <Typography component="p" variant="subtitle1" mb={1}>
            Kindly choose the appropriate services if you agree:
          </Typography>
          <FormGroup>
            <FormControlLabel
              label={consentLabels[Consent.Newsletter]}
              control={
                <Checkbox value={Consent.Newsletter} {...checkboxProps} />
              }
            />
            <FormControlLabel
              label={consentLabels[Consent.Advertising]}
              control={
                <Checkbox value={Consent.Advertising} {...checkboxProps} />
              }
            />
            <FormControlLabel
              label={consentLabels[Consent.Statistics]}
              control={
                <Checkbox value={Consent.Statistics} {...checkboxProps} />
              }
            />
          </FormGroup>

          {errors.consents ? (
            <FormHelperText error>
              Please consent to at least one service
            </FormHelperText>
          ) : null}
        </Grid>
      </Grid>

      <Button
        type="submit"
        size="large"
        variant="contained"
        disabled={!isValid || isSubmitting}
      >
        Give consent
      </Button>
    </Box>
  );
}

export default ConsentForm;
export type { FormData };
