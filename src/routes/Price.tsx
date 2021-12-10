import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0px 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Overview = styled.ul`
  width: 100%;
`;

const OverviewItem = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.listBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 15px 0;
  width: 100%;
  font-weight: 500;
`;
const Title = styled.h1`
  font-size: 18px;
  width: 50%;
  text-align: center;
`;

const PriceInfo = styled.span<{ isHigh?: Boolean }>`
  font-size: 20px;
  width: 50%;
  text-align: center;
  color: ${(props) => (props.isHigh ? "#44bd32" : "#e84118")};
`;
interface PriceProps {
  coinId: string;
}

interface IPriceProps {
  beta_value: number;
  circulating_supply: number;
  first_data_at: string;
  id: string;
  last_updated: string;
  max_supply: number;
  name: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
  rank: 1;
  symbol: string;
  total_supply: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPriceProps>(
    ["priceInfo", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  function CheckHigh(value: number | undefined) {
    if (value) {
      return value > 0;
    }
  }

  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : (
        <Overview>
          <OverviewItem>
            <Title>Price &rarr;</Title>
            <PriceInfo isHigh={true}>
              ${data?.quotes.USD.price.toFixed(3)}
            </PriceInfo>
          </OverviewItem>
          <OverviewItem>
            <Title>High Price &rarr;</Title>
            <PriceInfo isHigh={true}>
              ${data?.quotes.USD.ath_price.toFixed(3)}
            </PriceInfo>
          </OverviewItem>
          <OverviewItem>
            <Title>Percent Change(1h) &rarr;</Title>
            <PriceInfo
              isHigh={CheckHigh(data?.quotes.USD.percent_change_1h) === true}
            >
              {data?.quotes.USD.percent_change_1h}%
            </PriceInfo>
          </OverviewItem>
          <OverviewItem>
            <Title>Percent Change(6h) &rarr;</Title>
            <PriceInfo
              isHigh={CheckHigh(data?.quotes.USD.percent_change_6h) === true}
            >
              {data?.quotes.USD.percent_change_6h}%
            </PriceInfo>
          </OverviewItem>
          <OverviewItem>
            <Title>Percent Change(12h) &rarr;</Title>
            <PriceInfo
              isHigh={CheckHigh(data?.quotes.USD.percent_change_12h) === true}
            >
              {data?.quotes.USD.percent_change_12h}%
            </PriceInfo>
          </OverviewItem>
          <OverviewItem>
            <Title>Percent Change(24h) &rarr;</Title>
            <PriceInfo
              isHigh={
                CheckHigh(data?.quotes.USD.market_cap_change_24h) === true
              }
            >
              {data?.quotes.USD.percent_change_24h}%
            </PriceInfo>
          </OverviewItem>
        </Overview>
      )}
    </Container>
  );
}
export default Price;
