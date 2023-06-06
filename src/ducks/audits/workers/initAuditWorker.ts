import { call, put } from 'redux-saga/effects'

import { AuditsApi } from '../../../api/audits/auditsApi'
import { initCreateAction } from '../audit-initialization/actions'
import {
    endInitWorker,
    setInitError,
    setInitialized,
    startInitWorker,
} from '../audit-initialization/slice'
import { loadAllAuditsAction } from '../audits-list/actions'

export function* initAuditWorker(
    action: ReturnType<typeof initCreateAction>
): Generator {
    try {
        yield put(startInitWorker())

        yield call(AuditsApi.initAudit, {
            ...action.payload.meta,
            fileId: action.payload.fileId,
            name: `${action.payload.meta.name}_${action.payload.fileId}`,
        })

        yield put(setInitialized())

        yield put(endInitWorker())
        if (action.payload?.successCallback) {
            yield call(action.payload?.successCallback)
        }

        yield put(loadAllAuditsAction())
    } catch (e) {
        yield put(setInitError())
        yield put(endInitWorker())
        if (action.payload?.errorCallback) {
            yield call(action.payload?.errorCallback)
        }
    }
}
