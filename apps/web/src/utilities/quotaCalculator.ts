export function calculateQuota(costExpression: string, upperLimit: number): number | null {
  try {
    // Replace spaces and validate expression
    const expr = costExpression.trim().replace(/\s+/g, "");
    if (!expr) return null;

    // Only allow numbers, +, -, *, /, and parentheses
    if (!/^[0-9+\-*/().,]+$/.test(expr)) {
      return null;
    }

    // Safely evaluate the expression
    // eslint-disable-next-line no-eval
    const cost = parseFloat(eval(expr));

    if (isNaN(cost)) return null;

    const quota = upperLimit - cost;
    return quota;
  } catch (error) {
    return null;
  }
}
