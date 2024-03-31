import { CounterSliceState } from "../../counterSlice";

export const selectCount = (state: CounterSliceState) => state.value;
