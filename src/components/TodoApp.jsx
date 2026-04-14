import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tambahTugas, toggleSelesai, hapusSemua } from '../redux/todoSlice';

const TodoApp = () => {
  const [input, setInput] = useState('');
  const listTugas = useSelector((state) => state.todo.listTugas);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(tambahTugas(input));
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 p-8">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
            Tudux<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-zinc-500 text-xs font-medium mt-2 tracking-widest uppercase opacity-70">
            Minimal Productivity Tool
          </p>
        </header>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add new task..."
            className="flex-1 bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all placeholder:text-zinc-600"
          />
          <button
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
          >
            ADD
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Tasks</h2>
          <button
            onClick={() => dispatch(hapusSemua())}
            className="text-[10px] font-black text-red-500/70 hover:text-red-400 uppercase tracking-[0.2em] transition-colors"
          >
            Reset All
          </button>
        </div>

        <div className="space-y-3 min-h-[200px]">
          {listTugas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-zinc-800 rounded-2xl">
              <span className="text-3xl mb-2 opacity-20">empty</span>
            </div>
          ) : (
            listTugas.map((tugas, index) => (
              <div
                key={tugas.id}
                className="flex items-center justify-between p-4 bg-zinc-800/40 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-indigo-500/50 font-black text-xs">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`transition-all duration-300 ${
                      tugas.isFinished 
                        ? 'line-through text-zinc-600 italic' 
                        : 'text-zinc-200 font-semibold'
                    }`}
                  >
                    {tugas.text}
                  </span>
                </div>
                
                <button
                  onClick={() => dispatch(toggleSelesai(tugas.id))}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-tighter transition-all ${
                    tugas.isFinished
                      ? 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                      : 'bg-white text-black hover:bg-indigo-400 hover:text-white'
                  }`}
                >
                  {tugas.isFinished ? 'UNDO' : 'DONE'}
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="mt-10 pt-6 border-t border-zinc-800 flex justify-between text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">
          <div className="flex gap-4">
            <span>Total / {listTugas.length}</span>
            <span className="text-indigo-500">Done / {listTugas.filter(t => t.isFinished).length}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TodoApp;