import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface OutputState {
  outputObject : string
}

const initialState: OutputState = {
  outputObject:  `[ { "Question": "What does SaaS stand for in cloud computing?", "responses": ["Software as a Service", "Security as a Service", "Server as a Service", "Storage as a Service"], "correct": "Software as a Service" }, { "Question": "What is the main benefit of using cloud computing services?", "responses": ["Decreased security", "Limited scalability", "Increased cost", "Flexibility and scalability"], "correct": "Flexibility and scalability" }, { "Question": "What is a public cloud in cloud computing?", "responses": ["A cloud infrastructure used by a single organization", "A cloud infrastructure shared by multiple organizations", "A cloud infrastructure dedicated to a specific industry", "A cloud infrastructure without internet connectivity"], "correct": "A cloud infrastructure shared by multiple organizations" } ]`,
}

export const OutputSlice = createSlice({
  name: 'outputState',
  initialState,
  reducers: {
    addOutput:(state, action:PayloadAction<string>) =>{
      state.outputObject = action.payload
    },
  
  },
})

export const {addOutput} = OutputSlice.actions;
export default OutputSlice.reducer;