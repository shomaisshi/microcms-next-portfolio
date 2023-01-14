// libs/client.js
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: 'ybex05fqxk',
    apiKey: process.env.API_KEY,
});