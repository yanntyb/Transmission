export interface Switchable {
    switchUshing: (switcher: Switcher) => Switchable;
}

export class Switcher {
    public state: boolean = false;
    public switchables: Switchable[];

    constructor(switchable: Switchable[]) {
        this.switchables = switchable;
    }

    public static for(...switchables: Switchable[]): Switcher
    {
        const switcher = new Switcher(switchables);

        switchables.forEach((s: Switchable )=> s.switchUshing(switcher))
        return switcher;
    }

    public switch(state?: boolean) {
        this.state =  state === undefined ? !this.state : state;
        return this;
    }

}