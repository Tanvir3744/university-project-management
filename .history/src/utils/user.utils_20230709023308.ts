
let userIdGenerate = 0; 

export const generateUserId = () => {
    userIdGenerate++;
    return String(userIdGenerate).padStart(5, "0");
}