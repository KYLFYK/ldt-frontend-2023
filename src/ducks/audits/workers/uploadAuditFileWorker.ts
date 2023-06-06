import { call, put } from 'redux-saga/effects'

import { FilesAPI } from '../../../api/files/filesApi'
import {
    initCreateAction,
    uploadAuditFileData,
} from '../audit-initialization/actions'
import {
    endFileWorker,
    setFileError,
    setMetaData,
    startFileWorker,
} from '../audit-initialization/slice'

export function* uploadAuditFileWorker(
    action: ReturnType<typeof uploadAuditFileData>
): Generator {
    try {
        yield put(startFileWorker())

        const response: any = yield call(
            FilesAPI.uploadAppointsTable,
            action.payload.file
        )

        yield put(
            setMetaData({
                fileMeta: response.data,
                initMeta: action.payload.initMeta,
            })
        )

        yield put(endFileWorker())

        if (action.payload?.successCallback) {
            yield call(action.payload?.successCallback)
        }

        yield put(
            initCreateAction({
                meta: action.payload.initMeta,
                fileId: response.data.id,
            })
        )
    } catch (e) {
        yield put(endFileWorker())
        yield put(setFileError())
        if (action.payload?.errorCallback) {
            yield call(action.payload?.errorCallback)
        }
    }
}
