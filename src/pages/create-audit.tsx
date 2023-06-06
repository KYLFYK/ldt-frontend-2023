import dayjs from 'dayjs'
import { Form, Formik } from 'formik'
import React, {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { AuditInitInfoPane } from '../components/audits-create/audit-init-info-pane'
import { AuditMainParamsForm } from '../components/audits-create/audit-main-params-form'
import { AuditsCreateHeading } from '../components/audits-create/audits-create-heading'
import { CheckoutSettings } from '../components/audits-create/checkout-settings'
import { TSubmitAction } from '../components/audits-create/create-form'
import { useAppDispatch } from '../ducks'
import { uploadAuditFileData } from '../ducks/audits/audit-initialization/actions'
import { useAuditInitSelector } from '../ducks/audits/audit-initialization/selectors'
import { clearInitialization } from '../ducks/audits/audit-initialization/slice'
import { AuditStartType, AuditType } from '../types/audits'
import { CheckoutStatus } from '../types/common/data-types'
import { UserRole } from '../types/users'

export const CreateAudit: FC = () => {
    const dispatch = useAppDispatch()

    const { initPending, filePending, initComplete } = useAuditInitSelector()

    const isSomePending = useMemo(
        () => initPending || filePending,
        [initPending, filePending]
    )

    const [file, setFile] = useState<File | undefined>(undefined)

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }, [])

    const clearFile = useCallback(() => {
        setFile(undefined)
    }, [])

    const handleFinishForm = useCallback<TSubmitAction>(
        (formValues) => {
            if (file) {
                dispatch(
                    uploadAuditFileData({
                        file,
                        initMeta: {
                            name: formValues.name,
                            type: formValues.type,
                            status: CheckoutStatus.COMPLETED,
                            dateStart: dayjs().toISOString(),
                            dateEnd: dayjs(formValues.endDate).toISOString(),
                            responsible: {
                                id: '1',
                                firstName: 'И',
                                lastName: 'Иванов',
                                patronymic: 'И',
                                role: UserRole.EXPERT_DEPUTY,
                            },
                            auditReason: formValues.auditReason,
                        },
                    })
                )
            }
        },
        [file]
    )

    useEffect(() => {
        return () => {
            dispatch(clearInitialization())
        }
    }, [])

    return (
        <Formik
            initialValues={{
                name: '',
                responsible: '',
                startType: AuditStartType.NOW,
                endDate: '',
                type: AuditType.TARGET,
                auditReason: '',
                datasetFilters: {
                    mkbCodes: [],
                    doctorsId: [],
                    date: {
                        start: '',
                        end: '',
                    },
                },
            }}
            onSubmit={handleFinishForm}
        >
            <div className="w-full">
                {!(isSomePending || initComplete) && (
                    <AuditsCreateHeading haveFile={!!file} />
                )}
                <Form>
                    <div className="grid grid-cols-12 gap-5 divide-x">
                        {isSomePending || initComplete ? (
                            <AuditInitInfoPane initComplete={initComplete} />
                        ) : (
                            <>
                                <AuditMainParamsForm />
                                <CheckoutSettings
                                    file={file}
                                    clearFile={clearFile}
                                    handleFileChange={handleFileChange}
                                />
                            </>
                        )}
                    </div>
                </Form>
            </div>
        </Formik>
    )
}
