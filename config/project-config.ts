import { api } from "@/config/axios.config";
import { type Project } from "@/app/api/projects/data";
import { type Board } from "@/app/api/boards/data";
import { type Task } from "@/app/api/tasks/data";
import { type SubTask } from "@/app/api/tasks/data";
import { type Comment } from "@/app/api/comments/data";
export const getProjects = async () => {
  const response = await api.get("/pros/projects");
  return response.data;
};

export const createProject = async (project: Project) => {
  const response = await api.post("/pros/projects", project);
  return response.data;
};

export const deleteProject = async (id: Project["id"]) => {
  await api.delete(`/pros/projects/${id}`);
};

export const getProject = async (id: Project["id"]) => {
  const response = await api.get(`/pros/projects/${id}`);
  return response.data;
};

export const updateProject = async (id: Project["id"], project: Project) => {
  const response = await api.put(`/pros/projects/${id}`, project);
  return response.data;
};

// board
export const getBoards = async () => {
  const response = await api.get("/pros/boards");
  // console.log("[response]", response);
  return response.data;
};
export const createBoard = async (board: Board) => {
  const response = await api.post("/pros/boards", board);
  return response.data;
};

export const deleteBoard = async (id: Board["id"]) => {
  await api.delete(`/pros/boards/${id}`);
};
export const updateBoard = async (id: Board["id"], board: Board) => {
  const response = await api.put(`/pros/boards/${id}`, board);
  return response.data;
};
export const swapBoard = async (data: any) => {
  const response = await api.patch("/pros/boards", data);
  return response.data;
};
// tasks
export const getTasks = async () => {
  const response = await api.get("/pros/tasks");
  return response.data;
};

export const createTask = async (board: Board) => {
  const response = await api.post("/pros/tasks", board);
  return response.data;
};
export const deleteTask = async (id: Board["id"]) => {
  await api.delete(`/pros/tasks/${id}`);
};

export const updateTask = async (taskId: Task["id"], updatedFields: Task) => {
  try {
    const response = await api.put(`/pros/tasks/${taskId}`, updatedFields);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// sub task
export const getSubtasks = async () => {
  const response = await api.get(`/pros/tasks/subtasks`);
  return response.data;
};
export const createSubTask = async (subtask: SubTask) => {
  const response = await api.post("/pros/tasks/subtasks", subtask);
  return response.data;
};
export const deleteSubTask = async (id: SubTask["id"]) => {
  await api.delete(`/pros/tasks/subtasks/${id}`);
};

export const updateSubTask = async (
  subtaskId: SubTask["id"],
  updatedFields: SubTask
) => {
  try {
    const response = await api.put(
      `/pros/tasks/subtasks/${subtaskId}`,
      updatedFields
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// comments
export const getComments = async () => {
  const response = await api.get(`/pros/comments`);
  return response.data;
};

export const postComment = async (comment: Comment) => {
  const response = await api.post("/pros/comments", comment);
  return response.data;
};
