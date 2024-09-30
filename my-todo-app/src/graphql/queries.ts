import { gql } from 'graphql-tag';

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      Title
      Description
      Status
      Due
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: NewTodoInput!) {
    addtask(input: $input) {
      Title,
      Description,
      Due,
      Status,
    }
  }
`;

export const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: Int!) {
    completeTodo(id: $id){
    id
    }
  }
`;
export const SINGLE_TODO = gql`
  mutation SingeTodo($id: Float!) {
    onetodo(id: $id){
    Title,
    Description,
    Due,
    Status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updatetask(input: $input) {
      id
      Title
      Description
      Status
      Due
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: Float!) {
    removetask(id: $id) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

