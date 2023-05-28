import axios from 'axios'
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { BASE_URL } from '../constants/app'
import { TAuditPageResult } from '../types/audits/audit-results'

const initValue = {
  data: [],
  loaded: false,
  loading: false,
  error: false,
  // tslint:disable-next-line:no-empty
  setLoaded: () => {},
}

export const AUDIT_CONTEXT = createContext<{
  data: TAuditPageResult[]
  loaded: boolean
  loading: boolean
  error: boolean
  setLoaded: (state: boolean) => void
}>({
  ...initValue,
  // tslint:disable-next-line:no-empty
  setLoaded: () => {},
})

export const useAuditContext = () => useContext(AUDIT_CONTEXT)

export const AuditContext: FC<PropsWithChildren> = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TAuditPageResult[]>([])
  const [error, setError] = useState(false)

  const fetchAudits = useCallback(async () => {
    try {
      setLoading(() => true)

      const resp = await axios.get(BASE_URL + '/many/initialize')

      setData(() =>
        resp.data.map((el: any) => ({
          ...el.result,
          id: el.id,
        }))
      )
      setError(() => false)
      setLoaded(true)
      setLoading(false)
    } catch (e) {
      setError(true)
    }
  }, [])

  useEffect(() => {
    if (!loaded && !loading && !error) {
      void fetchAudits()
    }
  }, [loaded, loading, error])

  if (loading) {
    return null
  }

  return (
    <AUDIT_CONTEXT.Provider
      value={{
        data,
        loaded,
        error,
        loading,
        setLoaded,
      }}
    >
      {children}
    </AUDIT_CONTEXT.Provider>
  )
}
