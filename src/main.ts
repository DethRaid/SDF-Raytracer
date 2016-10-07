class Engine {
    /**
     * Initializes all the parts of the engine
     */
    public static start(): number {
        var canvas = <HTMLCanvasElement> document.createElement("canvas");
        document.body.appendChild(canvas);

        var gl = canvas.getContext("experimental-webgl", {});

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        return 0;
    }
}

function engineStart() {
    Engine.start();
}