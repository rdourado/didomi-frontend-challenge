import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

enum Consent {
  Newsletter = "news",
  Advertising = "ads",
  Statistics = "stats",
}

const consentLabels: Record<Consent, string> = {
  [Consent.Newsletter]: "Receive newsletter",
  [Consent.Advertising]: "Be shown targeted ads",
  [Consent.Statistics]: "Contribute to anonymous visit statistics",
};

interface Entry {
  id: number;
  name: string;
  email: string;
  consents: Consent[];
}

interface State {
  entries: Entry[];
  isReady: boolean;
}

interface Actions {
  addEntry: (newEntry: Omit<Entry, "id">) => Promise<Entry>;
  fetchEntries: () => Promise<Entry[]>;
}

const { REACT_APP_API_URL } = process.env;

const useConsentStore = create<State & Actions>()(
  devtools(
    immer((set, get) => ({
      entries: [],
      isReady: false,

      addEntry: async (newEntry) => {
        const response = await fetch(`${REACT_APP_API_URL}/consents`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });
        const entry = (await response.json()) as Entry;

        set((state) => {
          state.entries.unshift(entry);
        });

        const { fetchEntries } = get();
        fetchEntries();

        return entry;
      },

      fetchEntries: async () => {
        const response = await fetch(`${REACT_APP_API_URL}/consents`);
        const entries = (await response.json()) as Entry[];
        entries.sort((a, b) => b.id - a.id);

        set((state) => {
          state.entries = entries;
          state.isReady = true;
        });

        return entries;
      },
    }))
  )
);

export default useConsentStore;
export { consentLabels, Consent };
export type { Entry };
