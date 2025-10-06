"use client";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { authMe, getPostById, updatePost } from "@/repositories/api";
import { Post, User } from "@/types/api";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), {
    ssr: false,
});
export default function PostsEdit(props: PageProps<'/posts/[id]'>) {
    const [title, setTitle] = useState<any>("");
    const [content, setContent] = useState<any>("");
    const [post, setPost] = useState<Post>()
    const [me, setMe] = useState<User>();
    const [cookie] = useState(getCookie('token'))
    const route = useRouter()

    useEffect(() => {
        async function load() {
            const auth = await authMe(String(cookie));
            const { id } = await props.params;
            const post = await getPostById(Number(id));
            setMe(auth);
            setPost(post)
        }
        load();
    }, [])

    const save = () => {
        try {
            updatePost(Number(post?.id), {
                "title": title,
                "content": content.level.content,
                "categories": [1]
            }, String(cookie)).then(() => {
                toast.success('Atualizado com sucesso!', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
        } catch (e) {
            toast.error('Modifique todos os campos e tente novamente!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

    }
    return (
        <div className="flex flex-col gap-3">
            <Input placeholder="" defaultValue={post?.title} onChange={(e) => setTitle(e.target.value)}></Input>
            <Editor
                apiKey="rmmxal51usflvusqoc4r8pebl2t6hu7fubyfnm37b5ms6tug"
                initialValue={post?.content}
                onChange={(e) => setContent(e)}
                init={{
                    height: 500,
                    menubar: false,
                    toolbar:
                        'undo redo | formatselect | bold italic | outdent indent | link image',
                }}
            />
            <div className="flex gap-3 justify-end">
                <Button
                    className="!bg-gray-500"
                    onClick={() => {
                        route.push('/my-posts');
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    className="max-w-fit"
                    onClick={() => {
                        save();
                    }}
                >
                    Atualizar
                </Button>
            </div>
        </div >
    )
}
