interface Config {
    jwtSecret: String;
}
export const config: Config = {
    jwtSecret: process.env.JWT_SECRET || "",
}