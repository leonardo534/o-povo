import { PropsWithChildren } from 'react';
type ButtonProps = {
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLInputElement>) => void;
}
export const Button = (props: ButtonProps) => {
    return (
        <button disabled={props.disabled} type={props.type} onClick={props.onClick} className={`
            rounded-xs bg-primary px-8 py-4 text-base font-semibold 
            text-white duration-300 ease-in-out cursor-pointer hover:bg-primary/80 ${props.className}`}>
            {props.children}
        </button>
    );
};