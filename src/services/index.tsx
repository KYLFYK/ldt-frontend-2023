import React from 'react'
import { FC, PropsWithChildren } from 'react'

import { AuditsService } from './audits-service'

export const Services: FC<PropsWithChildren> = ({ children }) => {
    return <AuditsService>{children}</AuditsService>
}
