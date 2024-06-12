import OverView from '../components/overview';
import PaintEnv from '../components/paintingenv';
import WhatIsIt from '../components/whatisit';

const Home = () => {
  return (
    <main className=' h-screen p-5 flex flex-col'>
      <section className=' flex items-center gap-2'>
        <img src='src/public/logo.png' alt='' />
        <h1 className=' text-slate-700 font-bold'>INK Tec</h1>
      </section>
      <h3 className=' text-slate-700 font-normal mb-5'>Bem vindo!</h3>
      <div className=' flex flex-col justify-between h-full'>
        <WhatIsIt />
        <PaintEnv />
        <OverView />
      </div>
    </main>
  );
};

export default Home;
