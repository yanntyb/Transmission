import { Switchable } from "../Switchs/Switcher";
import { Transmitter } from "./Transmitter";

type ClockConfigurationType = {
    getTimeCallback: () => number;
}

export type DetailType<T> = T;

export type EventDetailType<T> = {detail: DetailType<T>}


export type ClockEventDetailType = EventDetailType<{
    count: number;
    timer: number;
    latestTimestamp: number
}>

export class Clock extends Transmitter<ClockEventDetailType> implements Switchable<Clock>  {

    public timer?: number;
    public config: ClockConfigurationType = {
        getTimeCallback: () => 0,
    }
    public count: number = 0;
    public latestTimestamp = 0;

    constructor(configuration?: ClockConfigurationType) {
        super();
        let baseConfig: ClockConfigurationType  = {getTimeCallback: () => 1};
        this.config = configuration ? configuration : baseConfig;
    }

    public transmitUsing(transmit: () => void): void {

        requestAnimationFrame(() => {
            this.count++;
            this.latestTimestamp =  new Date().getTime();
            transmit();

            if (!this.config.getTimeCallback()) {
                this.transmitUsing(transmit);
                return;
            }

            window.setTimeout(() => {
                this.transmitUsing(transmit);

            }, this.config.getTimeCallback());
        });

    }

    public static make(configuration?: ClockConfigurationType): Clock
    {
        return new Clock(configuration);
    }

    public sendDataUsing(): () => ClockEventDetailType
    {
        return () => ({
            detail: {
                count: this.count,
                timer: this.timer ?? 0,
                latestTimestamp: this.latestTimestamp,
            }
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