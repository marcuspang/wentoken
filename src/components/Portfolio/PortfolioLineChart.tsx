import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { StackProps, Text, VStack } from "@chakra-ui/react";
import { fakelinechartdata } from "../../constants/constants";

const PortfolioLineChart = (props: StackProps) => (
  <VStack {...props}>
    <ResponsiveContainer width="100%" height={"100%"}>
      <LineChart data={fakelinechartdata}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    <Text as="h3" fontSize={"lg"} fontWeight={400} mb={2} py={3}>
      No. of unique holders
    </Text>
  </VStack>
);

export default PortfolioLineChart;
