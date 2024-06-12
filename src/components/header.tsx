import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiArrowLeftSLine } from 'react-icons/ri';

const Header = () => {
  const [isPath, setPath] = useState<string>('home');
  const location = useLocation();

  useEffect(() => {
    if (location) {
      let path = location.pathname.replace('/', '');
      path = path.charAt(0).toUpperCase() + path.slice(1);
      setPath(path);
    }
  }, [location]);
  return (
    <header className=' w-full h-[63px] flex items-center'>
      {isPath === '/' ? (
        ''
      ) : (
        <Link
          to={'/'}
          className=' font-medium text-lg flex items-center justify-center text-center py-2
    '
        >
          <RiArrowLeftSLine size={20} />
          {isPath}
        </Link>
      )}
    </header>
  );
};

export default Header;
