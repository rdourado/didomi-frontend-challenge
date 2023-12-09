import { BrowserRouter } from "react-router-dom";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { SnackbarProvider } from "notistack";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GiveConsent from "../GiveConsent";
import { createEntry } from "../../components/blocks/__fixtures__/Entry.fixture";

enableFetchMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

function setup() {
  render(
    <BrowserRouter>
      <SnackbarProvider />
      <GiveConsent />
    </BrowserRouter>
  );

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /e-?mail/i });
  const allServiceInputs = screen.getAllByRole("checkbox", {
    name: /newsletter|targeted ads|statistics/i,
  });
  const submitButton = screen.getByRole("button", { name: /give consent/i });
  const changeNameValue = (value: string) =>
    fireEvent.change(nameInput, { target: { value } });
  const changeEmailValue = (value: string) =>
    fireEvent.change(emailInput, { target: { value } });
  const toggleServiceInput = (index: number) =>
    fireEvent.click(allServiceInputs[index]);
  const clickSubmitButton = () => fireEvent.click(submitButton);

  return {
    nameInput,
    emailInput,
    allServiceInputs,
    submitButton,
    changeNameValue,
    changeEmailValue,
    toggleServiceInput,
    clickSubmitButton,
  };
}

function setupValidForm() {
  const utils = setup();

  const entry = createEntry();
  utils.changeNameValue(entry.name);
  utils.changeEmailValue(entry.email);
  utils.toggleServiceInput(0);

  return { ...utils, entry };
}

describe("Collected Consents", () => {
  it("should display a message if fetch fails", async () => {
    const { submitButton, clickSubmitButton } = setupValidForm();

    fetchMock.mockReject(new Error("Error"));

    await waitFor(() => expect(submitButton).toBeEnabled());

    clickSubmitButton();

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should display a message after successful saving", async () => {
    const { entry, submitButton, clickSubmitButton } = setupValidForm();

    fetchMock
      .once(JSON.stringify(entry))
      .once(JSON.stringify([entry, createEntry()]));

    await waitFor(() => expect(submitButton).toBeEnabled());

    clickSubmitButton();

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });
});
