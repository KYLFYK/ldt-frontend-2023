import { combineReducers } from '@reduxjs/toolkit'

import { auditInitReducer } from './audit-initialization/slice'
import { auditsListReducer } from './audits-list/slice'
import { currentAuditReducer } from './current/slice'

export const auditsReducer = combineReducers({
    list: auditsListReducer,
    current: currentAuditReducer,
    initialization: auditInitReducer,
})
