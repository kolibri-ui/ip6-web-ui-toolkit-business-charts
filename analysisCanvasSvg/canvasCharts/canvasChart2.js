import { dom } from '../../src/Kolibri/docs/src/kolibri/util/dom.js';

//Tutorial from https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561

const myCanvas = document.getElementById("myCanvas");
myCanvas.width = 437;
myCanvas.height = 238;

let ctx;
ctx = myCanvas.getContext("2d");

//helper functions
function drawLine(ctx, startX, startY, endX, endY, color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color){
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}
/*

//Bar Chart Data Model
const data = {
    "Classical Music": 16,
    "Alternative Rock": 12,
    "Pop": 18,
    "Jazz": 32,
}
*/

//Bar Chart Class Component
class BarChart {
    constructor(options) {
        this.options      = options;
        this.canvas       = options.canvas;
        this.ctx          = this.canvas.getContext("2d");
        this.colors       = options.colors;
        this.titleOptions = options.titleOptions;
        this.maxValue     = Math.max(...Object.values(this.options.data));
    }
    
    drawGridLines() {
        const canvasActualHeight = this.canvas.height - this.options.padding * 2;
        const canvasActualWidth  = this.canvas.width - this.options.padding * 2;
        
        let   gridValue    = 0;
        
        while (gridValue <= this.maxValue) {
            const gridY = canvasActualHeight * (1 - gridValue / this.maxValue) + this.options.padding;
            drawLine(
                this.ctx, 
                0, 
                gridY, 
                this.canvas.width, 
                gridY, 
                this.options.gridColor
            );
            
            drawLine(
                this.ctx,
                15,
                this.options.padding/2,
                15,
                gridY + this.options.padding/2,
                this.options.gridColor
            );
            
            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.textBaseline = "bottom";
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue.toString(), 0, gridY - 2);
            this.ctx.restore();
            
            //gridValue += this.options.gridScale;
            gridValue += this.options.gridStep;
        }
    }
    
    drawBars() {
        const canvasActualHeight = this.canvas.height - this.options.padding * 2;
        const canvasActualWidth = this.canvas.width - this.options.padding * 2;
        
        let barIndex       = 0;
        const numberOfBars = Object.keys(this.options.data).length;
        const barSize = canvasActualWidth / numberOfBars;

        const values = Object.values(this.options.data);
        
        for (const val of values){
            const barHeight = Math.round((canvasActualHeight * val) / this.maxValue);
            console.log(barHeight);
            
            drawBar(
                this.ctx, 
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex % this.colors.length]
                );
            barIndex++;
        }
    }
    
    drawLabel() {
        this.ctx.save();
        this.ctx.textBaseline = "bottom";
        this.ctx.textAlign = this.titleOptions.align;
        this.ctx.fillStyle = this.titleOptions.fill;
        this.ctx.font = 
            `${this.titleOptions.font.weight} 
             ${this.titleOptions.font.size} 
             ${this.titleOptions.font.family}`;

        let xPos = this.canvas.width / 2;

        if (this.titleOptions.align == "left") {
            xPos = 10;
        }
        if (this.titleOptions.align == "right") {
            xPos = this.canvas.width - 10;
        }
        
        this.ctx.fillText(this.options.seriesName, xPos, this.canvas.height);
        this.ctx.restore();
    }
    
    drawLegend() {
        let pIndex   = 0;

        let [legend, input] = dom('<legend for="myCanvas" <input type="text" id="myCanvas" value="myValue">');
        
        legend = document.querySelector("legend[for='myCanvas']");
        
        //legend = document.querySelector("legend[for='myCanvas']");
        const ul = document.createElement("ul");
        legend.append(ul);
        
        for (const ctg of Object.keys(this.options.data)) {
            const li           = document.createElement("li");
            li.style.listStyle = "none";
            li.style.borderLeft = "20px solid " + this.colors[pIndex % this.colors.length];
            li.style.padding = "5px";
            li.textContent = ctg;
            ul.append(li);
            pIndex++;
        }
    }
    
    draw() {
        this.drawGridLines();
        this.drawBars();
        this.drawLabel();
        this.drawLegend();
    }
}

//Use of Bar Chart Component
const myBarChart = new BarChart({
    canvas: myCanvas,
    seriesName: "Vinyl records",
    padding: 60,
    //gridScale: 5,
    gridStep: 5,
    gridColor: "black",
    data: {
        "Classical Music": 16,
        "Alternative Rock": 12,
        "Pop": 18,
        "Jazz": 32
    },
    colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
    titleOptions: {
        align: "center",
        fill: "black",
        font: {
            weight: "bold",
            size: "18px"
        }
    }
});

myBarChart.draw();