import { IUsers, IPosts } from "../interface/common";

const apiUrl = 'https://jsonplaceholder.typicode.com/';

const api = {
  fetchUser: async (): Promise<IUsers[]> => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      const data: IUsers[] = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching users', error);
      throw error;
    }
  },

  fetchPosts: async (userId: string): Promise<IPosts[]> => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/posts`)
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      const data: IPosts[] = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching posts', error);
      throw error;
    }
  },

  updatePost: async (postId: number, newData: Partial<IPosts>): Promise<IPosts> => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newData)
      });
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      const updateData: IPosts = await response.json();
      return updateData;
    } catch (error) {
      console.log('Error fetching post', error);
      throw error;
    }
  },

  deletePost: async (postId: number): Promise<void> => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
    } catch (error) {
      console.log('Error fetching post', error);
      throw error;
    }
  }
};

export default api;
