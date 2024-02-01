import {Listener, ListenerReceiveType} from "./Listener.ts";
import {EventDetailType} from "../Transmitters/Clock.ts";
import {Transmitter} from "../Transmitters/Transmitter.ts";

export type CallBackListenerCallbackType<T extends  EventDetailType<any>> = (data: ListenerReceiveType<T>) => void

export abstract class CallbackListener<T extends EventDetailType<any>> extends Listener<T> {
    public callback: CallBackListenerCallbackType<T>;

    protected constructor(callback: CallBackListenerCallbackType<T>, ...transmitter: Transmitter<T>[]) {
        super(...transmitter);
        this.callback = callback.bind((this));

    }

    public receiveUsing(data: ListenerReceiveType<T>) {
        return new Promise<ListenerReceiveType<T>>(() => this.callback(data))
    }

}