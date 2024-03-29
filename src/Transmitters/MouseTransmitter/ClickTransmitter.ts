import { EventManager } from "../../EventManager.ts";
import { Transmitter } from "../Transmitter.ts";
import {EventDetailType} from "../Clock.ts";

export type ClickEventDetailType = EventDetailType<{
    count: number;
}>


export class ClickTransmitter extends Transmitter<ClickEventDetailType>   {


    constructor() {
        super();
    }

    public transmitUsing(transmit: () => void): void {
        EventManager.listen('click', () => {
            transmit();
        })
    }

    public static make(): ClickTransmitter
    {
        return new ClickTransmitter();
    }

    public sendDataUsing()
    {
        return () => ({
            detail: {
                count: 1
            }
        });
    }
    
    public canTrigger(): boolean {
        return true;
    }

    public getEventName(): string 
    {
        return 'ClickTransmitter' + this.uudi;
    }
    
}