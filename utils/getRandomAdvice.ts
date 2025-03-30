import { ADVICES } from "@/constant/advice";

export const getRandomAdvice = () => {
    return ADVICES[Math.floor(Math.random() * ADVICES.length)];
};
