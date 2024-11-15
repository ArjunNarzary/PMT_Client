import { ILoginReponse } from "@/interface"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IAuthInitialState {
  name: string
  email: string
  token: string
}

const initialState: IAuthInitialState = {
  name: "",
  email: "",
  token: "",
}

export const authSlice = createSlice({
  name: "AUTHUSER",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<ILoginReponse>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.token = action.payload.token

      const userDetail: { name: string; token: string; email: string } = {
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      }
      const userJSON = JSON.stringify(userDetail)
      localStorage.setItem("user", userJSON)
    },
    removeUser: () => {
      localStorage.removeItem("user")
      return initialState
    },
  },
})

export const { addUser, removeUser } = authSlice.actions

export default authSlice.reducer

export const selectUser = createSelector(
  (state: ILoginReponse) => state.token,
  (value) => value
)
