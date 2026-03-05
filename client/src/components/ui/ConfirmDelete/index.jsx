import { useEffect, useRef, useState } from "react";
import { DeleteIcon } from "../DeleteIcon";
import { Typo } from "../Typo";

import * as SC from "./styles";

export const ConfirmDelete = ({ label = 'Удалить', onConfirm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const handleIconClick = () => {
        setIsOpen(true);
    };

    const handleConfirmClick = () => {
        onConfirm();
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen])

    return (
        <SC.ConfirmDelete ref={wrapperRef}>
            <DeleteIcon onClick={handleIconClick} />
            {
                isOpen && <SC.PopoverDelete onClick={handleConfirmClick}>
                    <Typo>{label}</Typo>
                </SC.PopoverDelete>
            }
        </SC.ConfirmDelete>
    )
};