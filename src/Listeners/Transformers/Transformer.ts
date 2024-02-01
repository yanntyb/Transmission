import {BaseCallBackListener} from "../BaseCallBackListener.ts";
import {ListenerReceiveType} from "../Listener.ts";
import {EventDetailType} from "../../Transmitters/Clock.ts";

export abstract class Transformer<T extends EventDetailType<any>> extends BaseCallBackListener<T>
{

    public async receiveUsing(data: ListenerReceiveType<T>): Promise<ListenerReceiveType<T>> {

        const morphedData = this.extractUsing(data);
        return super.receiveUsing(morphedData);
    }

    public abstract extractUsing(data: ListenerReceiveType<T>): ListenerReceiveType<T>;


}