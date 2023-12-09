import { SnackbarProvider } from "notistack";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import CollectedConsents from "../CollectedConsents";
import { createEntry } from "../../components/blocks/__fixtures__/Entry.fixture";

enableFetchMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Collected Consents", () => {
  it("should render message if can't fetch data", async () => {
    fetchMock.mockReject(new Error("Error"));
    render(
      <>
        <CollectedConsents />
        <SnackbarProvider />
      </>
    );
    await waitFor(() => {
      expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
    });
  });

  it("should render pagination if more than 2 entries", async () => {
    fetchMock.mockResponse(
      JSON.stringify([createEntry(), createEntry(), createEntry()])
    );
    render(<CollectedConsents />);
    await waitFor(() => {
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });
  });

  it("should render 2 entries per page", async () => {
    const names = ["Huey", "Dewey", "Louie"];
    fetchMock.mockResponse(
      JSON.stringify(names.map((name) => createEntry({ name })))
    );
    render(<CollectedConsents />);
    await waitFor(() => {
      expect(screen.getByRole("cell", { name: names[2] })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByRole("cell", { name: names[1] })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.queryByRole("cell", { name: names[0] })
      ).not.toBeInTheDocument();
    });
  });
});
