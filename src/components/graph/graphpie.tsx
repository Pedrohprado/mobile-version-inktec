import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

function GraphPie({
  data,
  text,
}: {
  data: { cliente: string; quantidade: number }[];
  text: string;
}) {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [isActive, setActive] = useState<boolean>(false);

  if (data) {
    const percentage = (value: number, total: number) => {
      return ((value / total) * 100).toFixed(2);
    };

    const total = data.reduce((acc, item) => acc + item.quantidade, 0);

    const dataWithPercentage = data.map((item) => ({
      ...item,
      porcentagem: percentage(item.quantidade, total),
    }));

    const onPieEnter = (_: number, index: number) => {
      setActiveIndex(index);
    };

    return (
      <div
        onClick={() => setActive(!isActive)}
        className={` flex items-center justify-center w-full flex-col border rounded py-4 mt-5 ${
          isActive ? ' h-72 animate-flip' : ' animate-flipBack'
        }`}
      >
        <p className=' px-4 bg-slate-200 text-center text-slate-800 font-medium text-sm py-1 rounded mb-5'>
          {text}
        </p>
        {isActive ? (
          <div className='flex flex-col w-full px-4 h-[80%] justify-between'>
            {dataWithPercentage.map((entry, index) => (
              <div key={`legend-${index}`} className='flex items-center mb-1'>
                <div
                  className='w-2 h-2 mr-1'
                  style={{ backgroundColor: getFillColor(entry.cliente) }}
                />
                <p className=' text-sm'>{`${entry.cliente}: ${entry.porcentagem}%`}</p>
              </div>
            ))}
          </div>
        ) : (
          <PieChart width={400} height={200}>
            <Pie
              activeIndex={activeIndex}
              dataKey='quantidade'
              startAngle={0}
              endAngle={360}
              data={dataWithPercentage}
              cx='50%'
              cy='50%'
              outerRadius={60}
              innerRadius={40}
              fontSize={'10px'}
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getFillColor(entry.cliente)}
                />
              ))}
            </Pie>
          </PieChart>
        )}
      </div>
    );
  }
}

function getFillColor(cliente: string) {
  switch (cliente) {
    case 'john deere':
      return '#1a6b24';
    case 'caterpillar':
      return '#f6b900';
    case 'cnh':
      return '#b91818';
    case 'volvo':
      return '#5d5d5d';
    default:
      return 'salmon';
  }
}

export default GraphPie;
