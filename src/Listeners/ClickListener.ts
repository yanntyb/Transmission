import { Transmitter } from "../Transmitters/Transmitter";
import {ClickEventDetailType, ClickTransmitter} from "../Transmitters/MouseTransmitter/ClickTransmitter.ts";
import {CallbackListener, CallBackListenerCallbackType} from "./CallbackListener.ts";

export class ClickListener extends CallbackListener<ClickEventDetailType> {


    constructor(callback: CallBackListenerCallbackType<ClickEventDetailType>, ...transmitters: ClickTransmitter[]) {
        super(callback, ...transmitters);
    }

    public listenTo(transmitter?: ClickTransmitter): Transmitter<ClickEventDetailType> {
        return transmitter ? transmitter : ClickTransmitter.make().startListening();
    }


    public static make(callback: CallBackListenerCallbackType<ClickEventDetailType>, ...transmitters: Transmitter<ClickEventDetailType>[]): ClickListener
    {
        return new ClickListener(callback, ...transmitters);
    }
}