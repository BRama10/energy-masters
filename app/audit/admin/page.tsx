import { AuditDashboard } from './dashboard'
import { getAudits } from '@/lib/actions/audit'

export default async function Page() {
    const audits = await getAudits(null);
    console.log(audits)

    return <AuditDashboard audits={audits.data} />
}