import {  EventDetailType } from "./Transmitters/Clock";
import { Transmitter } from "./Transmitters/Transmitter";

export type EventType<EventDetailsType> = Event & {
    detail: {
        data: () => EventDetailsType;
    }
};

export class EventManager {
    
    public static send<EventDetailsType>(type: string, data: EventDetailsType) {
        const event = new CustomEvent(type, {detail: { data: () => data }});
        return new Promise(() => window.dispatchEvent(event)) ;
    }

    public static listen<EventDetailsType>(
        types: string | string[],
        callback: (detail: {data?: EventDetailsType, event: Event }) => void
    ) {

        types = Array.isArray(types) ? types : [types];
        return types.map((type: string) => {
            return window.addEventListener(type, (e: unknown) => {
                const event = e as EventType<EventDetailsType>;
                // Case where callback is an empty anonymous function () => {}
                if (typeof event.detail.data !== 'function') {
                    return callback({event});
                }
                return callback({data: event.detail.data(), event});
            });
        });
    }


    /**
     * Listen to a transmitter
     *
     * @param transmitters
     * @param callback
     * @returns
     */
    public static listenToTransmitter<D extends EventDetailType<any>>(
        callback: (detail: {data?: D, event: Event} ) => void, ...transmitters: Transmitter<D>[]
    )
    {

        return transmitters.map((transmitter: Transmitter<D>) => {
            return EventManager.listen(transmitter.getEventName() + transmitter.uudi, callback);
        })
    }
}

declare global {
    interface Window {
        EventManager: EventManager;
    }
}

window.EventManager = EventManager;

