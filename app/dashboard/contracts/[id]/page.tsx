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
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[2fr_1fr] lg:items-start">
      <ConsumptionList contractId={contractId} />
      <InsightsPanel contractId={contractId} />
    </div>
  );
}
