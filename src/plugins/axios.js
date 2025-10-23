import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWQ4ODA5ZTEzNmUxYWYyMDJiYTkwYmIwN2JhMzg0NSIsIm5iZiI6MTc2MDM2NDA4OS45NjUsInN1YiI6IjY4ZWQwNjM5MjU5ZjA1ODdkMjc4NTA0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LJRgvnC_wnfmiINN3rM_qMHiUqyCbJCnj41pXt1bKm0`,
  },
});

export default api;