import { combineReducers } from '@reduxjs/toolkit'

import { auditsListReducer } from './audits-list/slice'
import { currentAuditReducer } from './current/slice'

export const auditsReducer = combineReducers({
    list: auditsListReducer,
    current: currentAuditReducer,
})
