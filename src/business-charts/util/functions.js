export { generateId }

const generateId = (prefix) => {
    const random = (Math.random() + 1).toString(36).substring(2);
    return `${prefix}-${random}`;
}