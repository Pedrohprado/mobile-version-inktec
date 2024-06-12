const WhatIsIt = () => {
  return (
    <section className=' bg-slate-100 p-3 rounded-lg flex flex-col gap-2 opacity-0 translate-x-[-100px] animate-animationleft'>
      <div className=' flex'>
        <h2 className=' text-slate-700 font-bold '>O que é?</h2>
        <div className=' fixed top-0 right-10 bg-[#6D31ED] w-6 h-8 rounded-b'></div>
      </div>
      <p className=' text-slate-700 font-light'>
        criado para auxiliar no levantamento e peenchimento das informações,
        deixando a pintura líqudia mais próxima do futuro.
      </p>
    </section>
  );
};

export default WhatIsIt;
