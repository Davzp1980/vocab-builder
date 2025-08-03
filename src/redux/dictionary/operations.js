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
    try {
      const res = await axios.post('/words/create', word);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWordsOwn = createAsyncThunk(
  'dictionary/wordsOwn',
  async (params, thunkAPI) => {
    console.log(params);

    try {
      const res = await axios.get('/words/own', {
        params: params,
      });

      console.log(res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editWord = createAsyncThunk(
  'dictionary/editWord',
  async (word, thunkAPI) => {
    try {
      const res = await axios.patch(`/words/edit/${word._id}`, {
        en: word.en,
        ua: word.ua,
        category: word.category,
        isIrregular: word.isIrregular,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  'dictionary/deleteWord',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/words/delete/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
