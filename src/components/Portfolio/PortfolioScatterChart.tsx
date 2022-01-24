import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ComposedChart } from 'recharts';
import { Text, VStack } from '@chakra-ui/react';
import { fakescatterchartdata } from '../../constants/constants';

const PortfolioScatterChart = () => (
    <VStack>
    <ComposedChart width={730} height={300} data={fakescatterchartdata}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="volume" barSize={25} fill="#413ea0" />
        <Line type="monotone" dataKey="price" stroke="#ff7300" />
    </ComposedChart>
    <Text as="h2" fontSize={"2xl"} fontWeight={400} mb={2} py={3}>
        Discrete Buy and Sell
      </Text>
    </VStack>
);


export default PortfolioScatterChart;