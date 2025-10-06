'use client';

import { Hamburger } from '../../atoms/Hamburger';
import { MenuProvider, useMenu } from '@/contexts/menu';
import { MenuItem, MenuItemProps } from '@/components/atoms/MenuItem';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation'
import routes from '@/configs/routes';
import { deleteCookie, getCookie, useGetCookies } from 'cookies-next';
import { useEffect, useState } from 'react';
import { logout } from '@/repositories/api';

const menuItems: MenuItemProps[] = [
    {
        link: '/',
        label: 'Inicio',
    },

];

const MenuContainer = () => {
    const { menuOpen } = useMenu();
    const router = useRouter();
    const [menuLogged, setMenuLogged] = useState<MenuItemProps[]>([]);

    useEffect(() => {
        console.log(getCookie('token'));

        if (getCookie('token')) {
            setMenuLogged([...menuLogged, {
                link: '/my-posts',
                label: 'Minhas postagens',
            }])
        }
    }, []);


    return (
        <nav
            className={`menu ${menuOpen && 'h-screen justify-normal'
                } w-screen flex flex-row items-center justify-between @3xl:flex-row @3xl:justify-between @3xl:px-[72px] `}
        >
            <div className={`flex justify-between @3xl:hidden ${!menuOpen ? 'items-center' : 'self-baseline'}`}>
                <Hamburger />
            </div>

            {menuOpen && (
                <ul className="mt-4 flex @3xl:hidden flex-col text-sm gap-4 uppercase font-bold font-sans items-start">
                    {menuItems.map((menu, index) => (
                        <li key={index}>
                            <MenuItem
                                className="border-b w-full last:border-none p-4 !text-primary"
                                key={menu.link}
                                {...menu}
                            />
                        </li>
                    ))}
                    {menuLogged.map((menu, index) => (
                        <li key={index}>
                            <MenuItem
                                className="border-b w-full last:border-none p-4 !text-primary"
                                key={menu.link}
                                {...menu}
                            />
                        </li>
                    ))}

                </ul>
            )}

            {!menuOpen && (
                <ul className="hidden @3xl:flex text-sm gap-[32px] uppercase font-bold font-sans items-center">
                    {menuItems.map((menu, index) => (
                        <li key={index}>
                            <MenuItem key={menu.link} {...menu} className='!text-dark dark:!text-stroke hover:!text-primary' />
                        </li>
                    ))}
                    {menuLogged.map((menu, index) => (
                        <li key={index}>
                            <MenuItem key={menu.link} {...menu} className='!text-dark dark:!text-stroke hover:!text-primary' />
                        </li>
                    ))}
                </ul>
            )}
            <div className={`flex gap-4 ${menuOpen && 'hidden'} ${menuLogged.length === 0 ? '' : 'hidden'}`}>
                <Button onClick={() => router.push(routes.AUTH.LOGIN)} className='!text-dark dark:!text-stroke bg-transparent hover:bg-transparent hover:!text-primary'>
                    Entrar
                </Button>
            </div>
            <div className={`flex gap-4 ${menuOpen && 'hidden'} ${menuLogged.length > 0 ? '' : 'hidden'}`}>
                <Button onClick={async () => {
                    try {
                        // await logout(String(token));
                        deleteCookie("token");
                        document.location.href = "/";

                    } catch (err) {
                        console.error("Erro ao deslogar", err);
                    }
                }} className='!text-dark dark:!text-stroke bg-transparent hover:bg-transparent hover:!text-primary'>
                    Sair
                </Button>
            </div>
        </nav>
    );
};

export const Menu = () => {
    return (
        <MenuProvider>
            <MenuContainer />
        </MenuProvider>
    );
};