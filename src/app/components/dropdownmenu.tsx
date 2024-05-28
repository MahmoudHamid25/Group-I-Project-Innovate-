'use client'

import {useState} from "react";
import Image from "next/image";

export default function DropdownMenu() {
    const [dropDown, setDropDown] = useState(false);

    function HandleButtonClick() {
        if (dropDown) {
            setDropDown(false)
        } else {
            setDropDown(true)
        }

    }

    if (dropDown) {
        return (
            <div>
                <Image
                    src="/img/menulines.svg"
                    alt="Hamburger Menu"
                    height={18}
                    width={32}
                    onClick={HandleButtonClick}
                />
                <div>
                    <p>something</p>
                </div>
            </div>
        );
    } else return (
        <Image
            src="/img/menulines.svg"
            alt="Hamburger Menu"
            height={18}
            width={32}
            onClick={HandleButtonClick}
        />
    )
}