import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import Header from '../components/header';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Calendar from '../components/calendar';
import { GET_WEEK_INFORMATIONS } from '../api';
import GraphBar from '../components/graph/graphbar';
import GraphPie from '../components/graph/graphpie';

// Definindo a interface para os dados da cabine
interface CabinData {
  cabine: string;
  trabalhado: number;
}
interface Client {
  cliente: string;
  quantidade: number;
}

const Dashboards = () => {
  const [isButton, setButton] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [isDatasCabin, setDatasCabin] = useState<CabinData[] | null>(null);
  const [isDatasClient, setDatasClient] = useState<Client[] | null>(null);

  useEffect(() => {
    if (selectedRange && selectedRange.from && selectedRange.to) {
      setButton(false);

      const from = selectedRange.from.toISOString().slice(0, 10);
      const to = selectedRange.to.toISOString().slice(0, 10);

      const getDatas = async () => {
        const { url, options } = GET_WEEK_INFORMATIONS(from, to);
        const response = await fetch(url, options);
        const datas = await response.json();
        console.log(datas);

        // Mapeando os dados para o formato esperado pelo Recharts
        const datasforcabin: CabinData[] = datas.result.map(
          (item: { cabine: string; trabalhado: number }) => ({
            cabine: item.cabine,
            trabalhado: parseFloat(item.trabalhado.toFixed(2)),
          })
        );
        setDatasClient(datas.client);
        setDatasCabin(datasforcabin);
      };

      getDatas();

      setSelectedRange(undefined);
    }
  }, [selectedRange]);

  const handleClick = () => {
    setButton(!isButton);
  };

  return (
    <main className='flex flex-col items-center px-5 w-full h-screen overflow-y-hidden'>
      <Header />
      <section className='flex flex-col items-start w-full'>
        <button
          onClick={handleClick}
          className='bg-[#3F0EA6] p-2 text-white text-sm rounded flex items-center gap-2'
        >
          <IoCalendarClearOutline size={18} />
          selecione a data
        </button>
      </section>
      {isButton ? (
        <Calendar
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      ) : null}

      {isDatasCabin && (
        <GraphBar
          data={isDatasCabin}
          fill={'#1A0646'}
          text={'Tempo de atividade por cabine'}
        />
      )}

      {isDatasClient && (
        <GraphPie data={isDatasClient} text={'Clientes mais produzidos'} />
      )}
    </main>
  );
};

export default Dashboards;
