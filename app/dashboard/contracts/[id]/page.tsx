import { notFound } from "next/navigation";
import { ConsumptionList } from "@/components/consumption/ConsumptionList";
import { InsightsPanel } from "@/components/ai-insights/InsightsPanel";

export default async function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contractId = parseInt(id, 10);

  if (isNaN(contractId)) notFound();

  return (
    <div className="space-y-6">
      <ConsumptionList contractId={contractId} />
      <InsightsPanel contractId={contractId} />
    </div>
  );
}
