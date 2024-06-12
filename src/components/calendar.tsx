import { ptBR } from 'date-fns/locale';
import {
  DayPicker,
  SelectRangeEventHandler,
  DateRange,
  ActiveModifiers,
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface propsSelect {
  selectedRange: DateRange | undefined;
  setSelectedRange: (
    range: DateRange | undefined,
    selectedDay: Date,
    activeModifiers: ActiveModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => void;
}

const Calendar = ({ selectedRange, setSelectedRange }: propsSelect) => {
  const handleSelectRange: SelectRangeEventHandler = (
    range: DateRange | undefined,
    selectedDay: Date,
    activeModifiers: ActiveModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    setSelectedRange(range, selectedDay, activeModifiers, e);
  };

  return (
    <DayPicker
      className=' border w-[90%] flex justify-center p-3 rounded bg-slate-100 fixed right-auto top-24 z-10'
      showOutsideDays
      locale={ptBR}
      mode='range'
      selected={selectedRange}
      onSelect={handleSelectRange}
    />
  );
};

export default Calendar;
