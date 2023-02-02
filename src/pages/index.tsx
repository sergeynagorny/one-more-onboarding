import { Outlet } from 'react-router-dom';

import { Navigation } from '../widgets/navigation';

export const Root = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navigation />
            </header>
            <main className="flex-grow flex">
                <Outlet />
            </main>
        </div>
    );
};
