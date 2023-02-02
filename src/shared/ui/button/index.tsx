import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> & {
    Prefix?: FC<HTMLAttributes<SVGSVGElement | HTMLElement>> | false;
    Postfix?: FC<HTMLAttributes<SVGSVGElement | HTMLElement>> | false;
    variant?: 'filled' | 'outlined' | 'text';
    color?: 'blue' | 'black';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
};

const ButtonRoot =
    'shrink-0 rounded shadow capitalize transition flex items-center font-semibold justify-center whitespace-nowrap box-border';

const ButtonSize = {
    sm: 'text-sm px-2 h-[34px] min-w-[34px]',
    md: 'text-sm px-3 h-[42px] min-w-[42px]',
    lg: 'text-base px-4 h-[50px] min-w-[50px]',
};

const ButtonVariant = {
    filled: {
        blue: 'border-blue-500 bg-blue-500 text-white hover:bg-blue-500/90 active:bg-blue-600/80 disabled:bg-[#374768] disabled:text-[#778BAE]',
        black: 'border-slate-800 bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900 disabled:bg-slate-600 disabled:shadow-none disabled:text-slate-300',
    },
    outlined: {
        blue: 'border shadow-none border-blue-500 text-blue-500 hover:text-blue-500/80',
        black: 'border text-slate-900 border-slate-300 shadow-slate-50',
    },
    text: {
        blue: 'shadow-none text-blue-500 hover:bg-blue-50 active:bg-blue-100',
        black: 'shadow-none text-slate-900 hover:bg-slate-100 active:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent',
    },
};

export const Button: FC<ButtonProps> = ({
    Prefix,
    children,
    Postfix,
    className,
    size = 'md',
    variant = 'filled',
    color = 'black',
    isLoading,
    ...rest
}) => {
    return (
        <button
            disabled={isLoading}
            className={twMerge(ButtonRoot, ButtonSize[size], ButtonVariant[variant][color], className)}
            {...rest}
        >
            {Prefix && <Prefix className="w-4 h-4" />}
            {children && <span className="mx-2">{children}</span>}
            {Postfix && <Postfix className="w-4 h-4" />}
        </button>
    );
};
