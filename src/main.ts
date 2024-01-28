import './style.css';

import {Extractor} from "./Listeners/Transformers/Extractor.ts";
import {EventManager} from "./EventManager.ts";
import {Clock} from "./Transmitters/Clock.ts";
import {ClockListener} from "./Listeners/ClockListener.ts";
import {CallbackListener} from "./Listeners/CallbackListener.ts";
import {BaseCallBackListener} from "./Listeners/BaseCallBackListener.ts";


const createDiv = (): HTMLDivElement => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.classList.add('cursor')
    return div;
}

(() => {

    const clock = Clock.make({
        getTimeCallback: () => 100
    }).startListening();

    const CLOCK_COUNT = 'clock' + clock.getEventName();

      Extractor.make(
          'count',
            (data: number) => {
                EventManager.send(CLOCK_COUNT, {
                    detail: {
                         data: {
                             data: Math.cos(data),
                             originalData: data
                         }
                    }
                })
            },
          clock
      );


      const divs: HTMLDivElement[] = [];

      EventManager.listen(CLOCK_COUNT, ({data}) => {
         const div = createDiv();
         divs.push(div);
         div.style.marginTop = data?.detail.data.data * 20 + 'px';
      });

      EventManager.listen(CLOCK_COUNT, ({data}) => {
          divs.forEach((div, i) => {
              div.style.marginLeft = i * 10 + 'px';
          })
      });

    EventManager.listen(CLOCK_COUNT, ({data}) => {
        divs.forEach((div) => {
            const left = parseInt(getComputedStyle(div).marginLeft);
            div.style.marginLeft = left + (-10 * data?.detail.data.originalData) + "px";
        })
      });





})();
