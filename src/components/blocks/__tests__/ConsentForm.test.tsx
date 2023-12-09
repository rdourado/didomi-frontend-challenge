import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ConsentForm from "../ConsentForm";

function setup() {
  const mockOnSubmit = jest.fn();
  render(<ConsentForm submitForm={mockOnSubmit} />);

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
    mockOnSubmit,
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

describe("Name Text Field", () => {
  it("renders a text input field", () => {
    const { nameInput } = setup();
    expect(nameInput).toBeInTheDocument();
  });

  it("allows user input", () => {
    const { nameInput, changeNameValue } = setup();
    changeNameValue("John Doe");
    expect(nameInput).toHaveValue("John Doe");
  });
});

describe("Email Text Field", () => {
  it("renders an email input field", () => {
    const { emailInput } = setup();
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("allows user input", () => {
    const { emailInput, changeEmailValue } = setup();
    changeEmailValue("john.doe@example.com");
    expect(emailInput).toHaveValue("john.doe@example.com");
  });
});

describe("Services Checkbox Group", () => {
  it("renders multiple checkboxes field", () => {
    const { allServiceInputs } = setup();
    allServiceInputs.forEach((inputNode) => {
      expect(inputNode).toBeInTheDocument();
      expect(inputNode).toHaveAttribute("type", "checkbox");
    });
  });

  it("allows inputs to be checked", () => {
    const { allServiceInputs, toggleServiceInput } = setup();
    allServiceInputs.forEach((inputNode, index) => {
      toggleServiceInput(index);
      expect(inputNode).toBeChecked();
    });
  });
});

describe("Consent Form", () => {
  it("renders submit button", () => {
    const { submitButton } = setup();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("disables submit button while empty", () => {
    const { submitButton } = setup();
    expect(submitButton).toBeDisabled();
  });

  it("should submit a valid form", async () => {
    const {
      mockOnSubmit,
      submitButton,
      changeNameValue,
      changeEmailValue,
      toggleServiceInput,
      clickSubmitButton,
    } = setup();

    changeNameValue("John Doe");
    changeEmailValue("john.doe@example.com");
    toggleServiceInput(0);
    await waitFor(() => expect(submitButton).toBeEnabled());
    clickSubmitButton();
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it("should not submit an invalid form", async () => {
    const {
      mockOnSubmit,
      submitButton,
      changeNameValue,
      changeEmailValue,
      toggleServiceInput,
      clickSubmitButton,
    } = setup();

    changeNameValue("John Doe");
    changeEmailValue("invalid.email@");
    toggleServiceInput(0);
    await waitFor(() => expect(submitButton).toBeDisabled());
    clickSubmitButton();
    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
  });
});
