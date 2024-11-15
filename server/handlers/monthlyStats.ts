"use server"

import { MonthlyStat } from "@/types/monthlyStat"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export async function getMonthlyStats(): Promise<PostgrestSingleResponse<MonthlyStat[]>> {
  const supabase = createClient()
  return await supabase.from("MonthlyStats").select("*")
}

export async function getMonthlyStatsByYearAndType(
  year: number,
  type: string,
): Promise<PostgrestSingleResponse<MonthlyStat[]>> {
  const supabase = createClient()
  return await supabase.from("MonthlyStats").select("*").eq("year", year).eq("type", type)
}

export async function createMonthlyStats(
  stat: MonthlyStat,
): Promise<PostgrestSingleResponse<MonthlyStat>> {
  const supabase = createClient()
  return await supabase.from("MonthlyStats").insert(stat).select().single()
}

export async function updateMonthlyStats(
  stat: Partial<MonthlyStat>,
): Promise<PostgrestSingleResponse<MonthlyStat>> {
  const supabase = createClient()
  return await supabase.from("MonthlyStats").upsert(stat).select().single()
}
