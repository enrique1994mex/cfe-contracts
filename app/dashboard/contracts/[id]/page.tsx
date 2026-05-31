import { notFound } from "next/navigation";
import { ConsumptionList } from "@/components/consumption/ConsumptionList";

export default async function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contractId = parseInt(id, 10);

  if (isNaN(contractId)) notFound();

  return <ConsumptionList contractId={contractId} />;
}
