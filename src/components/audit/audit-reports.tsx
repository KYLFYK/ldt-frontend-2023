import React, { FC } from 'react'

export const AuditReports: FC = () => {
  return (
    <div className="mt-x w-full">
      <div className="my-8 text-lg font-bold">Сформировать отчет</div>
      <div className="w-fit bg-gray-50 sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Главному врачу
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Все стандартные показатели для отчётов медицинского учреждения
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              disabled={true}
              className="inline-flex cursor-pointer items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Сформировать →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
