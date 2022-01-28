import { StackProps, Text, VStack } from "@chakra-ui/react";
import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { composedChartData } from "../../constants/constants";

const PortfolioComposedChart = (props: StackProps) => (
  <VStack {...props}>
    <ResponsiveContainer width={"100%"} height={300}>
      <ComposedChart data={composedChartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="volume" barSize={25} fill="#413ea0" />
        <Line type="monotone" dataKey="price" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
    <Text as="h3" fontSize={"lg"} fontWeight={400} mb={2} py={3}>
      Daily Price and Volume
    </Text>
  </VStack>
);

export default PortfolioComposedChart;
