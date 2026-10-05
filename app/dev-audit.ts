import axe from "axe-core";
const button = document.createElement("button");
button.textContent = "Ejecutar auditoría";
button.id = "run-audit";
button.style.cssText =
  "position:fixed;bottom:12px;left:12px;z-index:1000;background:#fff;color:#111;padding:12px;border:2px solid #111";
document.body.append(button);
button.onclick = async () => {
  document.getElementById("audit-report")?.remove();
  button.textContent = "Analizando…";
  const result = await axe.run(document, {
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"],
    },
  });
  let output = document.getElementById("audit-report");
  if (!output) {
    output = document.createElement("pre");
    output.id = "audit-report";
    output.style.cssText =
      "position:fixed;inset:110px 20px 80px;overflow:auto;background:white;color:black;z-index:999;padding:20px;font-size:14px";
    document.body.append(output);
  }
  output.textContent = JSON.stringify(
    {
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      incomplete: result.incomplete.map((v) => ({
        id: v.id,
        nodes: v.nodes.length,
      })),
      passes: result.passes.length,
    },
    null,
    2,
  );
  button.textContent = "Ejecutar auditoría";
};

document.addEventListener("keydown", (e) => {
  if (e.key === "F8") button.click();
});
