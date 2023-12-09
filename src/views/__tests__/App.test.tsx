import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("should render consent form as default page", () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(
      screen.getByRole("heading", { name: /consent form/i })
    ).toBeInTheDocument();
  });

  it("should navigate to collected consents", () => {
    render(<App />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByRole("link", { name: /collected consents/i }));
    expect(
      screen.getByRole("heading", { name: /consents/i })
    ).toBeInTheDocument();
  });
});
