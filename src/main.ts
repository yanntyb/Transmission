import './style.css';

import {Extractor} from "./Listeners/Transformers/Extractor.ts";
import {EventManager} from "./EventManager.ts";
import {Clock} from "./Transmitters/Clock.ts";


const createDiv = (): HTMLDivElement => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.classList.add('cursor')
    return div;
}

const transformDivs = (callback: (div: HTMLDivElement, i: number) => void, ...divs: HTMLDivElement[]) => {
    divs.forEach(callback)
    return divs;
}


    (() => {

    const clock = Clock.make({
        getTimeCallback: () => 10
    }).startListening();

    const CLOCK_COUNT = 'clock' + clock.getEventName();

      Extractor.make(
          'count',
            (data: number) => {
                EventManager.send(CLOCK_COUNT, {
                    detail: {
                         data: {
                             cos: 100 * (1 + Math.cos(data / 10)),
                             sin: 100 * (1 + Math.sin(data / 10)),
                             originalData: data
                         }
                    }
                })
            },
          clock
      );


      const divs: HTMLDivElement[] = [];


    divs.push(createDiv());

      EventManager.listen(CLOCK_COUNT, ({data}) => {
          transformDivs((div) => {
              const cos = data.detail.data.cos
              div.style.marginLeft =  cos + "px";
          }, ...divs)
      });
      EventManager.listen(CLOCK_COUNT, ({data}) => {
          transformDivs((div) => {
              const sin = data.detail.data.sin
              div.style.marginTop = 2 + sin + "px";
          }, ...divs)
      });






})();
