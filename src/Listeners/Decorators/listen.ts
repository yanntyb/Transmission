import {Transmitter} from "../../Transmitters/Transmitter.ts";
import {EventManager} from "../../EventManager.ts";

export const listen = (...transmitters: (Transmitter<any>|string)[]) => {
    return function (
        target: Object,
        _key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        let original = descriptor.value;

        if (isString(transmitters)) {
            EventManager.listen(transmitters, original.bind(target));
        }

        if (isTransmitter(transmitters)) {
            EventManager.listenToTransmitter(original.bind(target), ...transmitters);
        }


    };
}

function isString(transmitter: (Transmitter<any>|string)[]): transmitter is string[]
{
    return typeof transmitter[0] === 'string';
}

function isTransmitter(transmitter: (Transmitter<any>|string)[]): transmitter is Transmitter<any>[]
{
    return typeof transmitter[0] !== 'string';
}
