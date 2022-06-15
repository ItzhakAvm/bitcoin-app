import { Currency, RecordByCurrency } from '../../types/crypto';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { firstToUpperCase } from '../../utils/string';
import { useRecordResponseContext } from '../../contexts/record-response.context';
import jsonata from 'jsonata';

type Props = {
  displayCurrency: Currency;
};

const Chart = (props: Props) => {
  const [recordResponse] = useRecordResponseContext(),
    [data, setData] = useState<RecordByCurrency>({});

  useEffect(() => {
    const groupByCurrency = jsonata(
      'records{currency:$.{"rate":rate,"price":price}}',
    ).evaluate(recordResponse);

    setData(groupByCurrency);
  }, [recordResponse]);

  return (
    <div>
      <ResponsiveContainer width={'99%'} aspect={2}>
        <AreaChart
          data={data?.[props.displayCurrency]}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rate" tickFormatter={firstToUpperCase} />
          <YAxis />
          <Tooltip
            labelStyle={{ color: 'black' }}
            labelFormatter={(label) => (
              <span>{firstToUpperCase(label.toString())}</span>
            )}
          />
          <Area
            type="linear"
            name="Price"
            dataKey="price"
            dot={{ stroke: 'white', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Fix for Tooltip component
(Tooltip as typeof Tooltip & { propTypes: {} }).propTypes = {};

export default Chart;
