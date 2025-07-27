import { createSlice } from '@reduxjs/toolkit';
import {
  addNewWord,
  getStatistic,
  getWordsCategories,
  getWordsOwn,
} from './operations';

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: {
    recomended: [],
    favorites: [],
    library: [],
    wordsOwn: [],
    statistic: {},
    wordsCategories: [],
    selectedWordCategory: '',
    isModalOpen: false,
    isAddWordModalOpen: false,
    isOpenSelect: false,
  },

  extraReducers: builder => {
    builder
      .addCase(getWordsCategories.fulfilled, (state, action) => {
        state.wordsCategories = action.payload;
      })

      .addCase(getStatistic.fulfilled, (state, action) => {
        state.statistic = action.payload;
      })

      .addCase(addNewWord.fulfilled, (state, action) => {
        state.words = action.payload;
      })

      .addCase(getWordsOwn.fulfilled, (state, action) => {
        state.wordsOwn = action.payload;
      });
  },

  reducers: {
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setIsAddWordModalOpen(state, action) {
      state.isAddWordModalOpen = action.payload;
    },

    setIsOpenSelect(state, action) {
      state.isOpenSelect = action.payload;
    },
    setSelectedWordCategory(state, action) {
      state.selectedWordCategory = action.payload;
    },
  },
});

export const {
  setIsModalOpen,
  setIsOpenSelect,
  setSelectedWordCategory,
  setIsAddWordModalOpen,
} = dictionarySlice.actions;

export const dictionaryReducer = dictionarySlice.reducer;
