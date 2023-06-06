import React, { FC, Fragment, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { AppointsTab } from '../components/audit/appoints-tab'
import { AuditHeading } from '../components/audit/audit-heading'
import { AuditReports } from '../components/audit/audit-reports'
import { MainInfoTab } from '../components/audit/main-info-tab'
import { EmptyState } from '../components/ui/empty-state'
import { Loader } from '../components/ui/loader'
import { Tabs } from '../components/ui/tabs'
import { useAppDispatch } from '../ducks'
import { useAuditsSelector } from '../ducks/audits/audits-list/selectors'
import { loadCurrentAudit } from '../ducks/audits/current/actions'
import { useCurrentAudit } from '../ducks/audits/current/selectors'
import { TabList } from '../types/common/components-data'

export const Audit: FC = () => {
    const dispatch = useAppDispatch()
    const params = useParams<{
        auditId: string
    }>()

    const auditListData = useAuditsSelector()
    const { loading, error, loaded, data } = useCurrentAudit()

    const tabList: TabList = useMemo(() => {
        if (loaded && !loading && data) {
            return [
                {
                    name: 'Основная информация',
                    key: 'main_info',
                    component: (
                        <>
                            {data && (
                                <MainInfoTab
                                    dateStart={data.dateStart}
                                    dateEnd={data.dateEnd}
                                    auditReason={data.auditReason}
                                    auditType={data.type}
                                    responsible={data.responsible}
                                    stats={data.allStats}
                                />
                            )}
                        </>
                    ),
                },
                {
                    name: 'Назначения',
                    key: 'appointment',
                    component: <>{data && <AppointsTab />}</>,
                },
                {
                    name: 'Отчёты',
                    key: 'reports',
                    component: <AuditReports />,
                },
            ]
        } else return []
    }, [data])

    useEffect(() => {
        if (
            (!loaded && !error && !loading && auditListData.loaded) ||
            (!loading &&
                !error &&
                data &&
                data.id !== Number(params.auditId) &&
                auditListData.loaded)
        ) {
            dispatch(
                loadCurrentAudit({
                    id: Number(params.auditId),
                })
            )
        }
    }, [loaded, data, error, params, loading, auditListData.loaded])

    return (
        <div className="w-full">
            {loaded && data && !loading && !error && !auditListData.loading && (
                <Fragment>
                    <AuditHeading
                        title={data.name}
                        status={data.status}
                        links={data.resultDocs}
                    />
                    <Tabs tabs={tabList} containerClassName="mt-4" />
                </Fragment>
            )}
            {(loading || auditListData.loading) && (
                <div className="flex h-80 w-full items-center justify-center">
                    <Loader />
                </div>
            )}
            {error && auditListData.loading && (
                <EmptyState
                    title={'Не найдена проверка'}
                    description={'Попробуйте поискать проверку в списке'}
                    containerClassName="w-full"
                />
            )}
        </div>
    )
}
