'use client';

import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

type Context = {
    menuOpen: boolean;
    toogleMenu: () => void;
};

export const MenuContext = createContext<Context>({
    menuOpen: true,
    toogleMenu: () => null,
});

export const useMenu = () => {
    return useContext(MenuContext);
};

export const MenuProvider = (props: PropsWithChildren) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toogleMenu = useCallback(() => {
        setMenuOpen((prev) => !prev);
    }, []);

    return (
        <MenuContext.Provider
            value={useMemo(
                () => ({
                    menuOpen,
                    toogleMenu,
                }),
                [menuOpen, toogleMenu]
            )}
        >
            {props.children}
        </MenuContext.Provider>
    );
};