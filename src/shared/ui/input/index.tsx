import { useField } from 'formik';
import React, { FC, InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string | ReactNode;
    grow?: boolean;
    error?: false | string;
};

const inputRoot =
    'px-5 border-gray-500 border bg-transparent rounded-md placeholder-[#96A8C7] border-[#2C3B58] text-[#CED9E9] focus:border-[#7BB3F8] text-sm shadow-sm w-full h-[42px]';

export const Input: FC<InputProps> = ({ type = 'text', grow, error, className, label, ...rest }) => {
    return (
        <label className={twMerge(grow && 'grow')}>
            {label && <span className="block text-[#96A8C7] text-sm mb-1">{label}</span>}
            <input className={twMerge(inputRoot, className)} type={type} {...rest} />
            {error && <p className="text-xs mt-1 text-orange-600 font-medium">{error}</p>}
        </label>
    );
};

export const InputField: FC<InputProps & { name: string }> = (props) => {
    const [fields, meta] = useField(props);

    return <Input error={meta.touched && meta.error} {...props} {...fields} />;
};
