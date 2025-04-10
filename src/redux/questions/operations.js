import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;

export const fetchSteps = createAsyncThunk("quiz/fetchSteps", async () => {
  const response = await axios.get(
    `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=step`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.items;
});

export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async () => {
    const response = await axios.get(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=question`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.items;
  }
);
