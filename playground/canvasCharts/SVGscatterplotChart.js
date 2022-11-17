/*
 * from Tutorial
 * https://observablehq.com/@mahog/d3-tutorial-pure-javascript-scatterplot
 * */

//use of chart with following configs
const width      = 600;
const height     = 400;
const padding    = 15;
const dimensionX = "Horsepower";
const dimensionY = "Miles_per_Gallon";

// GLOBAL CONFIGURATION ////////////////////////////////////////////////////////////////////////////
//svg configs
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const svg           = document.querySelector("svg");


//init data array
let dataset = [];

const domainX = [ 0, 1 ];
const domainY = [ 0, 1 ];
const rangeX  = [ padding, width - padding ];
const rangeY  = [ padding, height - padding ];

//for text in marks
const fontSize = 11;
const fontFamily = "sans-serif";

//ticks
const tickSize = 5;

// SCALES //////////////////////////////////////////////////////////////////////////////////////////
const scaleX  = value => {
    const scaledValue = (value - domainX[0]) / domainX[1];
    const pixelValue  = () => scaledValue * (rangeX[1] - rangeX[0]) + rangeX[0];
    return pixelValue();
};
const invertX = pixelValue => {
    const scaledPixelValue = (pixelValue - rangeX[0]) / rangeX[1];
    const value            = () => scaledPixelValue * (domainX[1] - domainX[0]) + domainX[0];
    return value();
};
const scaleY  = value => {
    const scaledValue = (value - domainY[0]) / domainY[1];
    const pixelValue  = () => scaledValue * (rangeY[1] - rangeY[0]) + rangeY[0];
    return pixelValue();
};
const invertY = pixelValue => {
    const scaledPixelValue = (pixelValue - rangeY[0]) / rangeY[1];
    const value            = () => scaledPixelValue * (domainY[1] - domainY[0]) + domainY[0];
    return value();
};

// AXES ////////////////////////////////////////////////////////////////////////////////////////////
const drawAxisGuide = (orientation, axisContainer) => {
    const guide = document.createElementNS(SVG_NAMESPACE, "line");
    guide.setAttribute("x1", rangeX[0]);
    guide.setAttribute("y1", rangeY[0]);
    guide.setAttribute("stroke", "black");

    if (orientation === "bottom") {
        guide.setAttribute("x2", rangeX[1]);
        guide.setAttribute("y2", rangeY[0]);
    }
    if (orientation === "right") {
        guide.setAttribute("x2", rangeX[0]);
        guide.setAttribute("y2", rangeY[1]);
    }
    axisContainer.appendChild(guide);
};

const drawAxisTicks = (orientation, axisContainer) => {
    const ticks = document.createElementNS(SVG_NAMESPACE, "g");
    ticks.classList.add("ticks");

    for (let i = 0; i < 10; i++) {
        const tick = document.createElementNS(SVG_NAMESPACE, "line");
        let tickPosition = 0;

        if (orientation === "bottom") {
            tickPosition = (rangeX[1] - rangeX[0]) / 10 * (i + 1) + rangeX[0];
            tick.setAttribute("x1", tickPosition);
            tick.setAttribute("x2", tickPosition);
            tick.setAttribute("y1", rangeY[0]);
            tick.setAttribute("y2", rangeY[0] + tickSize);
        }
        if (orientation === "right") {
            tickPosition = (rangeY[1] - rangeY[0]) / 10 * (i + 1) + rangeY[0];
            tick.setAttribute("x1", rangeX[0]);
            tick.setAttribute("x2", rangeX[0] + tickSize);
            tick.setAttribute("y1", tickPosition);
            tick.setAttribute("y2", tickPosition);
        }
        tick.setAttribute("stroke", "black");
        ticks.appendChild(tick);
    }
    axisContainer.appendChild(ticks);
}

