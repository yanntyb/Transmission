import {BaseCallBackListener} from "../BaseCallBackListener.ts";
import {ListenerReceiveType} from "../Listener.ts";
import {EventDetailType} from "../../Transmitters/Clock.ts";

export abstract class Transformer<T extends EventDetailType<any>> extends BaseCallBackListener<T>
{

    public receiveUsing(data: ListenerReceiveType<T>): ListenerReceiveType<T> {

        const morphedData = this.extractUsing(data);
        super.receiveUsing(morphedData);
        return morphedData;
    }

    public abstract extractUsing(data: ListenerReceiveType<T>): ListenerReceiveType<T>;


}