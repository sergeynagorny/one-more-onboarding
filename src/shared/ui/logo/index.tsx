import { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import LogoIcon from 'shared/assets/icons/logo.svg';

export const Logo: FC<HTMLAttributes<HTMLElement>> = ({ className, ...rest }) => {
    return <img src={LogoIcon} alt="Logo" className={twMerge('w-36 h-7', className)} {...rest} />;
};
