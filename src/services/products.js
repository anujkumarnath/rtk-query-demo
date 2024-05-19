import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
	endpoints: builder => ({
		getProducts: builder.query({
			query: ({ skip, limit }) => {
				const queryString = new URLSearchParams({ skip, limit }).toString();
				return `?${queryString}`;
			},
		}),
		getProductById: builder.query({
			query: (id) => `/${id}`,
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
} = productsApi;
