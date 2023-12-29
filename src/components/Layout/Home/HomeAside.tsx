import Button from "@/components/Interactibles/Button/Button";
import Flex from "@/components/Modules/Flex/Flex";
import { css } from "@/utils/css/css";
import urls from './urls.json';

export default function HomeAside() {
    return(
        <Flex tag="aside" column={true} align="start" gap={3}>
            {
                urls.map((section, _) => (
                    <Flex column={true} align="start">
                        <p className="clr-misc-text-muted fw-bold">{section.section}</p>
                        {
                            section.urls.map(val => (
                                <Button button={{ 
                                    variant: 'primary',
                                    cls: css(null, "fs-350 width-100"),
                                    to: val.url
                                }}>
                                    <Flex align="center" gap={2}>
                                        <div className="icon">{val.icon}</div>
                                        <p>{val.name}</p>
                                    </Flex>
                                </Button>
                            ))
                        }
                    </Flex>
                ))
            }
        </Flex>
    )
}