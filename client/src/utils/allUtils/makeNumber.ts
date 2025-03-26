export const makeNumPrice = () => (Math.random() * 100).toFixed(2);

export const makeNumQty = () => Math.floor(+makeNumPrice());
