export const generateReference = () => {
    const prefix = 'TRC';

    return prefix + Math.floor(
        1000000000 + Math.random() * 9000000000
    ).toString();
};