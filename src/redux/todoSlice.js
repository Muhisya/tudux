import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    listTugas: []
  },
  reducers: {
    tambahTugas: (state, action) => {
      state.listTugas.push({
        id: Date.now(),
        text: action.payload,
        isFinished: false
      });
    },
    toggleSelesai: (state, action) => {
      const tugas = state.listTugas.find(t => t.id === action.payload);
      if (tugas) {
        tugas.isFinished = !tugas.isFinished;
      }
    },
    hapusSemua: (state) => {
      state.listTugas = [];
    }
  }
});

export const { tambahTugas, toggleSelesai, hapusSemua } = todoSlice.actions;
export default todoSlice.reducer;