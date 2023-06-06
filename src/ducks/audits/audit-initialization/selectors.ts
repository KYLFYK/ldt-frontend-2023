import { useAppSelector } from '../../index'

export const useAuditInitSelector = () =>
    useAppSelector((state) => state.audits.initialization)
