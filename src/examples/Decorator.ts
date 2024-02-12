
import P5 from 'p5';
import {Clock} from "../Transmitters/Clock.ts";
import {Switcher} from "../Switchs/Switcher.ts";
import {EventManager} from "../EventManager.ts";
import {listen} from "../Listeners/Decorators/listen.ts";

const clock = Clock.make().startListening();

Switcher.for(clock).switch(true);

let position = {x:window.innerWidth / 2 , y: 0};

class Game {

    public static instance?: Game;
    private p5: P5;

    private constructor() {
        this.p5 = new P5((sk: P5)  => {
            sk.setup = () => this.setup();
            sk.draw = () => this.draw(sk);
        });

    }

    setup()
    {
        this.p5.createCanvas(500,500);
        this.p5.background(40);
        this.p5.stroke(200);
        this.p5.strokeWeight(3);
        this.p5.stroke('red')
    }

    public static getInstance()
    {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    }

    private draw(skech: P5) {
        skech.background(40);
        EventManager.send('tick', skech);
    }

    @listen('tick')
    fall(skech: {data: P5}){

        skech.data.point(position.x, position.y)

        position.y += 5
    }

    @listen('tick')
    invert(){

        if (position.y >= 500) position.y = 0;

    }
}

const game = Game.getInstance();
game.setup();
