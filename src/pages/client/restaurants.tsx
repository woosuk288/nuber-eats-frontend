import { gql, useQuery } from "@apollo/client";
import { url } from "inspector";
import React from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      error
      ok
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export default function Restaurants() {
  const { data, loading, error } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page: 1,
        },
      },
    }
  );

  console.log({ data });

  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          className="input w-3/12 rounded-md border-0"
          type="search"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-xl mx-auto mt-8">
          <div className="flex justify-around ">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center cursor-pointer group">
                <div
                  className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-100"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="mt-1 text-sm text-center font-medium">{category.name}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-6 gap-y-10 mt-10">
            {data?.restaurants.results?.map((restaurant) => (
              <div>
                <div
                  style={{ backgroundImage: `url(${restaurant.coverImg})` }}
                  className="bg-red-500 py-24 bg-cover bg-center mb-3"
                ></div>
                <h3 className="text-lg font-medium">{restaurant.name}</h3>
                <span>{restaurant.category?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
