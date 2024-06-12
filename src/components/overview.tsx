import { HiOutlineStatusOnline } from 'react-icons/hi';
import { VscGraphLine } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
const OverView = () => {
  return (
    <section className=' py-5 flex flex-col opacity-0 translate-x-[-100px] animate-animationleft'>
      <h1 className=' text-slate-700 font-bold '>Overviews</h1>
      <div className=' flex gap-2 mt-2'>
        <Link
          to={'/status'}
          className=' text-white bg-[#1A0646] w-1/2 rounded flex flex-col p-4 justify-between gap-4'
        >
          <HiOutlineStatusOnline size={20} />
          <div>
            <h3>Status</h3>
            <h4>Cabines</h4>
          </div>
        </Link>
        <Link
          to={'dashboards'}
          className=' text-white bg-[#6D31ED] w-1/2 rounded flex flex-col p-4 justify-between gap-4'
        >
          <VscGraphLine size={20} />
          <div>
            <h3>Dashboards</h3>
            <h4>Cabines</h4>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default OverView;
