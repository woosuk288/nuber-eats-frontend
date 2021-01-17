import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import Restaurant from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export default function Category() {
  const params = useParams<ICategoryParams>();
  const history = useHistory();
  console.log(params);

  const [page, setPage] = useState(1);
  const { data, loading, called } = useQuery<category, categoryVariables>(CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug: params.slug,
      },
    },
    onCompleted: (resultData: category) => {
      const {
        category: { ok, error },
      } = resultData;
      if (!ok) {
        console.error(error);
        history.replace("/");
      }
    },
  });

  console.log(loading, data, called);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>Category | Nuber Eats</title>
      </Helmet>
      {!loading && data?.category.ok && (
        <div className="px-4 xl:px-0 max-w-screen-xl mx-auto mt-8">
          {/* categories */}
          <div className="flex justify-around ">
            <div>{data?.category.category?.name}</div>
          </div>
          {/* restaurants */}

          <div className="grid md:grid-cols-3 gap-x-6 gap-y-10 mt-16">
            {data?.category.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          {/* pagination */}
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
              Page {page} of {data?.category.totalPages}
            </span>
            <div>
              {page !== data?.category.totalPages && (
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
