import './style.css';

import { Note, NoteMessageEvent, WebMidi} from "webmidi";
import {EventManager} from "./EventManager.ts";
import {listen} from "./Listeners/Decorators/listen.ts";
import {Switcher} from "./Switchs/Switcher.ts";
import {Clock} from "./Transmitters/Clock.ts";


WebMidi
    .enable()
    .then(() => {
        EventManager.send('midi-enabled', true)
    })
    .catch();

enum Channels {
    BD = 1,
    SD = 2,
    RS = 3,
    CP = 4,
    BT = 5,
    LT = 6,
    MT = 7,
    HT = 8,
    CH = 9,
    OH = 10,
    CY = 11,
    CB = 12,
}

const getChannel = (index: number) => Channels[Channels[index]];

const noteOn = (chanel: Channels) => chanel + ':noteon';
const noteOff = (chanel: Channels) => chanel + ':noteoff';


const modifyStyle = (elem: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
    Object.assign(elem.style,style);
}

const createStep = (container: HTMLElement) => {
    const step = document.createElement('div');
    container.appendChild(step);
    modifyStyle(step, {
        width: '30px',
        height: '30px',
        border: '1px solid white',
    })
    return step;
}



modifyStyle(document.body, {
    backgroundColor: 'black',
    color: 'white'
})

class Rytm {


    @listen('midi-enabled')
    setup()
    {
        if (WebMidi.inputs.length < 1) return;

        const rytm =  WebMidi.getInputByName("Elektron Analog Rytm MKII");

        const inputChannels  =  rytm?.channels ?? [];

        inputChannels.forEach((chanel) => {
            chanel.addListener('noteon', (note) => {
                EventManager.send(getChannel(chanel.number) + ':noteon', note);
            })
            chanel.addListener('noteoff', (note) => {
                EventManager.send(getChannel(chanel.number) + ':noteoff', note);
            })
        })

        const outputChannels  =  WebMidi.getOutputByName(rytm.name).channels ?? [];

        outputChannels.forEach((chanel) => {
            EventManager.listen(getChannel(chanel.number) + ':send.note', (note) => {
                chanel.playNote(new Note("C1"));
                EventManager.send(getChannel(chanel.number) + ':noteon', note);

                window.setTimeout(() => {
                    EventManager.send(getChannel(chanel.number) + ':noteoff', true);
                }, 10)

            })
        })



    }

}

let eveyMs = 100;
const clockTimer = () => eveyMs;


const clock = Switcher.for(
    Clock.make({getTimeCallback: clockTimer}).startListening()
).switch(true).switchables[0];


const createSequence = (
    lenght: number,
    stepCallback: (stepElement: HTMLElement, index: number) => void,
    channel?: number,

) => {
    console.log(channel)
    const line = document.createElement('div');
    line.dataset.channel = channel ? getChannel(channel) : '';
    document.body.appendChild(line);
    Array.from({length: lenght})
        .map(() => createStep(line))
        .map(stepCallback)
}

let currentStep = 0;

EventManager.listenToTransmitter(() => {
    currentStep += 1;
    if (currentStep > 16) currentStep = 0;


}, clock)

createSequence(16, (el, index) => {
    EventManager.listenToTransmitter(() => {
        if (currentStep !== index) {
            modifyStyle(el, {
                backgroundColor: 'black',
            })
            return;
        }
        modifyStyle(el, {
            backgroundColor: 'white',
        })
    }, clock)
});


createSequence(
    16,
    (el) => {
        el.addEventListener('click', () => {
            modifyStyle(el, {
                backgroundColor: el.style.backgroundColor === 'white' ? 'black' : 'white',
            })
        })
    },
    Channels.BD
);









