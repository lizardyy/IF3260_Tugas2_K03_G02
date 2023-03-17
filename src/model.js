var r = 0.2
var g = 0.1
var b = 0.4
var model = []
var indices = []


var cubeVertices = 
    [
        // top
        -1, 1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, 1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, 1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, 1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,

        // bottom
        -1, -1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, -1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, -1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, -1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,

        // left
        -1, 1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, -1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, -1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, 1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,

        // right
        1, 1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, -1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, -1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, 1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,

        // front
        1, 1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, -1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, -1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, 1, 1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,

        // back
        1, 1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        1, -1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, -1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,
        -1, 1, -1, (0.3+r)/1.4, (0.3+g)/1.4, (0.3+b)/1.4,

        // inner top
        -0.75, 0.75, -0.75, r/1.3, g/1.3, b/1.3,
        -0.75, 0.75, 0.75, r/1.3, g/1.3, b/1.3,
        0.75, 0.75, 0.75, r/1.3, g/1.3, b/1.3,
        0.75, 0.75, -0.75, r/1.3, g/1.3, b/1.3,

        // inner bottom
        -0.75, -0.75, -0.75, r/1.3, g/1.3, b/1.3,
        -0.75, -0.75, 0.75, r/1.3, g/1.3, b/1.3,
        0.75, -0.75, 0.75, r/1.3, g/1.3, b/1.3,
        0.75, -0.75, -0.75, r/1.3, g/1.3, b/1.3,

        // inner left
        -0.75, 0.75, 0.75, r/1.3, g/1.3, b/1.3,
        -0.75, -0.75, 0.75, r/1.3, g/1.3, b/1.3,
        -0.75, -0.75, -0.75, r/1.3,g/1.3,b/1.3,
        -0.75, 0.75, -0.75, r/1.3, g/1.3, b/1.3,

        // inner right
        0.75, 0.75, 0.75, r/1.3, g/1.3, b/1.3,
        0.75, -0.75, 0.75, r/1.3, g/1.3, b/1.3,
        0.75, -0.75, -0.75, r/1.3,g/1.3,b/1.3,
        0.75, 0.75, -0.75, r/1.3, g/1.3, b/1.3,

        // inner front
        0.75, 0.75, 0.75, r/1.3, g/1.3, b/1.3,
        0.75, -0.75, 0.75, r/1.3, g/1.3, b/1.3,
        -0.75, -0.75, 0.75, r/1.3, g/1.3, b/1.3,
        -0.75, 0.75, 0.75, r/1.3, g/1.3, b/1.3,

        // inner back
        0.75, 0.75, -0.75, r/1.3, g/1.3, b/1.3,
        0.75, -0.75, -0.75, r/1.3, g/1.3, b/1.3,
        -0.75, -0.75, -0.75, r/1.3, g/1.3, b/1.3,
        -0.75, 0.75, -0.75, r/1.3, g/1.3, b/1.3,

        // face top
        -0.75, 1.00, -0.75, r, g, b,
        -0.75, 1.00, 0.75, r, g, b,
        0.75, 1.00, 0.75, r, g, b,
        0.75, 1.00, -0.75, r, g, b,

        // face bottom
        -0.75, -1.00, -0.75, r, g, b,
        -0.75, -1.00, 0.75, r, g, b,
        0.75, -1.00, 0.75, r, g, b,
        0.75, -1.00, -0.75, r, g, b,

        // face left
        -1.00, 0.75, 0.75, r, g, b,
        -1.00, -0.75, 0.75, r, g, b,
        -1.00, -0.75, -0.75, r,g,b,
        -1.00, 0.75, -0.75, r, g, b,

        // face right
        1.00, 0.75, 0.75, r, g, b,
        1.00, -0.75, 0.75, r, g, b,
        1.00, -0.75, -0.75, r,g,b,
        1.00, 0.75, -0.75, r, g, b,

        // face front
        0.75, 0.75, 1.00, r, g, b,
        0.75, -0.75, 1.00, r, g, b,
        -0.75, -0.75, 1.00, r, g, b,
        -0.75, 0.75, 1.00, r, g, b,

        // face back
        0.75, 0.75, -1.00, r, g, b,
        0.75, -0.75, -1.00, r, g, b,
        -0.75, -0.75, -1.00, r, g, b,
        -0.75, 0.75, -1.00, r, g, b,

    ]

