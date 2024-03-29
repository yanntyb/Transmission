import { EventManager } from "../EventManager";
import {  EventDetailType } from "../Transmitters/Clock";
import { Transmitter } from "../Transmitters/Transmitter";
import {Switcher} from "../Switchs/Switcher.ts";

export type ListenerReceiveType<T extends EventDetailType<any>> = {
    data?: T | undefined,
    event?: Event
}

export abstract class Listener<T extends EventDetailType<any>> {
    
    public transmitters: Transmitter<T>[];

    /**
     * @protected
     * @param transmitters
     */
    protected constructor(...transmitters: Transmitter<T>[]) {
        // Store the transmitters this listener has to listen
        this.transmitters =  this.listenTo(...transmitters);

        //Start the transmission
        Switcher.for(...this.transmitters).switch(true);

        //Listen to the transmitter event
        this.listen();

    }

    /**
     * Used to Set witch event this listener has to listen
     */
    public abstract listenTo(...transmitter: Transmitter<T>[]): Transmitter<T>[];

    /**
     * Listen to the transmitter event and set the callback executed when this listener catch an event
     * @private
     */
    private listen(): void
    {
        EventManager.listenToTransmitter(
            //We have to bind this bring access to this inside callback execution
            this.receiveUsing.bind(this),
            ...this.transmitters
        )
    }

    /**
     * Callback executed when listener catch an event he is listening to
     * @param detail
     */
    abstract receiveUsing(detail: ListenerReceiveType<T>): Promise<ListenerReceiveType<T>>;

}