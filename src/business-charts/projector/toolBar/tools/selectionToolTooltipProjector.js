export { selectionToolBubbleTooltip, selectionToolTooltip }

const selectionToolBubbleTooltip = (canvasPosition, pointRadius, title) => {
    const tooltipElement = document.createElement('div');
    tooltipElement.style.top = `${canvasPosition.yValue - 31 - pointRadius}px`;
    tooltipElement.style.left = `${canvasPosition.xValue - 5}px`;
    tooltipElement.classList.add('tooltip-bubble', 'tooltip-bubble-bottom-left');

    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};

const selectionToolTooltip = (canvasPosition, pointRadius, title) => {
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip-data', 'tooltip-data-arrow-bottom-center');
    
    const tooltipDataRoot = document.querySelector(':root');
    const computedTooltipWidth = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-width"));
    const computedArrowBorder = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-arrow-border-width"));

    tooltipElement.style.top = `${canvasPosition.yValue + pointRadius + computedArrowBorder}px`;
    tooltipElement.style.left = `${canvasPosition.xValue - 0.5*computedTooltipWidth}px`;
    
    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};