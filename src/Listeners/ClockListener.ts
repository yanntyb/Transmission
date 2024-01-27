import { Clock, ClockEventDetailType } from "../Transmitters/Clock";
import { Transmitter } from "../Transmitters/Transmitter";
import {Listener, ListenerReceiveType} from "./Listener";

export class ClockListener extends Listener<ClockEventDetailType> {

    constructor() {
        super();
    }

    public listenTo(): Transmitter<ClockEventDetailType> {
        return Clock.make();
    }

    public receiveUsing(data:  ListenerReceiveType<ClockEventDetailType>)
    {
        return;
    }

}