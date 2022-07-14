import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

interface IpriceData {
  coinId: string;
  priceData: {
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
}

interface IpercentInfo {
  percentInfo: number;
}

const Container = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PercentCard = styled.li`
  position: relative;
  width: 100%;
  border-radius: 20px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
  span {
    font-size: 30px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
  }
  margin: 10px 0;
`;

const Arrow = styled.svg<IpercentInfo>`
  position: absolute;
  right: 130px;
  fill: ${(props) => (props.percentInfo < 0 ? "#3C90EB" : "#DF7D46")};
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const ChangeInfo = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Price = () => {
  const { coinId, priceData } = useOutletContext<IpriceData>();
  const percentChangeInfoArr = {
    "15 min": priceData.percent_change_15m,
    "30 min": priceData.percent_change_30m,
    "1 hour": priceData.percent_change_1h,
    "6 hours": priceData.percent_change_6h,
    "12 hours": priceData.percent_change_12h,
    "1 day": priceData.percent_change_24h,
    "7 days": priceData.percent_change_7d,
    "30 days": priceData.percent_change_30d,
  };
  return (
    <Container>
      {Object.entries(percentChangeInfoArr).map((eachData) => {
        return (
          <PercentCard key={eachData[0]}>
            <span>{eachData[0]}</span>
            <ChangeInfo>
              <Arrow
                percentInfo={eachData[1]}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d={
                    eachData[1] < 0
                      ? "M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 246.6l-112 112C272.4 364.9 264.2 368 256 368s-16.38-3.125-22.62-9.375l-112-112c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L256 290.8l89.38-89.38c12.5-12.5 32.75-12.5 45.25 0S403.1 234.1 390.6 246.6z"
                      : "M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM390.6 310.6c-12.5 12.5-32.75 12.5-45.25 0L256 221.3L166.6 310.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l112-112C239.6 147.1 247.8 144 256 144s16.38 3.125 22.62 9.375l112 112C403.1 277.9 403.1 298.1 390.6 310.6z"
                  }
                />
              </Arrow>
              {eachData[1] > 0 ? "+" + eachData[1] : eachData[1]}
            </ChangeInfo>
          </PercentCard>
        );
      })}
    </Container>
  );
};

export default Price;
