
import { supabase } from "@/lib/supabaseClient";

export async function fetchSalesAndQuantityData(menuId: string) {

    type MissionTeamMenuRow = {
        total_sales_amount: number;
        ingredient_cost_amount: number;
        quantity_sold: number;
        quantity_available: number;
        mission_teams: {
            year: number;
        } | null;
    };

  const { data, error } = await (
    supabase
        .from('mission_team_menus')
        .select(`
            total_sales_amount,
            ingredient_cost_amount,
            quantity_sold,
            quantity_available,
            mission_teams ( year )
        `) 
        .eq('menu_id', menuId)
     ) as unknown as { data: MissionTeamMenuRow[]; error: any };

  if (error || !data) return { salesData: [], quantityData: [] };

  const grouped: Record<number, {
    sales: number;
    cost: number;
    margin: number;
    sold: number;
    available: number;
  }> = {};

  for (const row of data) {
    const year = row.mission_teams?.year;
    if (!year) continue;

    if (!grouped[year]) {
      grouped[year] = {
        sales: 0,
        cost: 0,
        margin: 0,
        sold: 0,
        available: 0,
      };
    }

    grouped[year].sales += Number(row.total_sales_amount || 0);
    grouped[year].cost += Number(row.ingredient_cost_amount || 0);
    grouped[year].margin += Number(row.total_sales_amount || 0) - Number(row.ingredient_cost_amount || 0);
    grouped[year].sold += Number(row.quantity_sold || 0);
    grouped[year].available += Number(row.quantity_available || 0);
  }

  const salesData = Object.entries(grouped).map(([year, values]) => ({
    year: parseInt(year),
    sales: values.sales,
    cost: values.cost,
    margin: values.margin,
  }));

  const quantityData = Object.entries(grouped).map(([year, values]) => ({
    year: parseInt(year),
    sold: values.sold,
    available: values.available,
    remaining: values.available - values.sold,
  }));

  return { salesData, quantityData };
}