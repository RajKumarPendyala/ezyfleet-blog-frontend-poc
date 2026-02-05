// lib/api.ts
import axios from 'axios';
import qs from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://wonderful-kindness-cbe166af41.strapiapp.com/api';

export async function fetchAPI(path: string, urlParamsObject: any = {}) {
    const mergedUrlParams = {
        populate: '*', // Default to populate all relations
        ...urlParamsObject,
    };

    // Use qs library to properly serialize nested objects
    const queryString = qs.stringify(mergedUrlParams, {
        encodeValuesOnly: true, // Keeps brackets readable
    });

    const requestUrl = `${API_URL}/${path}?${queryString}`;

    try {
        const response = await axios.get(requestUrl);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        if (axios.isAxiosError(error)) {
            console.error('Response:', error.response?.data);
            console.error('Status:', error.response?.status);
            console.error('URL:', requestUrl);
        }
        throw new Error(`Error fetching from ${requestUrl}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
