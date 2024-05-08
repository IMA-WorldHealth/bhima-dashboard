/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addFilterDash, toggleDash } from '../store/actions/dashboard.action';
import { Filter } from './Filter';
import icon from '../assets/icon.png';

export const Header = () => {
  const { t } = useTranslation();
  const { _filters, isOpen } = useAppSelector((state) => state.dashboardState);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(toggleDash() as any);
  const getFilter = (filter: SearchType) => {
    dispatch(addFilterDash(filter) as any);
  };
  const toggle = () => {
    dispatch(toggleDash() as any);
  };

  return (
    <header className='bg-white sticky z-50 top-0'>
      {isOpen && <Filter data={_filters} getFilter={getFilter} isOpen={isOpen} onClose={onClose}  />}
      <nav className='border-b'>
        <div className='container-fluid px-6 py-2 mx-auto flex justify-between items-center'>
          <div className='flex items-center'>
            <img
              src={icon}
              width={180}
              height={40}
              className='object-contain  w-20 h-16 dark:invert-100 dark:text-gray-100 text-gray-900 '
              alt='PS services'
            />
            <h2>{t('TITLE_APP')}</h2>
          </div>
          <button
            onClick={toggle}
            className="rounded-full text-md font-medium text-white bg-[#255ce8] shadow-4xl focus:ring focus:ring-indigo-300 hover:bg-blue-700 transition ease-in-out duration-200 px-6 py-2 flex gap-2 justify-center items-center" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            {t('SEARCH')}
          </button>
        </div>
      </nav>
    </header>
  );
};
