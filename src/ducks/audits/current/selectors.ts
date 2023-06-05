import { useAppSelector } from '../../index'

export const useCurrentAudit = () =>
    useAppSelector((state) => state.audits.current)
