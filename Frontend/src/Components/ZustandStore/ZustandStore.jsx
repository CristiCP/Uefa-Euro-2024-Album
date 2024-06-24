import create from 'zustand';

const useUserStore = create((set) => ({
  username: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : null,
  setUsername: (newUsername) => set({ username: newUsername }),
  logout: () => set({ username: null }),
}));

export default useUserStore;