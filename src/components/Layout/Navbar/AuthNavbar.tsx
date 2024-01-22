import Button from "@/components/Interactibles/Button/Button";
import Flex from "@/components/Modules/Flex/Flex";
import Icon from "@/components/Modules/Icon";
import { ICON_USER } from "@/icons";
import { T_User } from "@/utils/backend/types";
import { Modal } from "../Modal/Modal";
import { toggleModal } from "@/utils/modal";

export function AuthNavbarSection({ user } : { user: T_User }) {
    return(
        <>
            {
                user.channel
                ? "channel"
                : (
                    <Button button={{ variant: 'primary', onClick: () => toggleModal('3') }}>
                        <Flex props={{ gap: 2 }}>
                            <Icon>{ICON_USER}</Icon>
                            <p className="whitespace-nowrap">Select Channel</p>
                        </Flex>
                    </Button>
                )
            }

            <Modal id="3">
                <p>lorem</p>
            </Modal>
        </>
    )
}