/**
 Task: Sum from 1 to n
 
 Assumption:
 - The result will always be less than Number.MAX_SAFE_INTEGER.
 - If n <= 0, the function returns 0.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*** APPROACH A: ITERATIVE LOOP
 
 Description:
 - Uses a simple for-loop to accumulate the sum from 1 to n.
 */

export function sum_to_n_a(n: number): number {
  if (n <= 0) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

/* Time Complexity: O(n)
  Space Complexity: O(1)
 
  Pros:
  - Very clear and easy to understand.
  Cons:
  - Less efficient for large n compared to a constant-time solution.
 */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*** APPROACH B: MATHEMATICAL FORMULA
 
 Description:
  - Uses the arithmetic series formula: n * (n + 1) / 2.
 */

export function sum_to_n_b(n: number): number {
  if (n <= 0) return 0;

  return (n * (n + 1)) / 2;
}

/* Time Complexity: O(1)
  Space Complexity: O(1)
 
  Pros:
  - Most efficient approach.
  Cons:
  - Requires mathematical insight and care with numeric limits
    (safe here due to the given constraints).
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*** APPROACH C: FUNCTIONAL STYLE USING REDUCE

  Description:
  - Creates an array of numbers from 1 to n and reduces it to a sum.
 */

export function sum_to_n_c(n: number): number {
  if (n <= 0) return 0;

  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, curr) => acc + curr,
    0
  );
}

/* Time Complexity: O(n)
  Space Complexity: O(n)
 
  Pros:
  - Expressive and idiomatic in JavaScript/TypeScript.
  Cons:
  - Additional memory usage and slower than iterative or formula-based solutions.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
