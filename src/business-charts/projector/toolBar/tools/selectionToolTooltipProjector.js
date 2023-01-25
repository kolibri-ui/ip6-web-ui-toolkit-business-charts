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
    tooltipElement.style.top = `${canvasPosition.yValue + 31 - pointRadius}px`;
    tooltipElement.style.left = `${canvasPosition.xValue -15}px`;
    tooltipElement.classList.add('tooltip-data', 'tooltip-data-arrow-top-left');

    const text = document.createTextNode(title);
    tooltipElement.append(text);

    return tooltipElement;
};

