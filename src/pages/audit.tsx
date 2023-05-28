import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { AppointsTab } from '../components/audit/appoints-tab'
import { AuditHeading } from '../components/audit/audit-heading'
import { AuditReports } from '../components/audit/audit-reports'
import { MainInfoTab } from '../components/audit/main-info-tab'
import { Tabs } from '../components/ui/tabs'
import { useAuditContext } from '../contexts/audit-context'
import { TAuditPageResult } from '../types/audits/audit-results'
import { TabList } from '../types/common/components-data'

export const Audit: FC = () => {
  const { data } = useAuditContext()
  const params = useParams<{
    auditId: string
  }>()

  const currentAudit = useMemo(() => {
    return data.find(
      (el) => el.id === Number(params.auditId)
    ) as TAuditPageResult
  }, [data, params])

  const tabList: TabList = useMemo(
    () => [
      {
        name: 'Основная информация',
        key: 'main_info',
        component: (
          <>
            {currentAudit && (
              <MainInfoTab
                dateStart={currentAudit.dateStart}
                dateEnd={currentAudit.dateEnd}
                auditReason={currentAudit.auditReason}
                auditType={currentAudit.type}
                responsible={currentAudit.responsible}
              />
            )}
          </>
        ),
      },
      {
        name: 'Назначения',
        key: 'appointment',
        component: (
          <>
            {currentAudit && (
              <AppointsTab
                appointsList={currentAudit.result}
                auditId={currentAudit.id}
              />
            )}
          </>
        ),
      },
      {
        name: 'Отчёты',
        key: 'reports',
        component: <AuditReports />,
      },
    ],
    [currentAudit, data, params]
  )

  return (
    <div>
      {currentAudit && (
        <AuditHeading title={currentAudit.name} status={currentAudit.status} />
      )}
      <Tabs tabs={tabList} containerClassName="mt-4" />
    </div>
  )
}
