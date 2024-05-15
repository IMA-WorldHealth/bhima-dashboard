import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Error404 from '../../assets/lottie/404-not-found.json';

export const FourByFour = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="container px-6 py-6">
        <div className="grid h-screen place-items-center">
          <div className="card bg-white shadow-xl px-3 py-6 text-slate-800 w-1/2 rounded-sm">
            <div className="flex flex-col justify-center ">
              <Lottie
                className="h-96"
                animationData={Error404}
                loop={true}
                style={{
                  objectFit: 'contain'
                }}
              />
              <div className="grid place-items-center">
                <h3 className="">{t('NOT.404')} 😭</h3>
                <p className="mb-4 text-center w-96">{t('NOT.PAGE')}</p>
                <Link to="/" className="rounded-full text-md font-medium text-white bg-[#255ce8] shadow-4xl focus:ring focus:ring-indigo-300 hover:bg-blue-700 transition ease-in-out duration-200 px-6 py-2 flex gap-2 justify-center items-center">
                  <i className="ri-home-5-line me-1"></i>
                  {t('BACK_HOME')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
