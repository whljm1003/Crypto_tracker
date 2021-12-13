// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Back from "../Img/back.png";
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  a {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;

    &:hover {
      cursor: pointer;
    }
    img {
      width: 35px;
      height: 35px;
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.listBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  display: block;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.listBgColor};
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

interface CoinProps {
  coinId: string;
}
interface RouteState {
  name: string;
}
/*
  console.log(infoData); => 콘솔창에서 오른쪽 마우스 누른 뒤 Store object as global variable 클릭하면 temp1에 저장이 됨
  Object.keys(temp1).join(); => 필요한 key를 찾아서 interface에 삽입 한 후
  Object.values(temp1).map(e => typeof(e)); 필요한 type 추출해서 interface에 type 설정해줌 
*단축키 tip =>
  Command(Ctrl)+D: 같은 문자열 선택
  Shift+Alt+i: 선택한 모든 문자열에 가장 우측 끝으로 포커싱
  Command(Ctrl)+Shift+오른쪽 화살표: 현재 선택한 문자열을 기준으로 우측 끝까지 문자열 선택
*/
interface InfoData {
  id: "string";
  name: "string";
  symbol: "string";
  rank: "number";
  is_new: "boolean";
  is_active: "boolean";
  type: "string";
  description: "string";
  message: "string";
  open_source: "boolean";
  started_at: "string";
  development_status: "string";
  hardware_wallet: "boolean";
  proof_type: "string";
  hash_algorithm: "string";
  first_data_at: "string";
  last_data_at: "string";
}

interface PriceData {
  id: "string";
  name: "string";
  symbol: "string";
  rank: "number";
  circulating_supply: "number";
  total_supply: "number";
  max_supply: "number";
  beta_value: "number";
  first_data_at: "string";
  last_updated: "string";
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
}

function Coin() {
  const { coinId } = useParams<CoinProps>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     //캡슐화
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.name
              ? `COIN-${state.name}`
              : loading
              ? "Loading..."
              : `COIN-${infoData?.name}`}
          </title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loding..." : infoData?.name}
          <Link to="/">
            <img src={Back} alt="back"></img>
          </Link>
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
