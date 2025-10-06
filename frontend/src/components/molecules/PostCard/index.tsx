import { Post } from '@/types/api';
import { formatDate } from '@/utils/utils';
import Image from 'next/image';
import TrashIcon from '../../../icons/trash.svg';
import EditIcon from '../../../icons/edit.svg';
import { deletePost } from '@/repositories/api';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { HtmlSnippet } from '@/components/atoms/HtmlSnippet';

type PostProps = Omit<Post, 'delete'> & {
    edit?: boolean
    onEdit?: () => void;
    delete?: boolean
    onDelete?: (id: string) => Promise<void>;
};

export const PostCard = (props: PostProps) => {
    return (
        <article className="cursor-pointer max-w-[640px] mb-10 shadow-3xl group relative flex flex-col overflow-clip rounded-xs bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
            {props.delete && (
                <EditIcon className="absolute  max-sm:top-5 max-sm:left-10 sm:!bottom-15 sm:!right-5 z-50"
                    onClick={() => props.onEdit && props.onEdit()}
                    width={25} height={25} />
            )}
            {props.delete && (
                <TrashIcon className="absolute sm:!bottom-5 max-sm:top-5 max-sm:left-2  sm:!right-5 z-50"
                    onClick={() => props.onDelete && props.onDelete(String(props.id))}
                    width={25} height={25} />
            )}
            <a href={`/posts/${props.id}`}>
                <div className="relative aspect-37/22 overflow-hidden">
                    <Image width="100" height='100' alt="image" style={{ position: 'absolute', inset: 0, color: 'transparent' }} className="object-cover object-center transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 w-full" src={"https://placehold.co/600x400"} />
                    {props.categories.map((category) => (
                        <span key={category.id} className="absolute right-6 top-6 z-10 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white duration-300 hover:bg-primary/90">{category.name}</span>
                    ))}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
                    <h3>
                        <div className="mb-4 line-clamp-2 text-xl font-bold text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary sm:text-[22px]">
                            <span className="absolute inset-0" aria-hidden="true">
                            </span>{props.title}
                        </div>
                    </h3>
                    <div className="mb-6 line-clamp-3 text-base text-body-color dark:text-body-color-dark">
                        <HtmlSnippet html={props.content} maxLength={150} />
                    </div>
                    <div className="mt-auto flex items-center border-t border-body-color/50 pt-6 dark:border-white/50">
                        <figure className="relative flex items-center gap-4">
                            <Image width="40" height='40' alt="image" className="size-10 shrink-0 rounded-full object-cover"
                                src="https://placehold.co/40x40" />
                            <figcaption>
                                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                                    <span className="absolute inset-0" aria-hidden="true">
                                    </span>Criado por {props.author.name}
                                </h4>

                            </figcaption>

                        </figure>
                        <div className="ml-5 shrink-0 border-l border-body-color/50 border-opacity-10 pl-5 dark:border-white xl:ml-3 xl:pl-3 2xl:ml-5 2xl:pl-5">
                            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">Data</h4>
                            <p className="text-xs text-body-color dark:text-body-color-dark">{formatDate(new Date(props.created_at))}</p>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    );
};