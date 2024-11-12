// src/features/events/eventsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface EventsState {
  events: Event[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Начальное состояние
const initialState: EventsState = {
  events: [],
  status: "idle",
  error: null,
};

// Асинхронный thunk для получения событий с API
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get<Event[]>(
    "http://85.208.87.196:8080/web/api/v1/bets"
  );
  return response.data;
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default eventsSlice.reducer;

export const selectAllEvents = (state: RootState) => state.events.events;
export const selectEventsStatus = (state: RootState) => state.events.status;
export const selectEventsError = (state: RootState) => state.events.error;
