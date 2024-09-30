"use client";
import { useMutation, useQuery } from "@apollo/client";
import styles from "../src/styles/TodoList.module.css";
import { useState } from "react";
import { DELETE_TODO ,GET_TODOS, SINGLE_TODO, UPDATE_TODO } from "@/src/graphql/queries";

export default function TodoList() {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [singleTodo] = useMutation(SINGLE_TODO);

  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [editingStatus, setEditingStatus] = useState(false);
  const [editingDue, setEditingDue] = useState('');



  const handleSingleTodo = async (id: any) => {
    await singleTodo({
      variables: { id },
      onCompleted: refetch,
    });
  };

  const handleDeleteTodo = async (id: any) => {
    await deleteTodo({
      variables: { id },
      onCompleted: refetch,
    });
  };

  const handleUpdateTodo = async (id: number) => {
    await updateTodo({
      variables: {
        input: {
          id,
          Title: editingTitle,
          Description: editingDescription,
          Status: editingStatus,
          Due: editingDue,
        },
      },
      onCompleted: () => {
        setEditingTodo(null);
        setEditingTitle('');
        setEditingDescription('');
        setEditingStatus(false);
        setEditingDue('');
        refetch();
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    
    <div className={styles.container}>
      <h1 className={styles.header}>Todo List</h1>
      <ul className={styles.list}>
        {data.todos.map((todo: { id: number; Title: string; Description: string; Status: boolean; Due: string }) => (
          <li
            key={todo.id}
            className={styles.listItem}
            style={{ textDecoration: todo.Status ? 'line-through' : 'none' }}
          >
            {editingTodo === todo.id ? (
              <div className={styles.editing}>
                <input
                  className={styles.editingInput}
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  className={styles.editingInput}
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  placeholder="Description"
                />
                <label>
                  Status
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.checked)}
                  />
                </label>
                <input
                  className={styles.editingInput}
                  type="date"
                  value={editingDue}
                  onChange={(e) => setEditingDue(e.target.value)}
                />
                <button className={styles.button} onClick={() => handleUpdateTodo(todo.id)}>Save</button>
                <button className={styles.button} onClick={() => setEditingTodo(null)}>Cancel</button>
              </div>
            ) : (
              <div className={styles.buttons}>
                <span>
                  {todo.Title} - {todo.Description} - {todo.Status ? 'Completed' : 'Pending'} - {todo.Due}
                </span>
                <button
                  className={styles.button}
                  onClick={() => {
                    setEditingTodo(todo.id);
                    setEditingTitle(todo.Title);
                    setEditingDescription(todo.Description);
                    setEditingStatus(todo.Status);
                    setEditingDue(todo.Due);
                  }}
                >
                  Edit
                </button>
                <button className={styles.button} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                <button className={styles.button} onClick={() => handleSingleTodo(todo.id)}>Send Email</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
