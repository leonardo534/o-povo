'use client';
import { useEffect, useState } from "react";
import { PostCard } from "@/components/molecules/PostCard"
import { getPosts } from "@/repositories/api";
import { Post } from "@/types/api";

export const ListPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        async function loadPosts() {
            const data = await getPosts()
            setPosts(data);
        }
        loadPosts()
    }, [])

    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
            {posts.map((post) => (
                <PostCard
                    key={post.id} title={post.title} author={post.author}
                    content={post.content} categories={post.categories}
                    author_id={post.author_id} id={post.id} created_at={post.created_at} />
            ))}

        </div>
    )
}