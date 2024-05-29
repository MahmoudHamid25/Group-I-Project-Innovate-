'use client';

import { useState, MouseEventHandler } from 'react';
import DropdownMenu from '@/app/components/dropdownmenu';
import DropdownOverlay from '@/app/components/dropdownoverlay';

export default function AppContainer() {
    const [dropDown, setDropDown] = useState(false);

    const handleButtonClick: MouseEventHandler<HTMLImageElement> = () => {
        setDropDown(prev => !prev);
    };

    return (
        <div>
            <DropdownMenu handleButtonClick={handleButtonClick} />
            {dropDown && <DropdownOverlay />}
        </div>
    );
}
