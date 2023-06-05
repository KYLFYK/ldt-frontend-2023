import React, { FC } from 'react'

import { Button } from '../ui/button'

export const AuditReports: FC = () => {
    return (
        <div className="mt-x w-full">
            <div className="my-8">
                <div className="text-lg font-bold">Мои шаблоны</div>
            </div>
            <div className="grid w-full grid-cols-12 gap-4">
                <div className="col-span-3 bg-gray-50 sm:rounded-lg">
                    <div className="flex h-full flex-col px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Главному врачу
                        </h3>
                        <div className="mb-5 mt-2 max-w-xl text-sm text-gray-500">
                            <p>
                                Все стандартные показатели для отчётов
                                медицинского учреждения
                            </p>
                        </div>
                        <div className="mt-auto">
                            <Button type="button" view="secondary">
                                Сформировать →
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 bg-gray-50 sm:rounded-lg">
                    <div className="flex h-full flex-col px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Для заведующего
                        </h3>
                        <div className="mb-5 mt-2 max-w-xl text-sm text-gray-500">
                            <p>Важные показатели для заведующего отделения</p>
                        </div>
                        <div className="mt-auto">
                            <Button type="button" view="secondary">
                                Сформировать →
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 bg-gray-50 sm:rounded-lg">
                    <div className="flex h-full flex-col px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Для врачей
                        </h3>
                        <div className="mb-5 mt-2 max-w-xl text-sm text-gray-500">
                            <p>
                                Персонализированный отчёт для врачей, прошедших
                                проверку
                            </p>
                        </div>
                        <div className="mt-auto">
                            <Button type="button" view="secondary">
                                Сформировать →
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-8 flex items-center">
                <div className="text-lg font-bold">Сформировать отчет</div>
                <Button className="ml-4 w-fit" view="secondary">
                    Добавить новый
                </Button>
            </div>
            <div className="grid w-full grid-cols-12 gap-4">
                <div className="col-span-3 bg-gray-50 sm:rounded-lg">
                    <div className="flex h-full flex-col px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Презентация
                        </h3>
                        <div className="mb-5 mt-2 max-w-xl text-sm text-gray-500">
                            <p>
                                2 готовых слайда презентации для квартального
                                отчёта
                            </p>
                        </div>
                        <div className="mt-auto">
                            <Button type="button" view="secondary">
                                Сформировать →
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 bg-gray-50 sm:rounded-lg">
                    <div className="flex h-full flex-col px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            В лабораторию
                        </h3>
                        <div className="mb-5 mt-2 max-w-xl text-sm text-gray-500">
                            <p>
                                Количество исследований и количество
                                исследований сверх бюджета
                            </p>
                        </div>
                        <div className="mt-auto">
                            <Button type="button" view="secondary">
                                Сформировать →
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
