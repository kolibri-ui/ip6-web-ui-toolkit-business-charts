const values = [170, 25, 72, 120, 250, 87, 100, 42, 0, 30, 142, 320, 380, 10, 50];

const canvas = document.getElementById('canvasChart');
const context = canvas.getContext('2d');

const stroke = 2;
const radius = 4;

const width = canvas.width;
const height = canvas.height;

// NOTE: draw background

context.translate(0,height);
context.scale(1,-1);
context.fillStyle = 'rgba(0,0,0,0.1)';
context.fillRect(0,0,width,height);

// NOTE: calculate x and y deltas based on canvas size and maximum value

const w = canvas.width - 2 * radius;
const h = canvas.height - 2 * radius;
const max = Math.max.apply(null, values);
const dx = Math.round(w / (values.length - 1));
const dy = h / max;

// NOTE: draw lines

for(let f=1; f < values.length; f++)
{
    const i = f - 1;
    const y = Math.round(values[f]*dy) + radius;
    //var p = Math.round(values[i]*dy);
    //var x = Math.round(i*dx);
    const p = Math.round(values[i]*dy) + radius;
    const x = Math.round(i * dx) + radius;
    context.beginPath();
    context.strokeStyle = '#f00';
    context.strokeStyle = 'rgba(255,0,0,0.25)';
    context.moveTo(x+dx,y);
    context.lineTo(x,p);
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.stroke();
}

// NOTE: draw bullets

for(let f=0; f<=values.length; f++)
{
    const i = f-1;
    const p = Math.round(values[i]*dy)+radius;
    const x = Math.round(i*dx)+radius;

    context.beginPath();
    context.strokeStyle = '#ff0';
    context.strokeStyle = 'rgba(255,255,0,0.5)';
    context.lineCap = 'round';
    context.lineWidth = radius*2;
    context.moveTo(x,p);
    context.lineTo(x,p);
    context.stroke();
}
