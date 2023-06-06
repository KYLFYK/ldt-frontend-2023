import React, { FC, Fragment, useMemo } from 'react'

import { appointStatusToColor, scoreNumToStatus } from '../../utils/audits'
import { classNames } from '../../utils/common'

type TProps = {
    appointMaybe: {
        actualRecommendation: string
        conjunction: {
            [1]: {
                mcbRecommendation: string
                score: number
            }
            [2]: {
                mcbRecommendation: string
                score: number
            }
            [3]: {
                mcbRecommendation: string
                score: number
            }
        }
    }
    pattern: RegExp
}

const RecItem = ({ text, pattern }: { text: string; pattern: RegExp }) => {
    const textMatcher = useMemo(() => {
        const matchedArray = text.toLowerCase().match(pattern)
        return text.split(' ').map((el) => {
            if (matchedArray?.includes(el.toLowerCase())) {
                return (
                    <Fragment key={el}>
                        <span className="rounded bg-green-400">{el}</span>{' '}
                    </Fragment>
                )
            } else
                return (
                    <Fragment key={el}>
                        <span>{el}</span>{' '}
                    </Fragment>
                )
        })
    }, [])

    return (
        <span>
            {text.length > 0 ? textMatcher : 'Не найдено' ?? 'Не найдено'}
        </span>
    )
}

export const AppointMaybe: FC<TProps> = ({ appointMaybe, pattern }) => {
    return (
        <span
            className="flex gap-4 text-sm text-gray-800"
            key={appointMaybe.actualRecommendation}
        >
            {['0', '1', '2'].map((conItem, index) => (
                <div key={index}>
                    <RecItem
                        text={appointMaybe.conjunction[
                            (index + 1) as 1 | 2 | 3
                        ].mcbRecommendation.trim()}
                        pattern={pattern}
                    />{' '}
                    |{' '}
                    <span
                        className={classNames(
                            appointStatusToColor(
                                scoreNumToStatus(
                                    Number(
                                        appointMaybe.conjunction[
                                            (index + 1) as 1 | 2 | 3
                                        ].score
                                    )
                                )
                            ),
                            'rounded px-2 text-gray-900'
                        )}
                    >
                        {
                            appointMaybe.conjunction[(index + 1) as 1 | 2 | 3]
                                .score
                        }
                        %
                    </span>
                </div>
            ))}
        </span>
    )
}
