import { Menu } from '@/components/molecules/Menu';

export const Header = () => {
    return (
        <header className="flex min-h-[88px] justify-between p-4 border-b-stroke border-b-1 mb-6">
            <Menu />
        </header>
    );
};