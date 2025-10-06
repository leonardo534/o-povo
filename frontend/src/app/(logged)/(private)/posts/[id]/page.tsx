import { Text } from "@/components/atoms/Text";
import { getPostById } from "@/repositories/api";
import CalenderIcon from '../../../../../icons/calendar.svg';
import Image from "next/image";
import { formatDate } from "@/utils/utils";
import { HtmlSnippet } from "@/components/atoms/HtmlSnippet";

export default async function Posts(props: PageProps<'/posts/[id]'>) {
    const { id } = await props.params;
    const post = await getPostById(Number(id));

    return (
        <>
            <Text as="h2" className="mb-8 text-3xl leading-tight font-bold text-black sm:text-4xl sm:leading-tight dark:text-white">{post.title}</Text>
            <div className="border-stroke dark:border-stroke-dark mb-10 grid items-center gap-x-10 gap-y-5 border-b pb-8 min-[645px]:grid-cols-[auto_1fr_auto]">
                <figure className="relative flex items-center gap-4">
                    <Image width="40" height='40' alt="image" className="size-10 shrink-0 rounded-full object-cover"
                        src="https://placehold.co/40x40" />
                    <figcaption className="text-body-color dark:text-body-color-dark whitespace-nowrap">
                        <span className="sr-only">Publicado</span> Por <a >
                            <span className="absolute inset-0" aria-hidden="true">
                            </span>{post.author.name}</a>
                    </figcaption>
                </figure>
                <dl className="text-body-color dark:text-body-color-dark  items-center gap-5">
                    <dt className="flex flex-row items-center gap-2"><CalenderIcon /> Publicado em {formatDate(new Date(post.created_at))}</dt>
                </dl>
                {post.categories.map((category) => (
                    <span key={category.id} className="right-6 top-6 z-10 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white duration-300 hover:bg-primary/90">{category.name}</span>
                ))}
            </div>
            <div className="relative mb-10 aspect-97/60 sm:aspect-97/32">
                <Image width="100" height='100' alt="image" style={{ inset: 0, color: 'transparent' }} className="object-cover object-center transition-all duration-300 absolute group-hover:rotate-3 group-hover:scale-110 w-full" src={"https://placehold.co/600x200"} />
            </div>
            <article className="mb-12">
                <HtmlSnippet html={post.content} maxLength={post.content.length} />
            </article>
        </>
    )
}

