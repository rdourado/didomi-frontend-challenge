import { render, screen } from "@testing-library/react";
import ConsentsTable from "../ConsentsTable";
import { createEntry } from "../__fixtures__/Entry.fixture";

describe("Consents Table", () => {
  it("renders a message if the entries list is empty", () => {
    render(<ConsentsTable entries={[]} />);
    expect(screen.getByText(/is empty/i)).toBeInTheDocument();
  });

  it("renders a table with entries list", () => {
    const names = ["Huey", "Dewey", "Louie"];
    const entries = names.map((name) => createEntry({ name }));
    render(<ConsentsTable entries={entries} />);
    names.forEach((name) =>
      expect(screen.getByRole("cell", { name })).toBeInTheDocument()
    );
  });
});
