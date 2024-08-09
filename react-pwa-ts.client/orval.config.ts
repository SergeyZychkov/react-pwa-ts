module.exports = {
    toyApp: {
        output: {
            mode: 'tags-split',
            target: 'src/shared/api/toy-app/toy-app.ts',
            schemas: 'src/shared/api/toy-app/model',
            client: 'axios-functions',
            httpClient: 'axios',
            mock: false,
            override: {
                mutator: {
                    path: './src/utilities/api/apiClient.ts',
                    name: 'customInstance'
                },
            }
        },
        input: {
            target: './swagger.json',
        }
    }
    //,
    //'toy-app-file': {
    //    input: './swagger.json',
    //    output: './src/shared/api/toy-app.ts',
    //}
};