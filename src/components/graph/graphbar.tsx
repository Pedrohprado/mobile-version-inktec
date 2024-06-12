import { Bar, BarChart, LabelList, Rectangle, Tooltip, XAxis } from 'recharts';

interface Graph {
  data: { cabine: string; trabalhado: number }[];
  fill: string;
  text: string;
}
const GraphBar = ({ data, fill, text }: Graph) => {
  if (data)
    return (
      <div className=' flex items-center justify-center w-full flex-col border rounded py-4 mt-5'>
        <p className=' px-4 bg-slate-200 text-center text-slate-800 font-medium text-sm py-1 rounded mb-5'>
          {text}
        </p>
        <BarChart width={250} height={200} data={data}>
          <Tooltip />
          <XAxis dataKey={'cabine'} fontSize={'1px'} />
          <Bar
            style={{ color: 'red' }}
            dataKey='trabalhado'
            fill={fill ? fill : '#2260fe'}
            activeBar={<Rectangle fill='#225dfec3' stroke='#225dfec3' />}
          >
            <LabelList
              dataKey='trabalhado'
              position={'insideBottom'}
              fontSize={'10px'}
            />
          </Bar>
        </BarChart>
      </div>
    );
};

export default GraphBar;
