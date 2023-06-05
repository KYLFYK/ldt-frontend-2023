import { call, put } from 'redux-saga/effects'

import { AuditsApi } from '../../../api/audits/auditsApi'
import { loadAllAuditsAction } from '../audits-list/actions'
import {
  endAuditListWorker,
  setAuditsError,
  setAuditsList,
  startAuditListWorker,
} from '../audits-list/slice'

export function* loadAllWorker(
  action: ReturnType<typeof loadAllAuditsAction>
): Generator {
  try {
    yield put(startAuditListWorker())
    const response: any = yield call(AuditsApi.getAll)

    yield put(
      setAuditsList(
        response.data.map((el: any) => ({
          ...el.result,
          id: el.id,
        }))
      )
    )
    yield put(endAuditListWorker())
    if (action.payload?.successCallback) {
      yield call(action.payload?.successCallback)
    }
  } catch (e) {
    yield put(endAuditListWorker())
    yield put(setAuditsError())
    if (action.payload?.errorCallback) {
      yield call(action.payload?.errorCallback)
    }
  }
}
