import { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import TradeOverview from "../../components/Trade/TradeOverview";

const TradeMainPage: NextPage = () => {
  return (
    <Layout>
      <TradeOverview />
    </Layout>
  );
};

export default TradeMainPage;
