let counter = 1;

enum Consent {
  Newsletter = "news",
  Advertising = "ads",
  Statistics = "stats",
}

const baseFixture = {
  id: counter,
  name: "John Doe",
  email: "john.doe@example.com",
  consents: [Consent.Newsletter, Consent.Advertising, Consent.Statistics],
};

function createEntry(entryData?: Partial<typeof baseFixture>) {
  return Object.freeze({
    ...baseFixture,
    id: ++counter,
    ...entryData,
  });
}

export { createEntry };
