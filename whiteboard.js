let isDuster = false;
let ctx;
const canvas = document.querySelector('canvas');
const duster = document.querySelector('.dusterBtn');
const penColor = document.querySelector('#penColor');
const whiteboard = document.querySelector('.myCanvas');
const backgroundColor = 'white';
const undoBtn = document.querySelector('.undoBoard');
const redoBtn = document.querySelector('.redoBoard');
const strokeLength = document.querySelector('#strokeLength');
// Whiteboard 
const history = []

// color
document.querySelector('#blackColor').addEventListener('click', () => {
    penColor.value = '#000000';
})

document.querySelector('#blueColor').addEventListener('click', () => {
    penColor.value = '#0000FF';
})


document.querySelector('#redColor').addEventListener('click', () => {
    penColor.value = '#ff0000';
})

document.querySelector('#greenColor').addEventListener('click', () => {
    penColor.value = '#00FF00';
})

document.querySelector('#yellowColor').addEventListener('click', () => {
    penColor.value = '#FFFF00';
})

document.querySelector('#brownColor').addEventListener('click', () => {
    penColor.value = '#964B00';
})

document.querySelector('#orangeColor').addEventListener('click', () => {
    penColor.value = '#FF4800';
})
//color

whiteboard.style.backgroundColor = backgroundColor;

duster.addEventListener('click', e => {
    isDuster = (isDuster) ? false : true;
    document.body.style.cursor = (isDuster) ? 'url(duster.png), auto' : 'url(marker.png),auto'
    document.querySelector('.pointer').innerHTML = (isDuster) ? '<i class="fas fa-pen" ></i> ' : '<i class="fas fa-eraser"></i> '
    document.querySelector('.pointer').title = (isDuster) ? 'Pencil' : 'Duster'
})
if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    let canvasX, canvasY;
    let isPressed = false;

    ctx.beginPath();
    ctx.rect(0, 0, 1100, 500);
    ctx.fillStyle = 'white';

    ctx.fill();

    history.push(ctx.getImageData(0, 0, 1100, 500).data)

    canvas.addEventListener('mousedown', e => {
        isPressed = true;
        ctx.beginPath();

        canvasX = e.pageX - canvas.offsetLeft - 2;
        canvasY = e.pageY - canvas.offsetTop - 2;

        ctx.moveTo(canvasX, canvasY);
    })

    canvas.addEventListener('mousemove', e => {
        if (isPressed) {

            canvasX = e.pageX - canvas.offsetLeft - 2;
            canvasY = e.pageY - canvas.offsetTop - 2;
            ctx.lineTo(canvasX, canvasY);

            if (isDuster) {
                ctx.lineWidth = 20;
                ctx.strokeStyle = backgroundColor;//white
            } else {
                ctx.lineWidth = strokeLength.value;
                ctx.strokeStyle = penColor.value;  //default color value
            }

            ctx.stroke();
        }
    })
    canvas.addEventListener('mouseup', e => {
        isPressed = false;
        history.push(ctx.getImageData(0, 0, 1100, 500).data)
        previous += 1
        ctx.closePath();
    })

}

function clearCanvas() {
    ctx.beginPath()
    ctx.rect(0, 0, 1100, 500)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
}


function getHistory() {
    return history.length
}

//undo button
let previous = 0
undoBtn.addEventListener('click', e => {
    previous -= 1;
    next = true;
    let previousImageData = new ImageData(history[previous], 1100, 500)
    ctx.putImageData(previousImageData, 0, 0);
})

//redo button
let next = undefined
redoBtn.addEventListener('click', e => {
    if (next) {
        next = previous + 1;

        let previousImageData = new ImageData(history[next], 1100, 500);
        //console.log(history[next]);
        ctx.putImageData(previousImageData, 0, 0);
    } else {
        alert('Nothing to redo')
    }
})

