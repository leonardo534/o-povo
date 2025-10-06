import { apiService } from "@/services/Api";
import { Post, User } from "@/types/api";

export function getPosts() {
  return apiService.get<Post[]>(`/posts`);
}

export function getPostById(id: number) {
  return apiService.get<Post>(`/posts/${id}`);
}

export function getMyPosts(token: string) {
  return apiService.getMyPosts<Post>(`/my-posts`, token);
}

export async function deletePost(id: number, token: string) {
  const res = await apiService.delete<Post>(`/delete/${id}`, token);
  return res;
}

export async function updatePost(id: number, body: Object, token: string) {
  const res = await apiService.updatePost<Post>(`/posts/${id}`, body, token);
  return res;
}
/* LOGIN */

export async function auth(email: string, password: string) {
  const res = await apiService.auth<User>(`/auth/login`, email, password);
  return res;
}

export async function authMe(token: string) {
  const res = await apiService.authMe<User>(`/auth/me`, token);
  return res;
}

export async function logout(token: string) {
  const res = await apiService.logout<Post>(`/auth/logout`, token);
  return res;
}
