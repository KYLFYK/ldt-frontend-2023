import { all, call, put, spawn } from 'redux-saga/effects'

import { auditsSaga } from './audits/auditsSaga'

export function* rootSaga(): Generator {
    const sagas = [auditsSaga]

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga)
                        break
                    } catch (e: any) {
                        if (e.response.status === 401) {
                            yield put({ type: 'reset/token' })
                        }
                    }
                }
            })
        )
    )
}
