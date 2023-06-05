import React, { FC, Fragment, PropsWithChildren, useEffect } from 'react'

import { useAppDispatch } from '../ducks'
import { loadAllAuditsAction } from '../ducks/audits/audits-list/actions'
import { useAuditsSelector } from '../ducks/audits/audits-list/selectors'

export const AuditsService: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { loading, loaded, error } = useAuditsSelector()

  useEffect(() => {
    if (!loaded && !error && !loading) {
      dispatch(loadAllAuditsAction())
    }
  }, [loaded, error, loading])

  return <Fragment>{children}</Fragment>
}
