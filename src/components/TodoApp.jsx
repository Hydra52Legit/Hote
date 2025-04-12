import React from "react";
import "./TodoApp.css";
import {useState} from "react";

const Note = ({ note, onDelete, onComplete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(note.text); // Состояние для редактируемого текста

    const handleSave = () => {
        if (newText.trim() === "") return; // Не сохранять пустой текст
        onEdit(note.id, newText); // Передаем новый текст в onEdit
        setIsEditing(false); // Выключаем режим редактирования
    };

    return (
        <div className="note-container">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)} // Обновляем состояние при изменении текста
                    />
                    <button className="save-btn" onClick={handleSave}>💾 Сохранить</button>
                </>
            ) : (
                <>
                    <p className="note-text">{note.text}</p>
                    <p className="note-date">{note.date}</p>

                    {note.completed && <p className="completed-label">✅ Задача выполнена</p>}

                    <button className="delete-btn" onClick={() => onDelete(note.id)}>Удалить</button>

                    {!note.completed && (
                        <>
                            <button className="refactor-btn" onClick={() => setIsEditing(true)}>✏️ Редактировать</button>
                            <button className="completed-btn" onClick={() => onComplete(note.id)}>Выполнено</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};



export default Note;