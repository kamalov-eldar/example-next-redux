import { CounterSliceState } from "../../counterSlice";

export const selectStatusCount = (state: CounterSliceState) => state.status;
