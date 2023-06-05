import { takeLeading } from 'redux-saga/effects'

import { loadAllAuditsAction } from './audits-list/actions'
import { loadCurrentAudit } from './current/actions'
import { loadAllWorker } from './workers/loadAllWorker'
import { loadCurrentWorker } from './workers/loadCurrentWorker'

export function* auditsSaga(): Generator {
    yield takeLeading(loadAllAuditsAction, loadAllWorker)
    yield takeLeading(loadCurrentAudit, loadCurrentWorker)
}
