import React, { FC } from 'react'

import { AuditsFilter } from '../components/audits/audits-filter'
import { AuditsHeading } from '../components/audits/audits-heading'
import { AuditsTable } from '../components/audits/audits-table'

export const Audits: FC = () => {
  return (
    <div className="w-full">
      <AuditsHeading />
      <AuditsFilter />
      <AuditsTable />
    </div>
  )
}
