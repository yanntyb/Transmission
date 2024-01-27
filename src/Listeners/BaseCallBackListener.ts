import { Transmitter } from "../Transmitters/Transmitter";
import {ClickEventDetailType, ClickTransmitter} from "../Transmitters/MouseTransmitter/ClickTransmitter.ts";
import {CallbackListener, CallBackListenerCallbackType} from "./CallbackListener.ts";

export class BaseCallBackListener extends CallbackListener<ClickEventDetailType> {


    constructor(callback: CallBackListenerCallbackType<ClickEventDetailType>, ...transmitter: ClickTransmitter[]) {
        super(callback, ...transmitter);
    }

    public listenTo(transmitter?: ClickTransmitter): Transmitter<ClickEventDetailType> {
        return transmitter ? transmitter : ClickTransmitter.make().startListening();
    }


    public static make(
        callback: CallBackListenerCallbackType<ClickEventDetailType>,
        ...transmitters: Transmitter<ClickEventDetailType>[]
    ): BaseCallBackListener
    {
        return new BaseCallBackListener(callback, ...transmitters);
    }
}