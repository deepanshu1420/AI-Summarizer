import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://briefly-ai-content-summarizer.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set(
        'X-RapidAPI-Host',
        'briefly-ai-content-summarizer.p.rapidapi.com'
      );

      return headers;
    }
  }),

  endpoints: (builder) => ({
    getSummary: builder.query({
      query: ({ articleUrl }) => ({
        url: '/summarize',
        method: 'GET',
        params: {
          url: articleUrl,
          method: 'textrank',
          sentences: 10
        }
      })
    })
  })
});

export const { useLazyGetSummaryQuery } = articleApi;