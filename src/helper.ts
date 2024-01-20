export const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
};

export const convertTimerToHMS = (time: number) => {
    const hour: number = Math.floor(time / (60 * 60));
    const minute: number = Math.floor(time / 60);
    const seconds: number = time % 60
    return `${hour === 0 ? "00 : " : hour + " : "}${minute === 0 ? "00 : " : minute + " : "}${seconds === 0 ? "00": seconds}`
}