var cubeIndices = []
for(var i=0; i<6; i++){
    for(var j=0; j<4; j++){
        var k = (j+1)%4;
        cubeIndices.push(4*i+j);
        cubeIndices.push(4*i+k);
        cubeIndices.push(4*i+48+j);
            
        cubeIndices.push(4*i+k);
        cubeIndices.push(4*i+48+j);
        cubeIndices.push(4*i+48+k);

        cubeIndices.push(4*i+24+j);
        cubeIndices.push(4*i+24+k);
        cubeIndices.push(4*i+48+j);

        cubeIndices.push(4*i+24+k);
        cubeIndices.push(4*i+48+j);
        cubeIndices.push(4*i+48+k);
    }
}

model.push(cubeVertices);
indices.push(cubeIndices);

var triangularPrismVertices =
    [
        // top
        -1, 1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, 1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, 1, 1, (0.3 + r) / 1.4, (0.3 + g) / 1.4, (0.3 + b) / 1.4,

        // bottom
        -1, 1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, 1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, 1, -1, (0.3 + r) / 1.4, (0.3 + g) / 1.4, (0.3 + b) / 1.4,

        // left
        -1, 1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, 1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, 1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        -1, 1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,

        // right
        1, 1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, 1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,

        // front
        -1, 1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,
        -1, 1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,


        // inner top
        -0.75, 0.75, 0.75, r / 1.3, g / 1.3, b / 1.3,
        0.75, 0.75, 0.75, r / 1.3, g / 1.3, b / 1.3,
        0.75, -0.75, 0.75, r / 1.3, g / 1.3, b / 1.3,
        0.75, 0.75, 0.75, r / 1.3, g / 1.3, b / 1.3,

        // inner bottom
        -0.75, 0.75, -0.75, r / 1.3, g / 1.3, b / 1.3,
        0.75, 0.75, -0.75, r / 1.3, g / 1.3, b / 1.3,
        0.75, -0.75, -0.75, r / 1.3, g / 1.3, b / 1.3,
        0.75, 0.75, -0.75, r / 1.3, g / 1.3, b / 1.3,
        
        // inner left
        -0.75, 0.75, 0.75,  r/1.3,g/1.3,b/1.3,
        0.75, 0.75, 0.75,  r/1.3,g/1.3,b/1.3,
        0.75, 0.75, -0.75,  r/1.3,g/1.3,b/1.3,
        -0.75, 0.75, -0.75,  r/1.3,g/1.3,b/1.3,

        // inner right
        0.75, 0.75, 0.75,  r/1.3,g/1.3,b/1.3,
        0.75, -0.75, 0.75,  r/1.3,g/1.3,b/1.3,
        0.75, -0.75, -0.75,  r/1.3,g/1.3,b/1.3,
        0.75, 0.75, -0.75,  r/1.3,g/1.3,b/1.3,

        // inner front
        -0.75, 0.75, 0.75, r / 1.3, g / 1.3, b / 1.3,
        0.75, -0.75, 0.75, r / 1.3, g / 1.3, b / 1.3,
        0.75, -0.75, -0.75, r / 1.3, g / 1.3, b / 1.3,
        -0.75, 0.75, -0.75, r / 1.3, g / 1.3, b / 1.3,

        // face top
        -0.75, 0.75, 1, r, g, b,
        0.75, 0.75, 1, r, g, b,
        0.75, -0.75, 1, r, g, b,
        0.75, 0.75, 1, r, g, b,

        // face bottom
        -0.75, 0.75, -1, r,g,b,
        0.75, 0.75, -1, r,g,b,
        0.75, -0.75, -1, r,g,b,
        0.75, 0.75, -1, r,g,b,

        // face left
        -0.75, 1, 0.75,r,g,b,
        0.75, 1, 0.75,r,g,b,
        0.75, 1, -0.75,r,g,b,
        -0.75, 1, -0.75,r,g,b,

        // face right
        1, 0.75, 0.75, r,g,b,
        1, -0.75, 0.75, r,g,b,
        1, -0.75, -0.75, r,g,b,
        1, 0.75, -0.75, r,g,b,

        // face front
        -0.75, 0.75, 1, r , g , b ,
        0.75, -0.75, 1, r , g , b ,
        0.75, -0.75, -1, r , g , b ,
        -0.75, 0.75, -1, r , g , b ,

        // other
        0.75, -0.3964466094, 1, (0.3 + r) / 1.4, (0.3 + g) / 1.4, (0.3 + b) / 1.4,
        - 0.3964466094, 0.75, 1, (0.3 + r) / 1.4, (0.3 + g) / 1.4, (0.3 + b) / 1.4,
        0.75, -0.3964466094, 0.75, r / 1.3, g / 1.3, b / 1.3,
        -0.3964466094, 0.75, 0.75, r / 1.3, g / 1.3, b / 1.3,

        0.75, -0.3964466094, -1,  (0.3 + r) / 1.4, (0.3 + g) / 1.4, (0.3 + b) / 1.4,
        -0.3964466094, 0.75, -1,  (0.3 + r) / 1.4, (0.3 + g) / 1.4, (0.3 + b) / 1.4,
        0.75, -0.3964466094, -0.75, r / 1.3, g / 1.3, b / 1.3,
        - 0.3964466094, 0.75, -0.75, r / 1.3, g / 1.3, b / 1.3
    ]


