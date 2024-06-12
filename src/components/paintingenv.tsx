import { useEffect, useState } from 'react';
import { FaTemperatureHalf, FaPaintRoller } from 'react-icons/fa6';
import { IoWaterOutline, IoSnowSharp } from 'react-icons/io5';
import { GET_CONDIT_ORV, calculatePlace } from '../api';
import SkcheletonPaint from './skcheleton/skcheletonpaintenv';

interface SensorData {
  isTemperature: null | string;
  isUmity: null | string;
  isOrval: null | number;
  isTemperatureOfInk: null | number;
}

const PaintEnv = () => {
  const [isSensorData, setSensorData] = useState<SensorData>({
    isTemperature: null,
    isUmity: null,
    isOrval: null,
    isTemperatureOfInk: null,
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTempAndUmi = async () => {
      try {
        setLoading(true);
        const { url, options } = GET_CONDIT_ORV();
        const response = await fetch(url, options);
        const json = await response.json();

        if (response.ok || json) {
          setSensorData((prevData) => ({
            ...prevData,
            isTemperature: json.temperatura,
            isUmity: json.umidade,
          }));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTempAndUmi();
    const interval = setInterval(getTempAndUmi, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isSensorData.isTemperature && isSensorData.isUmity) {
      const orv = calculatePlace(
        isSensorData.isTemperature,
        isSensorData.isUmity
      );
      setSensorData((prevData) => ({
        ...prevData,
        isOrval: orv.Tpo,
        isTemperatureOfInk: orv.tempInk,
      }));
    }
  }, [isSensorData.isTemperature, isSensorData.isUmity]);

  return (
    <section className=' mt-4 rounded-lg flex flex-col gap-2 opacity-0 translate-x-[-100px] animate-animationleft'>
      <h2 className=' text-slate-700 font-bold '>Ambiente de pintura</h2>

      <div className=' rounded-md grid grid-cols-2 gap-4'>
        <div className='bg-slate-100 p-3 rounded-md flex flex-col justify-center gap-2 '>
          <div className=' flex gap-2 items-center'>
            <FaTemperatureHalf color='#6D31ED' />
            <p className=' text-sm'>Temperatura</p>
          </div>
          <p>
            {isSensorData.isTemperature && !isLoading ? (
              `${isSensorData.isTemperature} ºC`
            ) : (
              <SkcheletonPaint />
            )}
          </p>
        </div>
        <div className='bg-slate-100 p-3 rounded-md flex flex-col justify-center gap-2'>
          <div className=' flex gap-2 items-center'>
            <IoWaterOutline color='#6D31ED' />
            <p className=' text-sm'>Umidade</p>
          </div>
          <p>
            {isSensorData.isUmity && !isLoading ? (
              `${isSensorData.isUmity} %`
            ) : (
              <SkcheletonPaint />
            )}
          </p>
        </div>
        <div className='bg-slate-100 p-3 rounded-md flex flex-col justify-center gap-1'>
          <div className=' flex gap-2 items-center'>
            <IoSnowSharp size={20} color='#6D31ED' />
            <p className=' text-xs'>Ponto de orvalho</p>
          </div>
          <p>
            {isSensorData.isOrval && !isLoading ? (
              `${isSensorData.isOrval} Cº`
            ) : (
              <SkcheletonPaint />
            )}
          </p>
        </div>
        <div className='bg-slate-100 p-3 rounded-md flex flex-col justify-center gap-2'>
          <div className=' flex gap-2 items-center'>
            <FaPaintRoller color='#6D31ED' />
            <p className=' text-sm'>aplicação</p>
          </div>
          <p>
            {isSensorData.isTemperatureOfInk && !isLoading ? (
              `${isSensorData.isTemperatureOfInk} Cº`
            ) : (
              <SkcheletonPaint />
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaintEnv;
