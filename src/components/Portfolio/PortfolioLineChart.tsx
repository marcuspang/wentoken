import { StackProps, Text, VStack } from "@chakra-ui/react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { lineChartData } from "../../constants/constants";

const PortfolioLineChart = (props: StackProps) => (
  <VStack {...props}>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineChartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="holders" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    <Text as="h3" fontSize={"lg"} fontWeight={400} mb={2} py={3}>
      No. of unique holders
    </Text>
  </VStack>
);

export default PortfolioLineChart;
