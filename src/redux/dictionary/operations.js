import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWordsCategories = createAsyncThunk(
  'dictionary/register',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/words/categories');

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getStatistic = createAsyncThunk(
  'dictionary/statistic',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/words/statistics');

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNewWord = createAsyncThunk(
  'dictionary/addNewWord',
  async (word, thunkAPI) => {
    console.log(word);

    try {
      const res = await axios.post('/words/create', word);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWordsOwn = createAsyncThunk(
  'dictionary/wordsOwn',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/words/own');

      console.log(res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
