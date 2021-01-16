import { gql, useQuery } from "@apollo/client";
import { url } from "inspector";
import React, { useState } from "react";
import Restaurant from "../../components/restaurant";
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
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

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
          <div className="grid grid-cols-3 gap-x-6 gap-y-10 mt-16">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md mt-10 items-center mx-auto">
            <div>
              {page > 1 && (
                <button
                  onClick={onPrevPageClick}
                  className="focus:outline-none font-medium text-2xl"
                >
                  &larr;
                </button>
              )}
            </div>
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            <div>
              {page !== data?.restaurants.totalPages && (
                <button
                  onClick={onNextPageClick}
                  className="focus:outline-none font-medium text-2xl"
                >
                  &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
