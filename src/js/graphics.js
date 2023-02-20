/* ramapo-utils.js (c) 2023 Sourav Dutta
   Report any bug at sdutta1@ramapo.edu and sourav@siu.edu
   Bind shaders and buffer objects
   https://github.com/souravduttaIT/graphics/blob/main/WebGL/ramapographics-utils.js
*/ 

function shaderBufferBinder(gl, vertices, vshader, fshader){
		vertex_buffer = bufferObject(gl, vertices);
		shaderProgram = shaders(gl, vshader, fshader);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
		var coord = gl.createBuffer(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);	
		
		return shaderProgram;
}

function bufferObject(gl, vertices){
		// Create an empty buffer object to store the vertex buffer
         var vertex_buffer = gl.createBuffer();

         //Bind appropriate array buffer to it
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

         // Pass the vertex data to the buffer
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

         // Unbind the buffer
         gl.bindBuffer(gl.ARRAY_BUFFER, null);
		 
	return vertex_buffer;
}

function shaders(gl, vshader, fshader){
	var shaderProgram = createProgram(gl, vshader, fshader);
	if (!shaderProgram) {
		console.log('Failed to create program');
		return;
  }

	gl.useProgram(shaderProgram);
	gl.shaderProgram = shaderProgram;

  return shaderProgram;
}

function createProgram(gl, vshader, fshader) {
  // Create shader object
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  // Create a program object
  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    console.log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  return program;
}

function loadShader(gl, type, source) {
  // Create shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    console.log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}