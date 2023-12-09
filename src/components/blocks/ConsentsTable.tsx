import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Consent, Entry, consentLabels } from "../../store";
import Empty from "../atoms/Empty";

interface Props {
  entries: Entry[];
}

function ConsentsTable({ entries }: Props) {
  if (entries.length === 0) {
    return <Empty />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="List of user consents">
        <TableHead>
          <TableRow>
            <TableCell width="20%">Name</TableCell>
            <TableCell width="30%">Email</TableCell>
            <TableCell width="50%">Consent given for</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {entries.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                {row.consents.map(getConsentLabel).join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ConsentsTable;

function getConsentLabel(consent: Consent) {
  return consentLabels[consent];
}
