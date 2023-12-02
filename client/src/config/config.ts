interface Config {
    apiBaseUrl: String,
}
export const config: Config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "",
}