import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
} from "recharts";
import { StackProps, Text, VStack } from "@chakra-ui/react";
import { fakescatterchartdata } from "../../constants/constants";

const PortfolioScatterChart = (props: StackProps) => (
  <VStack {...props}>
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <ScatterChart>
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <Tooltip />
        <Scatter data={fakescatterchartdata} fill="black" name="Scatter" />
      </ScatterChart>
    </ResponsiveContainer>
    <Text as="h3" fontSize={"lg"} fontWeight={400} mb={2} py={3}>
      Discrete Buy and Sell
    </Text>
  </VStack>
);

export default PortfolioScatterChart;
