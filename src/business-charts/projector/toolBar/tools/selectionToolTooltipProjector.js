export { selectionToolBubbleTooltip, selectionToolTooltipBottomCenter, selectionToolTooltipLeftCenter }

const selectionToolBubbleTooltip = (canvasPosition, pointRadius, title) => {
    const tooltipElement = document.createElement('div');
    
    const tooltipDataRoot = document.querySelector(':root');
    const computedTooltipHeight = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-min-height").replace("px",""));
    const computedArrowBorder = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-bubble-arrow-border-right").replace("px",""));
    
    tooltipElement.style.top = `${canvasPosition.yValue - pointRadius -computedTooltipHeight}px`;
    tooltipElement.style.left = `${canvasPosition.xValue + pointRadius - computedArrowBorder}px`;
    tooltipElement.classList.add('tooltip-bubble', 'tooltip-bubble-bottom-left');

    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};

const selectionToolTooltipBottomCenter = (canvasPosition, pointRadius, title) => {
    const tooltipElement = document.createElement('div');
    
    const tooltipDataRoot = document.querySelector(':root');
    const computedTooltipWidth = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-width").replace("px",""));
    const computedArrowBorder = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-arrow-border-width").replace("px",""));
    
    tooltipElement.style.top = `${canvasPosition.yValue + pointRadius + computedArrowBorder}px`;
    tooltipElement.style.left = `${canvasPosition.xValue - 0.5 * computedTooltipWidth}px`;

    tooltipElement.classList.add('tooltip-data-bottom-center', 'tooltip-data-arrow-top-center');
    
    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};

const selectionToolTooltipLeftCenter = (canvasPosition, pointRadius, title) => {
    const tooltipElement = document.createElement('div');

    const tooltipDataRoot = document.querySelector(':root');
    const computedTooltipWidth = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-width").replace("px",""));
    const computedTooltipHeight = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-height").replace("px",""));
    const computedArrowBorder = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-arrow-border-width").replace("px",""));

    tooltipElement.style.top = `${canvasPosition.yValue - 0.25 * computedTooltipHeight}px`;
    tooltipElement.style.left = `${canvasPosition.xValue - computedTooltipWidth - pointRadius - computedArrowBorder}px`;

    tooltipElement.classList.add('tooltip-data-left-center', 'tooltip-data-arrow-right-center');

    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};