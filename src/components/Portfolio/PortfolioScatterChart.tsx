import { StackProps, Text, VStack } from "@chakra-ui/react";
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { scatterChartData } from "../../constants/constants";

const PortfolioScatterChart = (props: StackProps) => (
  <VStack {...props}>
    <ResponsiveContainer width={"100%"} height={300}>
      <ScatterChart>
        <XAxis dataKey="buy" />
        <YAxis dataKey="sell" />
        <Tooltip />
        <Scatter data={scatterChartData} fill="black" name="Scatter" />
      </ScatterChart>
    </ResponsiveContainer>
    <Text as="h3" fontSize={"lg"} fontWeight={400} mb={2} py={3}>
      Discrete Buy and Sell
    </Text>
  </VStack>
);

export default PortfolioScatterChart;
