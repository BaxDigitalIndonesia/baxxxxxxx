import bcrypt from "bcrypt";
const saltRounds = 10;

export const encrypt = (password: string) => {
    return bcrypt.hashSync(password, saltRounds);
};

export const decrypt = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
};
