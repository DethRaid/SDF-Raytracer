interface ScreenSize {
    readonly width: number;
    readonly height: number;
}

class Engine {
    private static instance : Engine;

    screenSize: ScreenSize;

    public static init(canvas : HTMLCanvasElement) : void {
        Engine.instance = new Engine(canvas);
    }

    /**
     * Initializes all the parts of the engine
     */
    private constructor(canvas: HTMLCanvasElement) {
        this.screenSize = {width: canvas.width, height: canvas.height};

        var gl = this.getGL(canvas);

        gl.viewport(0, 0, this.screenSize.width, this.screenSize.height);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
    }

    private getGL(canvas : HTMLCanvasElement): WebGLRenderingContext {
        var gl = canvas.getContext("experimental-webgl", {});

        if(gl == null) {
            alert("Could not acquire a WebGL context");
            throw new Error("Could not create the WebGL context");
        }

        return gl;
    }
}

function engineStart() {
    Engine.init(<HTMLCanvasElement> document.getElementById("engine-canvas"));

    
}