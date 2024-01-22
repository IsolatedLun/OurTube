import Button from "@/components/Interactibles/Button/Button";
import Card from "@/components/Modules/Card/Card";
import Flex from "@/components/Modules/Flex/Flex";
import { css } from "@/utils/css/css";
import { T_CSS } from "@/utils/css/types";
import { toggleModal } from "@/utils/modal";
import React from "react";

export function Modal({ children, cls, id } : { children: React.ReactNode, cls?: T_CSS, id: string }) {
    return(
        <dialog id={id} className={css("modal").extend(cls).class}>
            <Card cls={css(null, 'padding-1 padding-inline-2 width-100 height-100')}>
                <Flex props={{ grow: true, column: true, align: 'start', justify: 'space-between' }} cls={css(null, 'height-100')}>
                    <div>
                        {children}
                    </div>

                    <Button button={{ 
                        variant: 'error', 
                        cls: css(null, "margin-block-start-2 width-100"),
                        onClick: () => toggleModal(id)
                    }}>
                        Close
                    </Button>
                </Flex>
            </Card>
        </dialog>
    )
}