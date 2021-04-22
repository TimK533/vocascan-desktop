import axios from "axios";

import { defaultLimit, vocascanServer } from "./constants.js";

const api = axios.create({
  baseURL: vocascanServer,
});

export function setBaseUrl(url) {
  api.defaults.baseURL = `${url}/api`;
}

export function setTokenHeader(token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Auth
export const login = (data) => api.post("/user/login", data);
export const register = (data) => api.post("/user/register", data);

// User
export const getProfile = () => api.get("/user");
export const deleteUser = () => api.delete("/user");

// Language package
export const createPackage = (data) => api.post("/languagePackage", data);
export const getPackages = (groups = false) =>
  api.get(`/languagePackage?groups=${groups}`);
export const modifyPackage = (data) =>
  api.put(`/languagePackage/${data.id}`, data);
export const deletePackage = (languagePackageId) =>
  api.delete(`/languagePackage/${languagePackageId}`);

// Language package group
export const createGroup = (languagePackageId, data) =>
  api.post(`/languagePackage/${languagePackageId}/group`, data);
export const getGroups = (languagePackageId) =>
  api.get(`/languagePackage/${languagePackageId}/group`);
export const modifyGroup = (data) => api.put(`/group/${data.id}`, data);
export const deleteGroup = (groupId) => api.delete(`/group/${groupId}`);

// Vocabulary
export const createVocabulary = (
  languagePackageId,
  groupId,
  data,
  activate = false
) =>
  api.post(
    `/languagePackage/${languagePackageId}/group/${groupId}/vocabulary?activate=${activate}`,
    data
  );
export const getGroupVocabulary = (groupId) =>
  api.get(`/group/${groupId}/vocabulary`);
export const modifyVocabulary = (data) =>
  api.put(`/vocabulary/${data.id}`, data);
export const deleteVocabulary = (vocabularyId) =>
  api.delete(`/vocabulary/${vocabularyId}`);

// Query Vocabulary
export const getQueryVocabulary = (
  languagePackageId,
  staged = false,
  limit = defaultLimit
) =>
  api.get(
    `/languagePackage/${languagePackageId}/query?staged=${staged}&limit=${limit}`
  );
export const checkQuery = (vocabularyId, answer = false) =>
  api.patch(`/vocabulary/${vocabularyId}?answer=${answer}`);

// Stats
export const getStats = () => api.get("/user/stats");
