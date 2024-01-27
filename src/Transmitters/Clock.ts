import { Switchable } from "../Switchs/Switcher";
import { Transmitter } from "./Transmitter";

type ClockConfigurationType = {
    getTimeCallback: () => number;
}


export type EventDetailType = {}


export type ClockEventDetailType = EventDetailType & {
    count: number;
    timer: number;
    latestTimestamp: number
}

export class Clock extends Transmitter<ClockEventDetailType>  implements Switchable  {

    public timer?: number;
    public configuration: ClockConfigurationType = {
        getTimeCallback: () => 1000,
    }
    public count: number = 0;
    public latestTimestamp = 0;

    public transmitUsing(transmit: () => void): void {
        this.timer = window.setInterval(
            () => {
                this.count++;
                this.latestTimestamp =  new Date().getTime();
                transmit();
            },
            this.configuration.getTimeCallback()
        );
    }

    public static make(): Clock
    {
        return new Clock();
    }

    public sendDataUsing()
    {
        return () => ({
            count: this.count,
            timer: this.timer ?? 0,
            latestTimestamp: this.latestTimestamp,
        });
    }
    
    public canTrigger(): boolean {
        return true;
    }

    public getEventName(): string 
    {
        return 'CLOCK';
    }
    
}