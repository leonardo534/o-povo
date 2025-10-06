import Link from 'next/link';
import { ReactElement } from 'react';

export type MenuItemProps = {
    label: string;
    link: string;
    className?: string;
    beforeElement?: ReactElement;
    afterElement?: ReactElement;
};

export const MenuItem = (props: MenuItemProps) => (
    <Link
        className={`menu-item ${props.className} flex gap-2 items-center text-white`}
        href={props.link}
    >
        {props.beforeElement && props.beforeElement}
        {props.label}
        {props.afterElement && props.afterElement}
    </Link>
);