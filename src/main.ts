import './style.css';

import {ClickListener} from "./Listeners/ClickListener.ts";


(() => {
      ClickListener.make(() => console.log('ici'),);
})();