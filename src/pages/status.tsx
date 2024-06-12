import { useEffect, useState } from 'react';
import { GET_STATUS_CABIN } from '../api';
import Header from '../components/header';

interface Status {
  id: string;
  status: string;
  cabin: string;
  start: Date;
  end: Date;
}
const Status = () => {
  const [isStatus, setStatus] = useState<null | []>(null);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const { url, options } = GET_STATUS_CABIN();
        const response = await fetch(url, options);
        const datas = await response.json();

        if (datas && response.ok) {
          datas.sort(
            (
              a: { cabin: string; status: string },
              b: { cabin: string; status: string }
            ) => {
              if (a.status === 'em uso' && b.status !== 'em uso') return -1;
              if (a.status !== 'em uso' && b.status === 'em uso') return 1;

              const cabinA = parseInt(a.cabin.split('-')[1]);
              const cabinB = parseInt(b.cabin.split('-')[1]);

              return cabinA - cabinB;
            }
          );

          setStatus(datas);
          console.log(datas);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();

    const interval = setInterval(getDatas, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className=' flex flex-col px-5 w-full h-screen overflow-y-hidden'>
      <Header />

      <section className=' grid grid-cols-2 gap-3'>
        {isStatus &&
          isStatus.map(({ id, cabin, status, end, start }: Status) => (
            <div
              key={id}
              className=' text-white rounded flex flex-col p-5 gap-5 opacity-0 translate-x-[100px] animate-animationleft'
              style={{
                backgroundColor: status === 'em uso' ? '#3F0EA6' : '#1A0646',
              }}
            >
              <h1>{cabin}</h1>

              <div>
                {status === 'em uso' ? (
                  <h2 className=' text-sm font-light'>
                    {`${new Date(start)
                      .toLocaleTimeString('PT-BR')
                      .slice(0, -3)} h`}
                  </h2>
                ) : (
                  <h2 className=' text-sm font-light'>
                    {`${new Date(end)
                      .toLocaleTimeString('PT-BR')
                      .slice(0, -3)} h`}
                  </h2>
                )}

                <div className=' flex items-center justify-between'>
                  <h3 className=' text-sm'>{status}</h3>

                  <div
                    className={`rounded-full w-2 h-2 ${
                      status === 'em uso'
                        ? 'bg-green-400 transition animate-pulsefast'
                        : 'bg-red-400'
                    }  `}
                  ></div>
                </div>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
};

export default Status;