const drawAxisLabels = (orientation, axisContainer) => {
    const lables = document.createElementNS(SVG_NAMESPACE, "g");
    lables.classList.add("labels");
    
    for (let i = 0; i < 10; i++) {
        const label = document.createElementNS(SVG_NAMESPACE, "text");
        let labelPosition = 0;
        
        if (orientation === "bottom") {
            labelPosition = (rangeX[1] - rangeX[0]) / 10 * (i + 1) + rangeX[0];
            label.setAttribute("x", labelPosition);
            label.setAttribute("y", rangeY[0]);
            label.setAttribute("text-anchor", "middle");
            label.setAttribute("font-size", fontSize);
            label.setAttribute("font-family", fontFamily);
            label.setAttribute("dy", tickSize + 10);
            label.innerHTML = "<" + parseInt(invertX(labelPosition));
        }
        if (orientation === "right") {
            labelPosition = (rangeY[1] - rangeY[0]) / 10 * (i + 1) + rangeY[0];
            label.setAttribute("x", rangeX[0]);
            label.setAttribute("y", labelPosition);
            label.setAttribute("font-size", fontSize);
            label.setAttribute("font-family", fontFamily);
            label.setAttribute("dominant-baseline", "middle");
            label.setAttribute("dx", tickSize + 5);
            label.innerHTML = "<" + parseInt(invertY(labelPosition));
        }
        
        lables.appendChild(label);
    }
    axisContainer.appendChild(lables);
}

const drawAxis = (orientation, axisContainer) => {
    axisContainer.classList.add("axis", orientation);
    
    drawAxisGuide(orientation, axisContainer);
    drawAxisTicks(orientation, axisContainer);
    drawAxisLabels(orientation, axisContainer);
};

const drawAxes = () => {
    const xAxis = document.createElementNS(SVG_NAMESPACE, "g");
    const yAxis = document.createElementNS(SVG_NAMESPACE, "g");

    drawAxis("bottom", xAxis);
    drawAxis("right", yAxis);

    svg.appendChild(xAxis);
    svg.appendChild(yAxis);
};

// MARKS  //////////////////////////////////////////////////////////////////////////////////////////
const drawCircleMark = (data, markContainer) => {
    const radius = 5;

    data.forEach(date => {
        const circleMark = document.createElementNS(SVG_NAMESPACE, "circle");
        circleMark.classList.add("mark");
        circleMark.setAttribute("cx", scaleX(date[dimensionX]));
        circleMark.setAttribute("cy", scaleY(date[dimensionY]));
        circleMark.setAttribute("r", radius);
        circleMark.setAttribute("fill", "steelblue");
        circleMark.setAttribute("fill-opacity", 0.73);
        markContainer.appendChild(circleMark);
    });
};

const drawTextMark = (data, markContainer) => {
    const spacing = 10;

    data.forEach(datum => {
        const textMark = document.createElementNS(SVG_NAMESPACE, "text");
        textMark.classList.add("mark");
        textMark.setAttribute("x", scaleX(datum[dimensionX]));
        textMark.setAttribute("y", scaleY(datum[dimensionY]));
        textMark.setAttribute("font-size", fontSize);
        textMark.setAttribute("font-family", fontFamily);
        textMark.setAttribute("dominant-baseline", "middle");
        textMark.setAttribute("dx", spacing);
        textMark.innerHTML = `(${datum[dimensionX]}, ${datum[dimensionY]})`; //TODO verstehen
        markContainer.appendChild(textMark);
    });
};

const drawMark = (data, markType) => {
    const marks = document.createElementNS(SVG_NAMESPACE, "g");
    marks.classList.add("marks");
    
    if (markType === "circle") {
        drawCircleMark(data, marks);
    }
    if (markType === "text") {
        drawTextMark(data, marks);
    }
    svg.appendChild(marks);
};

// DRAW ////////////////////////////////////////////////////////////////////////////////////////////
const resizeCanvas = () => {
    rangeX[0] = padding;
    rangeX[1] = width - padding;
    rangeY[0] = padding;
    rangeY[1] = height - padding;

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
};
const draw         = (withLabels = false) => {
    while (svg.hasChildNodes()) {
        svg.removeChild(svg.firstChild);
    }
    resizeCanvas();
    
    drawAxes();
    drawMark(dataset, "circle");

    if (withLabels) {
        drawMark(dataset,"text");
    }
};

// DATA ////////////////////////////////////////////////////////////////////////////////////////////
fetch("https://vega.github.io/editor/data/cars.json")
    .then(res => res.json())
    .then(datum => {
        dataset = datum;

        domainX[1] = dataset.reduce((previous, next) => Math.max(previous, next[dimensionX]), 0);
        domainY[1] = dataset.reduce((previous, next) => Math.max(previous, next[dimensionY]), 0);

        draw();
    });