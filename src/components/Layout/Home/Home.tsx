import { css } from "@/utils/css/css";
import HomeAside from "./HomeAside";

export default function Home() {
    return(
        <main className={css("home container", "margin-block-start-2 gap-3").class} data-type="full">
            <HomeAside />
            <div className="videos">
                suii
            </div>
        </main>
    )
}