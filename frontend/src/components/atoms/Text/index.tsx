import React from 'react';

type TextProps<T extends React.ElementType> = {
    as?: T;
    className?: string;
    children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export const Text = <T extends React.ElementType = 'p'>({
    as,
    className,
    children,
    ...rest
}: TextProps<T>) => {
    const Component = as || 'p';

    return (
        <Component className={className} {...rest}>
            {children}
        </Component>
    );
};
