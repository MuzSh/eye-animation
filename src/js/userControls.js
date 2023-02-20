var gl; //graphics library
var canvas; //get the canvas
var theta = 0; //get the 
var thetaLoc;
var direction = true;
var speed = 0.01;
var vertices = [
        0.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
];
//=================Shaders======================
var VSHADER_SOURCE = `
    attribute vec4 vPosition;
    uniform float theta;
    void main(){
        float s = sin(theta);
        float c = cos(theta);
        gl_Position.x = -s*vPosition.y + c*vPosition.x;
        gl_Position.y = s*vPosition.x + c*vPosition.y;
        gl_Position.z = 1.0;
        gl_Position.w = 1.0;
        gl_PointSize = 3.0;
    }
    `;
    // set the color for Quadrant 1 - RED
var FSHADER_SOURCE = `
    void main(){
        gl_FragColor = vec4(1.0,1.0,1.0,1.0);
    }
    `;
function render(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    theta +=(direction? speed: -speed);
    // console.log(theta);
    // getting the updated theta in one dimensional direction
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.POINTS, 0, 2);
    // gl.drawArrays(gl.POINTS, 0, 1);
    // this method
    requestAnimationFrame(render);
    // console.log(theta)
    // console.log(vertices);
};
function main(){
    var canvas = document.getElementById("stars");
    gl = getWebGLContext(canvas);
    // bind vertices and store this program into a variable
    var program = shaderBufferBinder(gl, vertices, VSHADER_SOURCE, FSHADER_SOURCE);
    thetaLoc = gl.getUniformLocation(program, "theta");
    // initialize event handlers
    // document.getElementById("Direction").onclick =function(){
    //     direction = !direction;
    //     console.log(direction);
    // };

    document.getElementById("Controls").onclick =function(event){
        function updateInfo(){
            if (direction){
                document.getElementById('RotationInfo').innerHTML = "Rotating In Respect To Counter Clockwise Direction";
            }
            else
            {
                document.getElementById('RotationInfo').innerHTML = "Rotating In Respect To Clockwise Direction";
            };
            document.getElementById('SpeedInfo').innerHTML = "Current Speed: " +speed.toFixed(4);
        };
        switch(event.target.index){
            case 0: direction = !direction; 
                    updateInfo();
                    break;
            case 1: speed += 0.01;
                    updateInfo();
                    break;
            case 2: speed -= 0.01;
                    updateInfo();
                    break;
            case 3: speed =0.01;
                    updateInfo();
                    break;
            case 4: speed = (Math.random() * (1-100) + 1)/1000;
                document.getElementById('SpeedInfo').innerHTML = "Current Speed: " +speed.toFixed(4);
                break;  
        }   
    };

    document.getElementById("Slider").onchange = function(event){
        speed = event.target.value/1000;
        // console.log(speed)
    };

    // gl.clear(gl.COLOR_BUFFER_BIT);
    render();
    // gl.clearColor(1.0, 1.0, 1.0,1.0);
    // gl.clearColor(null);
    gl.clearColor(0.0, 0, 0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};