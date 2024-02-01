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

    public extractUsing(data: ListenerReceiveType<T>): ListenerReceiveType<T>
    {
        return data.data ? {data: data.data.detail[this.extractKey]} : data;
    }

}