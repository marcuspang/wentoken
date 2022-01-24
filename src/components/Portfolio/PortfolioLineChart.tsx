import { XAxis, YAxis, Tooltip, Legend, Bar, Line, LineChart } from 'recharts';
import { Text, VStack } from '@chakra-ui/react';
import { fakelinechartdata } from '../../constants/constants';

const PortfolioLineChart = () => (
    <VStack>
    <LineChart width={730} height={300} data={fakelinechartdata}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
    <Text as="h2" fontSize={"2xl"} fontWeight={400} mb={2} py={3}>
        No. of unique holders
      </Text>
    </VStack>
);


export default PortfolioLineChart;