import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const VERSION = 1;
interface PreferencesState {
  /** The facility that the current user wants to see information for.
   * Saved in redux so that users don't have to select their facility every time
   */
  facilityId?: number;
  loggedIn: boolean;
  version: number;
}

const initialState = {
  facilityId: undefined,
  version: VERSION,
  loggedIn: false,
} as PreferencesState;

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setFacilityId: (state, action: PayloadAction<number | undefined>) => {
      state.facilityId = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});
export const preferencesActions = preferencesSlice.actions;

/**
 * Returns the passed in state if it is valid, or the default initial state.
 * This is what allows us to purge the localstorage after updates.
 */
export const validatePreferences = (state: any): PreferencesState => {
  if (state?.version === VERSION) return state as PreferencesState;
  return initialState;
};
