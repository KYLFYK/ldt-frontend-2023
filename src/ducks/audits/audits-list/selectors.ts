import { useAppSelector } from '../../index'

export const useAuditsSelector = () =>
  useAppSelector((state) => state.audits.list)