var triangularPrismIndices = []
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
        var k = (j + 1) % 4;
        triangularPrismIndices.push(4 * i + j);
        triangularPrismIndices.push(4 * i + k);
        triangularPrismIndices.push(4 * i + 40 + j);

        triangularPrismIndices.push(4 * i + k);
        triangularPrismIndices.push(4 * i + 40 + j);
        triangularPrismIndices.push(4 * i + 40 + k);

        triangularPrismIndices.push(4 * i + 20 + j);
        triangularPrismIndices.push(4 * i + 20 + k);
        triangularPrismIndices.push(4 * i + 40 + j);

        triangularPrismIndices.push(4 * i + 20 + k);
        triangularPrismIndices.push(4 * i + 40 + j);
        triangularPrismIndices.push(4 * i + 40 + k);
    }
    
}

// other
triangularPrismIndices.push(20, 22, 62)
triangularPrismIndices.push(40, 42, 60)
triangularPrismIndices.push(60, 40, 61)
triangularPrismIndices.push(62, 20, 63)
triangularPrismIndices.push(60, 61, 62)
triangularPrismIndices.push(62, 61, 63)

triangularPrismIndices.push(24, 26, 66)
triangularPrismIndices.push(66, 24, 67)
triangularPrismIndices.push(44, 46, 64)
triangularPrismIndices.push(64, 44, 65)
triangularPrismIndices.push(64, 65, 66)
triangularPrismIndices.push(66, 65, 67)

model.push(triangularPrismVertices);
indices.push(triangularPrismIndices);

