import { Outlet, createBrowserRouter } from 'react-router-dom';

import { Path } from 'shared/config';

import { Root } from './index';
import { Onboarding } from './onboarding';

export const router = createBrowserRouter([
    {
        element: <Root />,
        children: [
            {
                path: Path.root(),
                element: <Onboarding />,
            },
        ],
    },
]);
