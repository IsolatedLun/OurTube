import Button from "@/components/Interactibles/Button/Button";
import Flex from "@/components/Modules/Flex/Flex";
import { css } from "@/utils/css/css";
import urls from './urls.json';
import { ICON_SIGN_OUT } from "@/icons";
import { signOut, useSession } from "next-auth/react";

export default function HomeAside() {
    const { data:session } = useSession();

    return(
        <Flex tag="aside" props={{ column: true, align: 'start', gap: 3 }}>
            {
                urls.map((section, i) => (
                    <Flex key={i} props={{ column: true, align: 'start', grow: true }}>
                        <p className="clr-misc-text-muted fw-bold">{section.section}</p>
                        {
                            section.urls.map((val, j) => (
                                <Button key={i + j} button={{ 
                                    variant: 'primary',
                                    cls: css(null, "fs-350 width-100"),
                                    to: val.url
                                }}>
                                    <Flex props={{ align: 'start', gap: 2 }}>
                                        <div className="icon">{val.icon}</div>
                                        <p>{val.name}</p>
                                    </Flex>
                                </Button>
                            ))
                        }

                        {
                            (i === urls.length - 1 && session !== null)
                            ? (
                                <Button button={{ 
                                    variant: 'error',
                                    cls: css(null, "fs-350 width-100"),
                                    onClick: () => signOut()
                                }}>
                                    <Flex props={{ align: 'center', gap: 2 }}>
                                        <div className="icon">{ICON_SIGN_OUT}</div>
                                        <p>Log out</p>
                                    </Flex>
                                </Button>
                            )
                            : null
                        }
                    </Flex>
                ))
            }
        </Flex>
    )
}