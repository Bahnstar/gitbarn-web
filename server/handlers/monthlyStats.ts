"use server"

import { MonthlyStat } from "@/types/monthlyStat"
import { createClient } from "@/utils/supabase/server"

export async function createMontlyStats(stat: MonthlyStat) {
  const supabase = createClient()
  return await supabase.from("MonthlyStats").insert(stat).select().single()
}

export async function updateMonthlyStats(stat: Partial<MonthlyStat>) {
  const supabase = createClient()
  return await supabase.from("MonthlyStats").upsert(stat).select().single()
}
