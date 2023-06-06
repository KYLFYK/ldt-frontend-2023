import { takeLeading } from 'redux-saga/effects'

import {
    initCreateAction,
    uploadAuditFileData,
} from './audit-initialization/actions'
import { loadAllAuditsAction } from './audits-list/actions'
import { loadCurrentAudit } from './current/actions'
import { initAuditWorker } from './workers/initAuditWorker'
import { loadAllWorker } from './workers/loadAllWorker'
import { loadCurrentWorker } from './workers/loadCurrentWorker'
import { uploadAuditFileWorker } from './workers/uploadAuditFileWorker'

export function* auditsSaga(): Generator {
    yield takeLeading(loadAllAuditsAction, loadAllWorker)
    yield takeLeading(loadCurrentAudit, loadCurrentWorker)
    yield takeLeading(uploadAuditFileData, uploadAuditFileWorker)
    yield takeLeading(initCreateAction, initAuditWorker)
}
