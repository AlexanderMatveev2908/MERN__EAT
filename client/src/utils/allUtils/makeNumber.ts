export const makeNumPrice = () => (Math.random() * 101).toFixed(2);

export const makeNumQty = () => Math.floor(+makeNumPrice());
