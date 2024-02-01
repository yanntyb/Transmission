import {PositionType} from "./Transmitters/MouseTransmitter/MoveTransmitter.ts";

export class CanvasManager {

    public static instance?: CanvasManager;

    public canvas: CanvasRenderingContext2D|null = null;


    public static getInstance()
    {
        return CanvasManager.instance = CanvasManager.instance ? CanvasManager.instance : new CanvasManager().init();
    }

    private init()
    {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        document.body.appendChild(canvas);
        canvas.width = 500;
        canvas.height = 500;
        this.canvas = canvas.getContext('2d')
        this.canvas?.fillRect(0,0, 1000, 1000);
        return this;
    }

    public placePixelAt(position: PositionType): void
    {
        if (!this.canvas) return;
        this.canvas.fillStyle = 'red'

        requestAnimationFrame(() => {
            this.canvas?.fillRect(position.x, position.y, 3, 3);
        })
    }

    public clear() {
        this.canvas?.clearRect(0,0, 1000, 1000);
    }

}