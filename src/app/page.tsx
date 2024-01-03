import Home from '@/components/Layout/Home/Home';
import { css } from '@/utils/css/css';

export default function Layout() {
  return (
    <div className={css("home", "grid margin-block-start-1 gap-3").class}>
      <Home />
    </div>
  )
} 
