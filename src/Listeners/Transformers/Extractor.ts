import {Transformer} from "./Transformer.ts";
import {DetailType, EventDetailType} from "../../Transmitters/Clock.ts";
import {CallBackListenerCallbackType} from "../CallbackListener.ts";
import {Transmitter} from "../../Transmitters/Transmitter.ts";
import {ListenerReceiveType} from "../Listener.ts";

type EventDetailKeyOf<T extends EventDetailType<any>> = keyof DetailType<T>;

export class Extractor<T extends EventDetailType<any>> extends  Transformer<T> {

    public extractKey: EventDetailKeyOf<T>;

    public constructor(
        extractKey: EventDetailKeyOf<T>,
        callback: CallBackListenerCallbackType<T>,
        ...transmitters: Transmitter<T>[]) {
        super(callback, ...transmitters);
        this.extractKey = extractKey;

    }


    public static make<T extends EventDetailType<any>>(
        extractKey: EventDetailKeyOf<T>,
        callback: CallBackListenerCallbackType<T>,
        ...transmitters: Transmitter<T>[]
    ): Extractor<T>
    {
        return new Extractor(extractKey, callback, ...transmitters);
    }

    public extractUsing(data: ListenerReceiveType<T>): ListenerReceiveType<T> {


        if (data.data) {
            return data.data.detail[this.extractKey];
        }


        return data;
    }

}