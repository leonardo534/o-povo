'use client';
import { useEffect, useState } from "react";
import { PostCard } from "@/components/molecules/PostCard"
import { authMe, deletePost, getMyPosts } from "@/repositories/api";
import { Post, User } from "@/types/api";
import TrashIcon from '../../../icons/trash.svg';
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const ListMyPosts = () => {
    const token = getCookie("token") as string | undefined;
    const [posts, setPosts] = useState<Post[]>([]);
    const route = useRouter();
    useEffect(() => {
        async function loadPosts() {
            const data = await getMyPosts(String(token))
            const auth = await authMe(String(token));
            setPosts(Array.isArray(data) ? data : [data]);
        }
        loadPosts()

    }, []);

    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
            {posts.map((post) => (
                <PostCard
                    edit
                    onEdit={() => {
                        route.push(`/my-posts/${post.id}`)
                    }}
                    onDelete={async (id) => {
                        await deletePost(Number(id), String(token));
                        setPosts((prev) => prev.filter((p) => p.id !== Number(id)));
                    }}
                    key={post.id} delete title={post.title} author={post.author}
                    content={post.content} categories={post.categories}
                    author_id={post.author_id} id={post.id} created_at={post.created_at} />
            ))}

        </div>
    )
}