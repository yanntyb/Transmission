import { Transmitter } from "../Transmitters/Transmitter";
import {ClickEventDetailType, ClickTransmitter} from "../Transmitters/MouseTransmitter/ClickTransmitter.ts";
import {CallbackListener, CallBackListenerCallbackType} from "./CallbackListener.ts";

export class ClickListener extends CallbackListener<ClickEventDetailType> {


    constructor(callback: CallBackListenerCallbackType<ClickEventDetailType>, ...transmitters: ClickTransmitter[]) {
        super(callback, ...transmitters);
    }

    public listenTo(...transmitters: ClickTransmitter[]): Transmitter<ClickEventDetailType>[] {
        return transmitters.length ? transmitters : [ClickTransmitter.make().startListening()];
    }


    public static make(callback: CallBackListenerCallbackType<ClickEventDetailType>, ...transmitters: ClickTransmitter[]): ClickListener
    {
        return new ClickListener(callback, ...transmitters);
    }

    public sendDataUsing()
    {
        return () => ({})
    }

}