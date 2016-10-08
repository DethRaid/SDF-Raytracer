/// <reference path="GLObjects.ts" />
/// <reference path="tsm/TSM/tsm-0.7.d.ts" />

interface ScreenSize {
    readonly width: number;
    readonly height: number;
}

class Engine {
    private static instance : Engine;

    private screenSize : ScreenSize;
    private quad : GLObjects.FullscreenQuad;
    private camera : Camera;
    private frustramCorners : TSM.mat4;

    public static init(canvas : HTMLCanvasElement) : void {
        Engine.instance = new Engine(canvas);
    }

    /**
     * Renders a single frame
     */
    public renderFrame() {
        // Build a matrix to hold the camera's direction vectors

        let fovWHalf = this.camera.fov * 0.5;
        let tan_fov = Math.tan(fovWHalf * Math.PI * 2 / 180);

        let topRightMultiplicand : number = tan_fov * this.camera.aspectRatio;
        let topRight = TSM.vec3.right.multiply(new TSM.vec3([topRightMultiplicand, topRightMultiplicand, topRightMultiplicand]));
    }

    /**
     * Initializes all the parts of the engine
     */
    private constructor(canvas : HTMLCanvasElement) {
        this.screenSize = {width: canvas.width, height: canvas.height};

        var gl = this.getGL(canvas);

        this.quad = new GLObjects.FullscreenQuad(gl);

        gl.viewport(0, 0, this.screenSize.width, this.screenSize.height);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        this.camera = {fov: 60, aspectRatio: 1};
    }

    /**
     * Acquires the WebGL context from the canvas, throwing an error if there's a problem
     */
    private getGL(canvas : HTMLCanvasElement) : WebGLRenderingContext {
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