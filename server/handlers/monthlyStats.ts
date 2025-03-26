"use server"

import { MonthlyStat } from "@/types/monthlyStat"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export async function getMonthlyStats(): Promise<PostgrestSingleResponse<MonthlyStat[]>> {
  const supabase = await createClient()
  return await supabase.from("MonthlyStats").select("*")
}

export async function getLast12MonthsStatsByType(
  type: string,
): Promise<PostgrestSingleResponse<MonthlyStat[]>> {
  const supabase = await createClient()
  return await supabase.from("last_12_month_order_stats").select("*")
}

export async function getMonthlyStatsByYearAndType(
  year: number,
  type: string,
): Promise<PostgrestSingleResponse<MonthlyStat[]>> {
  const supabase = await createClient()
  return await supabase
    .from("MonthlyStats")
    .select("*")
    .eq("year", year)
    .eq("type", type)
    .order("month")
}

export async function createMonthlyStats(
  stat: MonthlyStat,
): Promise<PostgrestSingleResponse<MonthlyStat>> {
  const supabase = await createClient()
  return await supabase.from("MonthlyStats").insert(stat).select().single()
}

export async function updateMonthlyStats(
  stat: Partial<MonthlyStat>,
): Promise<PostgrestSingleResponse<MonthlyStat>> {
  const supabase = await createClient()
  return await supabase.from("MonthlyStats").upsert(stat).select().single()
}
