"use client";

import { useState } from "react";
import { useContractInsights } from "@/features/ai-insights/hooks";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

interface InsightsPanelProps {
  contractId: number;
}

export function InsightsPanel({ contractId }: InsightsPanelProps) {
  const [enabled, setEnabled] = useState(false);
  const { data, isLoading, isError, error, refetch } = useContractInsights(
    enabled ? contractId : null
  );

  if (!enabled) {
    return (
      <Card className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">Análisis con IA</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Obtén recomendaciones sobre tu historial de consumo.
          </p>
        </div>
        <Button variant="secondary" onClick={() => setEnabled(true)}>
          Analizar
        </Button>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-gray-400">Analizando consumo…</p>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <p className="text-sm font-semibold text-gray-900 mb-1">Análisis con IA</p>
        <p className="text-sm text-red-500">
          {(error as Error)?.message ?? "No se pudo generar el análisis."}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Reintentar
        </button>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-gray-900">Análisis con IA</p>
        <button
          onClick={() => refetch()}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Actualizar
        </button>
      </div>

      <div className="space-y-5">
        <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>

        {data.anomalies.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Anomalías detectadas
            </p>
            <ul className="space-y-2">
              {data.anomalies.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 text-amber-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.recommendations.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Recomendaciones
            </p>
            <ul className="space-y-2">
              {data.recommendations.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 text-green-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
