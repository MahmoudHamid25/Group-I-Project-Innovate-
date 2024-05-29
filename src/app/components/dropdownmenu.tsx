'use client';

import Image from "next/image";
import { MouseEventHandler } from 'react';

interface DropdownMenuProps {
    handleButtonClick: MouseEventHandler<HTMLImageElement>;
}

function DropdownMenu({ handleButtonClick }: DropdownMenuProps) {
    return (
        <div>
            <Image
                src="/img/menulines.svg"
                alt="Hamburger Menu"
                height={18}
                width={32}
                onClick={handleButtonClick}
            />
        </div>
    );
}

export default DropdownMenu;
