import { request, gql } from 'graphql-request';
import CONFIG from './config';

const DataSource = {
    authorsOnlyName() {
        const query = gql`
            query {
                authors {
                    id
                    name
                }
            }
        `;
        return request(CONFIG.GraphQL_EndPoint, query);
    },
    books() {
        const query = gql`
            query {
                books {
                    name
                    year
                    author {
                        name
                    }
                }
            }
        `;
        return request(CONFIG.GraphQL_EndPoint, query);
    },
    authors() {
        const query = gql`
            query {
                authors {
                    name
                    address
                    email
                }
            }
        `;
        return request(CONFIG.GraphQL_EndPoint, query);
    }
};

export default DataSource;