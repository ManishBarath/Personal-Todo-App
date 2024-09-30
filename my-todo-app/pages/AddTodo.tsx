'use client';

import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import styles from "../src/styles/AddTodo.module.css";
import { CREATE_TODO, GET_TODOS } from '@/src/graphql/queries';

export default function AddTodo() {
  const { refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);

  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDue, setNewDue] = useState('');
  const [newStatus, setNewStatus] = useState(false);



  const handleAddTodo = async () => {
    await createTodo({
      variables: {
        input: {
          Title: newTodo,
          Description: newDescription,
          Status: newStatus,
          Due: newDue,
        },
      },
      onCompleted: () => {
        setNewTodo('');
        setNewDescription('');
        setNewStatus(false);
        setNewDue('');
        refetch();
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <input
          className={styles.input}
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          className={styles.input}
          type="date"
          value={newDue}
          onChange={(e) => setNewDue(e.target.value)}
          placeholder="Due"
        />
        <label>
          Status
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={newStatus}
            onChange={(e) => setNewStatus(e.target.checked)}
          />
        </label>
        <button className={styles.button} onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
    </div>
  );
}
