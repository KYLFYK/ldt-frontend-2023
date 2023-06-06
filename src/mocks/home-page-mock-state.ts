import dayjs from 'dayjs'

import { AuditResultStatus } from '../types/audits'

export const HomePageMockState = [
    {
        date: dayjs().format('DD.MM'),
        [AuditResultStatus.SUCCESS]: 4000,
        [AuditResultStatus.WARNING]: 2400,
        [AuditResultStatus.DANGER]: 2400,
    },
    {
        date: dayjs().add(1, 'days').format('DD.MM'),
        [AuditResultStatus.SUCCESS]: 3000,
        [AuditResultStatus.WARNING]: 1398,
        [AuditResultStatus.DANGER]: 2210,
    },
    {
        date: dayjs().add(2, 'days').format('DD.MM'),
        [AuditResultStatus.SUCCESS]: 2000,
        [AuditResultStatus.WARNING]: 9800,
        [AuditResultStatus.DANGER]: 2290,
    },
    {
        date: dayjs().add(3, 'days').format('DD.MM'),
        [AuditResultStatus.SUCCESS]: 2780,
        [AuditResultStatus.WARNING]: 3908,
        [AuditResultStatus.DANGER]: 2000,
    },
    {
        date: dayjs().add(4, 'days').format('DD.MM'),
        [AuditResultStatus.SUCCESS]: 1890,
        [AuditResultStatus.WARNING]: 4800,
        [AuditResultStatus.DANGER]: 2181,
    },
    {
        date: dayjs().add(5, 'days').format('DD.MM'),
        [AuditResultStatus.SUCCESS]: 2390,
        [AuditResultStatus.WARNING]: 3800,
        [AuditResultStatus.DANGER]: 2500,
    },
    {
        date: dayjs().add(6, 'days').format('DD.MM'),
        [AuditResultStatus.SUCCESS]: 3490,
        [AuditResultStatus.WARNING]: 4300,
        [AuditResultStatus.DANGER]: 2100,
    },
]
