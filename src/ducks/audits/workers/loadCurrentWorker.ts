import { call, put } from 'redux-saga/effects'

import { findArray } from '../../../utils/common'
import { selectState } from '../../index'
import { loadCurrentAudit } from '../current/actions'
import {
    endCurrentAuditWorker,
    setCurrentAudit,
    setCurrentAuditError,
    startCurrentAuditWorker,
} from '../current/slice'

export function* loadCurrentWorker(
    action: ReturnType<typeof loadCurrentAudit>
): Generator {
    try {
        yield put(startCurrentAuditWorker())

        const auditsList: any = yield selectState((state) => state.audits.list)

        const response: any = yield call(
            // @ts-ignore
            findArray,
            auditsList.data as any[],
            (el: { id: string | number }) => {
                return el.id === action.payload.id
            }
        )

        if (response) {
            yield put(setCurrentAudit(response))
            yield put(endCurrentAuditWorker())
            if (action.payload?.successCallback) {
                yield call(action.payload?.successCallback)
            }
        } else {
            yield put(setCurrentAuditError())
            yield put(endCurrentAuditWorker())
            if (action.payload?.errorCallback) {
                yield call(action.payload?.errorCallback)
            }
        }
    } catch (e) {
        yield put(setCurrentAuditError())
        yield put(endCurrentAuditWorker())
        if (action.payload?.errorCallback) {
            yield call(action.payload?.errorCallback)
        }
    }
}
