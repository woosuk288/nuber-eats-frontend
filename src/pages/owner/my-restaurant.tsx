import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import {
  DISH_FRAGMENT,
  FULL_ORDER_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import { myRestaurant, myRestaurantVariables } from "../../__generated__/myRestaurant";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  // VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { pendingOrders } from "../../__generated__/pendingOrders";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription pendingOrders {
    pendingOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  const { data: subscriptionData } = useSubscription<pendingOrders>(PENDING_ORDERS_SUBSCRIPTION);
  const history = useHistory();
  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      history.push(`/orders/${subscriptionData.pendingOrders.id}`);
    }
  }, [subscriptionData, history]);

  const chartData = [
    { x: 1, y: 2000 },
    { x: 2, y: 3000 },
    { x: 3, y: 5000 },
    { x: 4, y: 10000 },
    { x: 5, y: 2000 },
    { x: 6, y: 7000 },
    { x: 7, y: 8000 },
  ];

  const orders = data?.myRestaurant.restaurant?.orders;
  const yVal = orders?.map((order) => order.total ?? 0).reduce((a, b) => Math.max(a, b), 0);

  return (
    <div>
      <div
        className="  bg-gray-700  py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <Link to={``} className=" text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish!</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((dish) => (
                <Dish
                  key={dish.id}
                  name={dish.name}
                  price={dish.price}
                  description={dish.description}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>

          <section>
            <VictoryChart
              domainPadding={20}
              width={window.innerWidth}
              height={500}
              containerComponent={<VictoryVoronoiContainer />}
              theme={VictoryTheme.material}
              maxDomain={{
                y: yVal ? yVal + 10 : 0,
              }}
            >
              <VictoryLine
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
                interpolation="natural"
                style={{ data: { strokeWidth: 3 } }}
                labels={({ datum }) => `$${datum.y}`}
                // labelComponent={<VictoryTooltip style={{ fontSize: 20 }} renderInPortal dy={-20} />}
                labelComponent={<VictoryLabel style={{ fontSize: 20 }} renderInPortal dy={-20} />}
              />

              <VictoryAxis
                style={{ tickLabels: { fontSize: 20 } }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
              />
            </VictoryChart>
          </section>
          <section className="grid grid-cols-2">
            <VictoryChart domainPadding={20}>
              <VictoryAxis
                dependentAxis
                // label="Amount of Money"
                // tickValues={[10, 20, 30, 40, 50, 60]}
                tickFormat={(step) => `$${step / 1000}/K`}
              />
              <VictoryAxis
                // label="Days"
                tickFormat={(step) => `Day ${step}`}
              />
              <VictoryBar data={chartData} />
            </VictoryChart>
            <VictoryPie colorScale={["tomato", "orange", "gold", "cyan", "navy"]} />
          </section>
        </div>
      </div>
    </div>
  );
};
