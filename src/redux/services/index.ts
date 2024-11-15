import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
  }),
  tagTypes: ["Projects", "Tasks", "Users"],
  keepUnusedDataFor: 10,
  endpoints: (builder) => ({
    //LOGIN USER
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: "/user/login",
          method: "POST",
          body,
        }
      },
    }),

    //REGISTER USER
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: "/user/register",
          method: "POST",
          body,
        }
      },
      invalidatesTags: ["Users"],
    }),

    //GET ALL USERS
    getAllUsers: builder.query({
      query: (body) => {
        return {
          url: "/user",
          method: "GET",
          headers: {
            authorization: `bearer ${body.token}`,
          },
        }
      },
      providesTags: ["Users"],
    }),

    //GET ALL PRODUCTS
    getAllProjects: builder.query({
      query: (body) => {
        return {
          url: "/project",
          method: "GET",
          headers: {
            authorization: `bearer ${body.token}`,
          },
        }
      },
      providesTags: ["Projects"],
    }),

    //ADD PRODUCTS
    addProject: builder.mutation({
      query: (body) => {
        return {
          url: "/project",
          method: "POST",
          headers: {
            authorization: `bearer ${body.token}`,
          },
          body: {
            title: body.title,
            description: body.description,
          },
        }
      },
      invalidatesTags: ["Projects"],
    }),

    //GET ALL Tasks
    getAllTask: builder.query({
      query: (body) => {
        return {
          url: `/task/${body.projectId}`,
          method: "GET",
          headers: {
            authorization: `bearer ${body.token}`,
          },
        }
      },
      providesTags: ["Tasks"],
    }),

    //ADD Tasks
    addTask: builder.mutation({
      query: (body) => {
        return {
          url: `/task/${body.projectId}`,
          method: "POST",
          body,
          headers: {
            authorization: `bearer ${body.token}`,
          },
        }
      },
      invalidatesTags: ["Tasks"],
    }),

    //UPDATE Tasks
    updateTask: builder.mutation({
      query: (body) => {
        return {
          url: `/task/${body._id}`,
          method: "put",
          body,
          headers: {
            authorization: `bearer ${body.token}`,
          },
        }
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetAllProjectsQuery,
  useAddProjectMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useGetAllUsersQuery,
} = serviceApi
