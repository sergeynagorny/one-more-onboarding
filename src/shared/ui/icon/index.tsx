import React, { FC, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import FileIcon from 'shared/assets/icons/file.svg';
import InformationIcon from 'shared/assets/icons/information.svg';
import LinkIcon from 'shared/assets/icons/link.svg';

type IconType = 'file' | 'information' | 'link';

type Props = HTMLAttributes<HTMLElement> & { type: IconType };

const IconSrcByType: Record<IconType, string> = {
    file: FileIcon,
    information: InformationIcon,
    link: LinkIcon,
};

export const Icon: FC<Props> = ({ type, className, ...rest }) => {
    return <img className={twMerge('w-10 h-10', className)} src={IconSrcByType[type]} {...rest} />;
};
