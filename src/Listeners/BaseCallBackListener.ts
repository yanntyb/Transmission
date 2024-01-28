import { Transmitter } from "../Transmitters/Transmitter";
import {CallbackListener, CallBackListenerCallbackType} from "./CallbackListener.ts";
import {EventDetailType} from "../Transmitters/Clock.ts";

export class BaseCallBackListener<T extends EventDetailType<any>> extends CallbackListener<T> {


    constructor(callback: CallBackListenerCallbackType<T>, ...transmitter: Transmitter<T>[]) {
        super(callback, ...transmitter);
    }

    public listenTo(...transmitters: Transmitter<T>[]): Transmitter<T>[] {
        return transmitters;
    }

    public static make<T extends EventDetailType<any>>(
        callback: CallBackListenerCallbackType<T>,
        ...transmitters: Transmitter<T>[]
    ): BaseCallBackListener<T>
    {
        return new BaseCallBackListener(callback, ...transmitters);
    }
}