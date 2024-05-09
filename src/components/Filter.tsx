import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import EPeriodsSelect from './EperiodSelect';

interface FilterProps {
  data: SearchType;
  isOpen: boolean;
  onClose: () => void;
  getFilter: (filter: SearchType) => void;
}

export const Filter: React.FC<FilterProps> = ({ data, isOpen, onClose, getFilter }) => {
  const { t } = useTranslation();
  const [defaultFilter, setFilter] = useState<SearchType>({
    filter: data.filter,
    periode: data.periode,
    displayValue: data.displayValue
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getFilter(defaultFilter);
    onClose();
  };
  return (
    <Transition appear show={isOpen} >
      <Dialog as="div" className="relative z-40 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className=" min-w-lg  space-y-4 border bg-white p-3 rounded-lg">
                <form onSubmit={handleSubmit}>
                  <div className=" flex justify-between">
                    <DialogTitle as="h3" className="text-base/7 font-medium">
                      <h5 className="text-xl font-medium leading-normal">
                        {t('FILTER_DEFAULT')}
                      </h5>
                    </DialogTitle>
                    {/* <!--Close button--> */}
                    <button
                      type="button"
                      className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2">
                    <EPeriodsSelect
                      defaultPeriod={defaultFilter.periode.key}
                      periodFilter={defaultFilter.periode}
                      onSelect={({ period }) => {
                        setFilter({
                          ...defaultFilter,
                          periode: period
                        });
                      }}
                    />
                  </div>
                  <button className="rounded-sm mt-4 text-md font-medium text-white bg-blue-400 shadow-4xl focus:ring focus:ring-indigo-300 hover:bg-blue-500 transition ease-in-out duration-200 px-6 py-2 flex gap-2 items-end">
                    {t('SUBMIT')}
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}