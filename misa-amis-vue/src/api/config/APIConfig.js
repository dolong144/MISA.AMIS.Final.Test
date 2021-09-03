var APIConfig = {
    development: 'https://localhost:44377/api/',
    production: 'local:8081'
}

export default APIConfig[process.env.NODE_ENV];
