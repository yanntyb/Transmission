import '../style.css';
import {EventManager} from "../EventManager.ts";
import {Clock} from "../Transmitters/Clock.ts";
import {Switcher} from "../Switchs/Switcher.ts";
import {CanvasManager} from "../CanvasManager.ts";




(() => {

    const canvas = CanvasManager.getInstance();
    const position = {
        x: 0,
        y: 0,
    }

    const [clock] = Switcher.for<Clock>(Clock.make({
        getTimeCallback: () => 1
    }).startListening()).switch(true).switchables;




    EventManager.listenToTransmitter(({data}) => {
        position.x =  100 * (1 + Math.cos(((data?.detail?.count ?? 0) / 50)));


        //position.x += 100 +  (1 + Math.cos((data?.detail?.count ?? 0)));
    }, clock);

    EventManager.listenToTransmitter(({data}) => {
        position.y =  100 * (1 + Math.sin(((data?.detail?.count ?? 0) / 50)));


    }, clock);

    EventManager.listenToTransmitter(() => {
        canvas.placePixelAt({...position});
    }, clock)

    Array.from({length: 50}).forEach((_v, i) => {
        EventManager.listenToTransmitter(() => {
            const multi = 1 + (i / 10);
            canvas.placePixelAt({
                x: position.x * multi,
                y: position.y * multi,
            });
        }, clock)
    })

})();
