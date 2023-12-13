import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:5000/api', // should be set based on env
});

export const getRanking = () => http.get('/');
export const getInternationalRanking = () => http.get('/international');
export const getCompare = (first: string, second: string) => http.get(`/compare?first=${first}&second=${second}`);
export const getInternationalCompare = (first: string, second: string) => http.get(`/international/compare?first=${first}&second=${second}`);
export const getCompare2 = (first: string, second: string) => http.get(`/compare/${first}/${second}`);
export const getInternationalCompare2 = (first: string, second: string) => http.get(`/international/compare/${first}/${second}`);
export const getInfo2 = (league: string) => http.get(`/info2/${league}`);
export const getInternationalInfo2 = (league: string) => http.get(`/international/info2/${league}`);
export const getAll = () => http.get('/all');
export const getInternationalAll = () => http.get('/international/all');
export const getTeam = (teamId: string) => http.get(`/team/${teamId}`);
export const getWorldcupgroups = () => http.get('/worldcupgroups');
export const getModels = () => http.get('/models.json&pw=14567695');
export const getInternationalModels = () => http.get('/models_international.json&pw=14567695');
