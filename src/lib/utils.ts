// Utility function for className merging (shadcn/ui standard)
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
