import './style.css';

import {BaseCallBackListener} from "./Listeners/BaseCallBackListener.ts";
import {ClickTransmitter} from "./Transmitters/MouseTransmitter/ClickTransmitter.ts";


(() => {


      BaseCallBackListener.make(
          (data) => {
              console.log(data.data);
          },
            ClickTransmitter.make().startListening(),
            ClickTransmitter.make().startListening(),
            ClickTransmitter.make().startListening(),
            ClickTransmitter.make().startListening(),
      );

})();