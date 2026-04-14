import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tambahTugas, toggleSelesai, hapusSemua } from '../redux/todoSlice';

const TodoApp = () => {
  const listTugas = useSelector((state) => state.todo.listTugas);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Tudux List</h1>
      <p className=''>Your web for making you to do list</p>
      
      <button onClick={() => dispatch(tambahTugas("Belajar React"))}>
        Tambah Tugas
      </button>
      <button onClick={() => dispatch(hapusSemua())}>
        Bersihkan Semua
      </button>

      <div style={{ marginTop: '20px' }}>
        {listTugas.map((tugas, index) => (
          <div key={tugas.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>{index + 1}.</span>
            <span style={{ 
              textDecoration: tugas.isFinished ? 'line-through' : 'none',
              flex: 1 
            }}>
              {tugas.text}
            </span>
            <button onClick={() => dispatch(toggleSelesai(tugas.id))}>
              {tugas.isFinished ? 'Undo' : 'Finish'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;