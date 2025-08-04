import { createSlice } from '@reduxjs/toolkit';
import {
  addNewWord,
  deleteWord,
  editWord,
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
    filters: {},
    recommended: [],
    favorites: [],
    library: [],
    ownWordId: '',
    wordsOwn: {},
    editWord: {},
    statistic: {},
    wordsCategories: [],
    selectedWordCategory: '',
    isModalOpen: false,
    isAddWordModalOpen: false,
    isEditModalOpen: false,
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
      })

      .addCase(deleteWord.fulfilled, (state, action) => {
        state.wordsOwn.results = state.wordsOwn.results.filter(
          word => word._id !== action.payload
        );
      })

      .addCase(editWord.fulfilled, (state, action) => {
        state.editWord = action.payload;
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

    setIsEditModalOpen(state, action) {
      state.isEditModalOpen = action.payload;
    },
    setSelectedWordCategory(state, action) {
      state.selectedWordCategory = action.payload;
    },
    setOwnWordId(state, action) {
      state.ownWordId = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setFiltersReset(state) {
      state.filters = {};
    },
  },
});

export const {
  setIsModalOpen,
  setIsOpenSelect,
  setSelectedWordCategory,
  setIsAddWordModalOpen,
  setOwnWordId,
  setIsEditModalOpen,
  setFilters,
  setFiltersReset,
} = dictionarySlice.actions;

export const dictionaryReducer = dictionarySlice.reducer;
