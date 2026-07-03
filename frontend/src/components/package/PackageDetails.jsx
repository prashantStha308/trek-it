import Badge from "@/components/ui/Badge";
import Card from "@/components/layout/Card";
import {Button} from "@/components/ui/Button";
import MiniCard from "@/components/ui/MiniCard";
import InfoRow from "@/components/ui/InfoRow";
import {STATUS_VARIANT} from "@/constants/theme.constants.js";
import {formatDate} from "@/utils/utils.helper.js";


export default function PackageDetails({pkg}){
    return(
        <Card title="Package Details">
            <InfoRow label="Activities" value={pkg?.activities.join(", ")} />

            <InfoRow label="Duration" value={`${pkg?.daysAlloted} days`} />

            <InfoRow label="Max group size" value={pkg?.maxGroupSize} />

            <InfoRow
                label="Permit"
                value={ pkg?.requiresPermit ?
                    <Badge variant="red" size="xs">Required</Badge>
                    :
                    <Badge variant="green" size="xs">Not required</Badge>
                }
            />

            <InfoRow
                label="Verified"
                value={ pkg?.verified ?
                    <Badge variant="green" size="xs">Yes</Badge>
                    :
                    <Badge variant="blue" size="xs">Unverified</Badge>
                }
            />
        </Card>
    )
}
