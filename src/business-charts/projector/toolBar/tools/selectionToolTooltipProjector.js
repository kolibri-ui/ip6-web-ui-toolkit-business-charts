export { selectionToolBubbleTooltip, selectionToolTooltipBottomCenter, selectionToolTooltipLeftCenter }

const selectionToolBubbleTooltip = (canvasPosition, pointRadius, title) => {
    const tooltipElement = document.createElement('div');
    tooltipElement.style.top = `${canvasPosition.yValue - 31 - pointRadius}px`;
    tooltipElement.style.left = `${canvasPosition.xValue - 5}px`;
    tooltipElement.classList.add('tooltip-bubble', 'tooltip-bubble-bottom-left');

    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};

const selectionToolTooltipBottomCenter = (canvasPosition, pointRadius, title) => {
    const tooltipElement = document.createElement('div');
    
    const tooltipDataRoot = document.querySelector(':root');
    const computedTooltipWidth = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-width"));
    const computedArrowBorder = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-arrow-border-width"));

    tooltipElement.style.top = `${canvasPosition.yValue + pointRadius + computedArrowBorder}px`;
    tooltipElement.style.left = `${canvasPosition.xValue - 0.5*computedTooltipWidth}px`;

    tooltipElement.classList.add('tooltip-data-bottom-center', 'tooltip-data-arrow-top-center');
    
    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};

const selectionToolTooltipLeftCenter = (canvasPosition, pointRadius, title) => {
    const tooltipElement = document.createElement('div');

    const tooltipDataRoot = document.querySelector(':root');
    const computedTooltipWidth = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-width"));
    const computedTooltipHeight = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-height"));
    const computedArrowBorder = Number(getComputedStyle(tooltipDataRoot).getPropertyValue("--tooltip-arrow-border-width"));

    tooltipElement.style.top = `${canvasPosition.yValue -0.5*computedTooltipHeight}px`;
    tooltipElement.style.left = `${canvasPosition.xValue - computedTooltipWidth - pointRadius - computedArrowBorder}px`;

    tooltipElement.classList.add('tooltip-data-left-center', 'tooltip-data-arrow-right-center');

    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};