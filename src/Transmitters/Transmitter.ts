import { EventManager } from "../EventManager";
import { Switchable, Switcher } from "../Switchs/Switcher";


export abstract class Transmitter<DataSendType> implements Switchable{

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

    public receive() {
      if (!this.canTrigger() || !this.transmissionOn || !this.switcher?.state) return;

      this.receivesAt.push(this.date.getTime());
      return EventManager.send<DataSendType>(this.getEventName(), this.getData());
    }

    public listen() {
      this.transmissionOn = true;
      this.transmitUsing(this.receive.bind(this));
      return this;
    }


     /**
     * Define the confdition to trigger transmittion,
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

    public canTrigger(): boolean
    {
      return true;
    }

    public switchUshing(switcher: Switcher)
    {
      this.switcher = switcher;
      return this;
    }


  }