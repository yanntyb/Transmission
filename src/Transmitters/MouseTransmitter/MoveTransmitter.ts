import { EventManager } from "../../EventManager.ts";
import { Transmitter } from "../Transmitter.ts";
import {EventDetailType} from "../Clock.ts";

export type PositionType = {
    x: number;
    y: number;
}

export type MoveEventDetailType = EventDetailType<{
    lastPosition: PositionType;
}>;


export class MoveTransmitter extends Transmitter<MoveEventDetailType>   {

    public position: PositionType = {x: 0,y: 0}

    public transmitUsing(transmit: () => void): void {
        EventManager.listen<MoveEventDetailType>('mousemove', ({ data}) => {

            console.log(data);
            /*this.position = {
                x: data.detail.lastPosition.x,
                y: data.detail.lastPosition.y,
            }*/
            transmit();
        })
    }

    public static make(): MoveTransmitter
    {
        return new MoveTransmitter();
    }

    public sendDataUsing()
    {
        return () => (
            {
                detail: {
                    lastPosition: {
                        x: this.position.x,
                        y: this.position.y
                    }
                }
            }
        );
    }
    
    public canTrigger(): boolean {
        return true;
    }

    public getEventName(): string 
    {
        return 'MoveTransmitter';
    }
    
}