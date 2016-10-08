/**
 * Defines the raw OpenGL objects that we'll operate on
 */
namespace GLObjects {
    export class Mesh {
        public readonly vbo : WebGLBuffer;
        public readonly indexBuffer : WebGLBuffer;

        constructor(gl : WebGLRenderingContext) {
            let vbo = gl.createBuffer();
            if(vbo != null) {
                this.vbo = vbo;
            } else {
                throw new Error("Cannot create mesh object");
            }

            let indexBuffer = gl.createBuffer();
            if(indexBuffer != null) {
                this.indexBuffer = indexBuffer;
            } else {
                throw new Error("Cannot create mesh object");
            }
        }
    }

    export class FullscreenQuad extends Mesh {
        constructor(gl : WebGLRenderingContext) {
            super(gl);

            let verts = new Float32Array([
                0, 0, 1,
                0, 1, 1,
                1, 0, 1,
                1, 1, 1
                ]);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
            gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

            let indices = new Uint16Array([
                0, 1, 3,    0, 3, 2
            ]);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        }
    }

    /**
     * A collection of meshes drawn with the same shader
     */
    export class RenderPass {
        meshes : [Mesh];
    }
}
