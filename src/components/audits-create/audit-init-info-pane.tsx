import React, { FC } from 'react'

import { RoutePaths } from '../../utils/routes/route-paths'
import { InfoAlert } from '../ui/info-alert'

type TProps = {
    initComplete: boolean
}

export const AuditInitInfoPane: FC<TProps> = ({ initComplete }) => {
    return (
        <div className="col-span-full flex h-96 items-center justify-center">
            <InfoAlert
                text={
                    !initComplete
                        ? 'Проводим аудит назначений'
                        : 'Аудит проведен'
                }
                subText={
                    !initComplete
                        ? 'Примерное время ожидания - 5 секунд. По окончанию, аудит появится в списке проверок'
                        : 'Аудит проведен и доступен в общем списке'
                }
                detailsText="К списку проверок"
                detailsHref={RoutePaths.AUDITS}
                loading={!initComplete}
            />
        </div>
    )
}
