export const selectIsModalOpen = state => state.dictionary.isModalOpen;

export const selectIsOpenSelect = state => state.dictionary.isOpenSelect;

export const selectWordCategory = state =>
  state.dictionary.selectedWordCategory;

export const selectWordsCategories = state => state.dictionary.wordsCategories;

export const selectStatistic = state => state.dictionary.statistic;

export const selectIsAddWordModalOpen = state =>
  state.dictionary.isAddWordModalOpen;

export const selectWordsOwn = state => state.dictionary.wordsOwn;

export const selectOwnWordId = state => state.dictionary.ownWordId;

export const selectIsEditModalOpen = state => state.dictionary.isEditModalOpen;

export const selectEditWord = state => state.dictionary.editWord;

export const selectFilters = state => state.dictionary.filters;
