import './App.css';
import Note from "./components/TodoApp";
import {useState} from "react";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [input, setInput] = useState("");

    const addNote = () => {
        if (!input.trim()) return; // Не добавляем, если введен только пробел или ничего не введено

        const newNote = {
            id: Date.now(),
            text: input,
            date: new Date().toLocaleString(),
            completed: false,
        };

        setNotes(prevNotes => [...prevNotes, newNote]);
        setInput(''); // Очищаем поле ввода
    };

    const onDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const onComplete = (id) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, completed: true } : note
        ));
    };

    const onEdit = (id, newText) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, text: newText } : note // Обновляем текст заметки
        ));
    };

    return (
        <div className="app">
            <h1>Мои заметки</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={addNote}>+ Добавить</button>
            </div>

            <div className="notes-list">
                {notes.map(note => (
                    <Note
                        key={note.id}
                        note={note}
                        onDelete={onDelete}
                        onComplete={onComplete}
                        onEdit={onEdit} // Передаем onEdit в Note
                    />
                ))}
            </div>
        </div>
    );
};

export default App;