import { Clock, ClockEventDetailType } from "../Transmitters/Clock";
import { Transmitter } from "../Transmitters/Transmitter";
import {Listener, ListenerReceiveType} from "./Listener";

export class ClockListener extends Listener<ClockEventDetailType> {

    constructor() {
        super();
    }

    public listenTo(... transmitter: Transmitter<ClockEventDetailType>[]): Transmitter<ClockEventDetailType>[]
    {
        return transmitter.length ? transmitter : [Clock.make()];
    }

    public receiveUsing(data:  ListenerReceiveType<ClockEventDetailType>)
    {
        return data;
    }

}