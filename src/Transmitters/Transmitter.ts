import { EventManager } from "../EventManager";
import { Switchable, Switcher } from "../Switchs/Switcher";
import {EventDetailType} from "./Clock.ts";


export abstract class Transmitter<DataSendType extends EventDetailType<any>> implements Switchable{

    public date: Date;
    public uudi: string;
    public transmissionOn: boolean = false;
    public switcher?: Switcher;

    /**
     * Log timestamp when receive methode get called
     */
    public receivesAt: number[] = [];

    constructor() {
      this.date = new Date();
      this.uudi = Math.random().toString();
    }

    public abstract getEventName(): string;

    private receive() {
      if (!this.canTrigger() || !this.transmissionOn || !this.switcher?.state) return;

      this.receivesAt.push(this.date.getTime());

      return EventManager.send<DataSendType>(this.getEventName(), this.getData());
    }

    /**
     *
     */
    public startListening() {
      this.transmissionOn = true;
      this.transmitUsing(this.receive.bind(this));
      return this;
    }


     /**
     * Define the condition to trigger transmit,
     * Call transmit() when u want to trigger transmission
     * 
     * @param transmit 
     */
    public abstract transmitUsing(transmit: () => void): void;

    /**
     * Define witch data you want to send
     */
    public abstract sendDataUsing(): () => DataSendType;
    private getData()
    {
      return this.sendDataUsing()();
    }

    /**
     * Define whenever this transmitter work
     */
    public canTrigger(): boolean
    {
      return true;
    }

    /**
     * Use to define a Switcher capable of switching if this transmitter can work or not
     * @param switcher
     */
    public switchUsing(switcher: Switcher)
    {
      this.switcher = switcher.switch(true);
      return this;
    }


  }