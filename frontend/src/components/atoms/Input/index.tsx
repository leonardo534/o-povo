import { ForwardedRef, forwardRef, PropsWithChildren, Ref } from 'react';

type InputProps = {
    label?: string;
    placeholder: string;
    type?: 'text' | 'password' | 'email';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string;
    required?: boolean;
    className?: string;
    name?: string;
    defaultValue?: string
}

export const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
        <>
            {props.label ? (<label htmlFor={props.name}
                className="text-base mb-3 block text-dark dark:text-white">{props.label}</label>) : ''}
            <input
                defaultValue={props.defaultValue}
                required={props.required}
                type={props.type}
                placeholder={props.placeholder}
                className={`${props.className} mb-8 w-full rounded-xs border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none`}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                ref={ref} />
        </>
    )
});