var pyramidVertices = 
    [
        // bottom
        -1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, // 0
        -1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, 
        1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,  
        1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,  

        // left
        -1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, // 4
        -1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,  
        0, 1, 0, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,  

        // right
        1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, // 7
        1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, 
        0, 1, 0, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, 

        // front
        1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, // 10
        -1, -1, 1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, 
        0, 1, 0, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,  

        // back
        -1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, // 13
        1, -1, -1, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4, 
        0, 1, 0, (0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4,

        // inner bottom
        -0.75, -0.8 , -0.75, r/1.3,g/1.3,b/1.3, // 16
        -0.75, -0.8 , 0.75, r/1.3,g/1.3,b/1.3, 
        0.75, -0.8 , 0.75, r/1.3,g/1.3,b/1.3, 
        0.75, -0.8 , -0.75, r/1.3,g/1.3,b/1.3, 

        // inner left
        -0.75, -0.8 , 0.75, r/1.3,g/1.3,b/1.3, // 20
        -0.75, -0.8 , -0.75, r/1.3,g/1.3,b/1.3, 
        0, 0.6, 0, r/1.3,g/1.3,b/1.3,

        // inner right
        0.75, -0.8 , -0.75, r/1.3,g/1.3,b/1.3, // 23
        0.75, -0.8 , 0.75, r/1.3,g/1.3,b/1.3, 
        0, 0.6, 0, r/1.3,g/1.3,b/1.3, 

        // inner front
        0.75, -0.8 , 0.75, r/1.3,g/1.3,b/1.3, // 26
        -0.75, -0.8 , 0.75, r/1.3,g/1.3,b/1.3, 
        0, 0.6, 0, r/1.3,g/1.3,b/1.3, 

        // inner back
        -0.75, -0.8 , -0.75, r/1.3,g/1.3,b/1.3, // 29
        0.75, -0.8 , -0.75, r/1.3,g/1.3,b/1.3,
        0, 0.6, 0, r/1.3,g/1.3,b/1.3,

        // face bottom
        -0.75, -1, -0.75, r,g,b, // 32
        -0.75, -1, 0.75, r,g,b, 
        0.75, -1, 0.75, r,g,b,
        0.75, -1, -0.75, r,g,b,

        // face left
        -0.9, -0.8, -0.65, r,g,b, // 36
        -0.9, -0.8, 0.65, r,g,b,
        -0.2, 0.6, 0, r,g,b,

        // face right
        0.9, -0.8, -0.65, r,g,b, // 39
        0.9, -0.8, 0.65, r,g,b,
        0.2, 0.6, 0, r,g,b,

        // face front
        0.65, -0.8, 0.9, r,g,b, // 42
        -0.65, -0.8, 0.9, r,g,b,
        0, 0.6, 0.2, r,g,b,

        // face back
        0.65, -0.8, -0.9, r,g,b, // 45
        -0.65, -0.8, -0.9, r,g,b,
        0, 0.6, -0.2, r,g,b,
    ]

var pyramidIndices = [
    // face front
    6, 11, 44,
    11, 43, 44,
    6, 10, 44,
    10, 42, 44,

    11, 43, 42,
    10, 42, 43,
    10, 11, 42,

    // face back
    6, 14, 47,
    14, 45, 47,
    6, 13, 47,
    13, 46, 47,

    13, 14, 45,
    13, 45, 46,
    14, 46, 45,

    // face right
    6, 10, 41,
    10, 40,41,
    6, 14, 41,
    14, 39, 41,

    10, 14, 39,
    10, 39, 40,
    14, 40, 39,

    // face left
    6, 13, 38,
    13, 36, 38,
    6, 11, 38,
    11, 37, 38,

    11, 13, 36,
    11, 36, 37,
    13, 37, 36,

    // inner front
    18, 42, 43,
    17, 42, 43,
    17, 18, 42,

    18, 42, 44,
    17, 43, 44,

    // inner back
    19, 45, 46,
    16, 45, 46,
    16, 19, 45,

    19, 45, 47,
    16, 46, 47,

    // inner right
    18, 39, 40,
    19, 39, 40,
    18, 19, 39,

    18, 40, 41,
    19, 39, 41,

    // inner left
    16, 36, 37,
    17, 36, 37,
    16, 17, 36,

    16, 36, 38,
    17, 37, 38,

    // inner
    16, 38, 47,
    17, 38, 44,
    18, 41, 44,
    19, 41, 47,
]

// bottom
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
        if (i  == 0) {
            var k = (j + 1) % 4;
            pyramidIndices.push(i * 3 + j);
            pyramidIndices.push(i * 3 + k);
            pyramidIndices.push(i * 3 + 32 + j);

            pyramidIndices.push(i * 3 + k);
            pyramidIndices.push(i * 3 + 32 + j);
            pyramidIndices.push(i * 3 + 32 + k);

            pyramidIndices.push(i * 3 + 16 + j);
            pyramidIndices.push(i * 3 + 16 + k);
            pyramidIndices.push(i * 3 + 32 + j);

            pyramidIndices.push(i * 3 + 16 + k);
            pyramidIndices.push(i * 3 + 32 + j);
            pyramidIndices.push(i * 3 + 32 + k);
        }
        else {
            
        }
    }
}

model.push(pyramidVertices);
indices.push(pyramidIndices);