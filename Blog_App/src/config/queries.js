import { gql } from "@apollo/client";

export const GET_POST = gql`
  query {
    post(id: 1) {
      id
      title
      body
    }
  }
`;

export const GET_USER = gql`
  query {
    user(id: 1) {
      id
      username
      email
      address {
        geo {
          lat
          lng
        }
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query {
    user(id: 1) {
      posts {
        data {
          id
          title
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

//VARIABLE FOR POSTS PAGINATION OPTION
// {
//   "options": {
//     "paginate": {
//       "page": 1,
//       "limit": 5
//     }
//   }
// }

export const ADD_POST = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

//VARIABLE FOR CREATE POST
// {
//   "input": {
//     "title": "A Very Captivating Post Title",
//     "body": "Some interesting content."
//   }
// }

export const UPDATE_POST = gql`
  mutation($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;

//VARIABLE FOR UPDATE POST
// {
//   "id": 1,
//   "input": {
//     "body": "Some updated content."
//   }
// }

export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id)
  }
`;

//VARIABLE FOR DELETE POST
// {
//   "id": 101
// }
