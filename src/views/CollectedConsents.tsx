import * as React from "react";
import { enqueueSnackbar } from "notistack";
import { Container, Pagination, Typography } from "@mui/material";
import useConsentStore from "../store";
import ConsentsTable from "../components/blocks/ConsentsTable";

const ROWS_PER_PAGE = 2;

function CollectedConsents() {
  const [page, setPage] = React.useState(0);
  const [entries, isReady, fetchEntries] = useConsentStore((store) => [
    store.entries,
    store.isReady,
    store.fetchEntries,
  ]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        await fetchEntries();
      } catch (error) {
        enqueueSnackbar("Error fetching data.", { variant: "error" });
      }
    }
    if (!isReady) {
      void fetchData();
    }
  }, [fetchEntries, isReady]);

  const changePage = React.useCallback((_: unknown, newPage: number) => {
    setPage(newPage - 1);
  }, []);

  const pageEntries = React.useMemo(() => {
    return entries.slice(
      page * ROWS_PER_PAGE,
      page * ROWS_PER_PAGE + ROWS_PER_PAGE
    );
  }, [entries, page]);

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h4" mb={2}>
        Consents
      </Typography>
      <ConsentsTable entries={pageEntries} />
      {entries.length > ROWS_PER_PAGE ? (
        <Pagination
          page={page + 1}
          count={Math.ceil(entries.length / ROWS_PER_PAGE)}
          onChange={changePage}
          sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
          data-testid="pagination"
        />
      ) : null}
    </Container>
  );
}

export default CollectedConsents;
