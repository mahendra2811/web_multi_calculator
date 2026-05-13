"use client";

import { memo, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stat } from "@/components/calculator/Stat";
import {
  matrixAdd,
  matrixDeterminant,
  matrixMultiply,
  matrixSubtract,
  matrixTranspose,
  type Matrix,
} from "@/lib/calculators/math";
import type { CalculatorRuntimeProps } from "@/types/calculator";

type Op = "add" | "sub" | "mul" | "det-a" | "det-b" | "trans-a" | "trans-b";

function buildMatrix(size: number): Matrix {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
}

function MatrixGrid({
  m,
  onChange,
}: {
  m: Matrix;
  onChange: (i: number, j: number, v: number) => void;
}) {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${m.length}, minmax(0, 1fr))` }}
    >
      {m.map((row, i) =>
        row.map((v, j) => (
          <input
            key={`${i}-${j}`}
            type="number"
            value={v}
            onChange={(e) => onChange(i, j, Number(e.target.value) || 0)}
            className="bg-surface-elevated text-text border-border focus:border-primary h-10 w-full rounded-md border px-2 text-center text-sm outline-none"
          />
        )),
      )}
    </div>
  );
}

function MatrixCalculator({ meta }: CalculatorRuntimeProps) {
  const [size, setSize] = useState(2);
  const [a, setA] = useState<Matrix>(buildMatrix(2));
  const [b, setB] = useState<Matrix>(buildMatrix(2));
  const [op, setOp] = useState<Op>("add");

  const resize = (n: number) => {
    setSize(n);
    setA(buildMatrix(n));
    setB(buildMatrix(n));
  };

  const result = useMemo<
    { kind: "matrix"; m: Matrix } | { kind: "number"; v: number } | { kind: "error" }
  >(() => {
    try {
      if (op === "add") return { kind: "matrix", m: matrixAdd(a, b) };
      if (op === "sub") return { kind: "matrix", m: matrixSubtract(a, b) };
      if (op === "mul") return { kind: "matrix", m: matrixMultiply(a, b) };
      if (op === "det-a") return { kind: "number", v: matrixDeterminant(a) };
      if (op === "det-b") return { kind: "number", v: matrixDeterminant(b) };
      if (op === "trans-a") return { kind: "matrix", m: matrixTranspose(a) };
      return { kind: "matrix", m: matrixTranspose(b) };
    } catch {
      return { kind: "error" };
    }
  }, [a, b, op]);

  const updateA = (i: number, j: number, v: number) =>
    setA((prev) => prev.map((row, ri) => row.map((c, ci) => (ri === i && ci === j ? v : c))));
  const updateB = (i: number, j: number, v: number) =>
    setB((prev) => prev.map((row, ri) => row.map((c, ci) => (ri === i && ci === j ? v : c))));

  return (
    <CalculatorShell
      meta={meta}
      onReset={() => resize(2)}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Matrices</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2">
              {[2, 3, 4].map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={size === s ? "primary" : "secondary"}
                  onClick={() => resize(s)}
                >
                  {s}×{s}
                </Button>
              ))}
            </div>
            <div>
              <p className="text-text-secondary mb-2 text-xs font-medium">Matrix A</p>
              <MatrixGrid m={a} onChange={updateA} />
            </div>
            <div>
              <p className="text-text-secondary mb-2 text-xs font-medium">Matrix B</p>
              <MatrixGrid m={b} onChange={updateB} />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["add", "sub", "mul", "det-a", "det-b", "trans-a", "trans-b"] as Op[]).map((o) => (
                <Button
                  key={o}
                  size="sm"
                  variant={op === o ? "primary" : "secondary"}
                  onClick={() => setOp(o)}
                >
                  {o
                    .replace("-a", " A")
                    .replace("-b", " B")
                    .replace("trans", "T")
                    .replace("det", "det")}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {result.kind === "error" ? (
              <p className="text-error">Operation invalid for this size</p>
            ) : result.kind === "number" ? (
              <Stat label="Determinant" value={String(result.v.toFixed(2))} tone="primary" />
            ) : (
              <div
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${result.m[0].length}, minmax(0, 1fr))` }}
              >
                {result.m.flatMap((row, i) =>
                  row.map((v, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="bg-surface text-text rounded-md p-2 text-center text-sm tabular-nums"
                    >
                      {Number.isFinite(v) ? v.toFixed(2) : "∞"}
                    </div>
                  )),
                )}
              </div>
            )}
          </CardContent>
        </Card>
      }
    />
  );
}

export default memo(MatrixCalculator);
