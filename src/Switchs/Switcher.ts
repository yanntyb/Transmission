export interface Switchable<T> {
    switchUsing: (switcher: Switcher<any>) => Switchable<T>;
}

export class Switcher<T extends Switchable<any>> {
    public state: boolean = false;
    public switchables: T[];

    constructor(switchable: T[]) {
        this.switchables = switchable;
    }

    public static for<T extends Switchable<any>>(...switchables: T[]): Switcher<T>
    {
        const switcher = new Switcher<T>(switchables);

        switchables.forEach((s: Switchable<any>)=> s.switchUsing(switcher))
        return switcher;
    }

    public switch(state?: boolean) {
        this.state =  state === undefined ? !this.state : state;
        return this;
    }

}