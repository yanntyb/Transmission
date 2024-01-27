import { Transmitter } from "../Transmitters/Transmitter";
import {ClickEventDetailType, ClickTransmitter} from "../Transmitters/MouseTransmitter/ClickTransmitter.ts";
import {CallbackListener, CallBackListenerCallbackType} from "./CallbackListener.ts";

export class ClickListener extends CallbackListener<ClickEventDetailType> {


    constructor(callback: CallBackListenerCallbackType<ClickEventDetailType>, transmitter?: ClickTransmitter) {
        super(callback, transmitter);
    }

    public listenTo(transmitter?: ClickTransmitter): Transmitter<ClickEventDetailType> {
        return transmitter ? transmitter : ClickTransmitter.make().listen();
    }


    public static make(callback: CallBackListenerCallbackType<ClickEventDetailType>, transmitter?: Transmitter<ClickEventDetailType>): ClickListener
    {
        return new ClickListener(callback, transmitter);
    }
}