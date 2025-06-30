import { z } from "zod";

export const NewMenuSchema = z.object({
  menu_category_id: z
    .string({ required_error: "메뉴 카테고리를 선택하세요." })
    .min(1, { message: "메뉴 카테고리를 반드시 선택하세요." }),
  menu_name: z
    .string({ required_error: "메뉴명을 입력하세요." })
    .min(1, { message: "메뉴명을 입력해 주세요." }),
  menu_contact_email: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: "유효한 이메일을 입력하세요." }
    ),

  menu_url: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        return /^((https?:\/\/)?([\w-]+\.)+[\w-]{2,})(\/[\w-.~:?#[\]@!$&'()*+,;=]*)?$/.test(
          val
        );
      },
      { message: "유효한 URL 형식이어야 합니다." }
    ),

  menu_ingredient: z
    .string()
    .max(5000, "재료 및 준비물은 5000자 이하로 입력하세요."),
  menu_instruction: z
    .string()
    .max(30000, "조리 및 제조 설명은 30000자 이하로 입력하세요."),

  serving_size: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      { message: "0보다 큰 숫자를 입력하세요." }
    ),
  total_cost: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      { message: "0보다 큰 숫자를 입력하세요." }
    ),

  menu_image: z.any().optional(),
});

export const MissionTeamMenuSchema = z.object({
  mission_team_id: z
    .string({
      required_error: "판매 선교팀을 선택하세요.",
    })
    .min(1, { message: "판매 선교팀을 선택하세요." }),
  menu_id: z.string().min(1, { message: "메뉴를 선택하세요." }),
  unit_price: z
    .string()
    .min(1, { message: "개당 가격을 입력하세요." }) // 빈 값 체크
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "0보다 큰 숫자를 입력하세요.",
    }),
  quantity_available: z
    .string()
    .min(1, { message: "준비한 수량을 입력하세요." }) // 빈 값 체크
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "0 이상의 숫자를 입력하세요.",
    }),
  quantity_sold: z
    .string()
    .min(1, { message: "판매된 수량을 입력하세요." }) // 빈 값 체크
    .refine(
      (val) =>
        val === undefined ||
        val === "" ||
        (!isNaN(Number(val)) && Number(val) >= 0),
      { message: "0 이상의 숫자를 입력하세요." }
    ),

  total_sales_amount: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || (!isNaN(Number(val)) && Number(val) >= 0),
      { message: "0 이상의 숫자를 입력하세요." }
    ),
  ingredient_cost_amount: z
    .string()
    .min(1, { message: "총 재료비를 입력하세요." }) // 빈 값 체크
    .nullable()
    .refine(
      (val) =>
        val === undefined ||
        val === null ||
        val === "" ||
        (!isNaN(Number(val)) && Number(val) >= 0),
      { message: "0 이상의 숫자를 입력하세요." }
    ),
  sales_tip: z.string().max(5000).optional(),
  profit_margin: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || (!isNaN(Number(val)) && Number(val) >= 0),
      { message: "0 이상의 숫자를 입력하세요." }
    ),
});

export const MissionTeamSchema = z
  .object({
    country: z.string().min(1, "국가를 선택하세요"),
    year: z
      .number({ invalid_type_error: "연도를 숫자로 입력하세요" })
      .int("정수여야 합니다")
      .min(1900, "올바른 연도를 입력하세요")
      .max(2100, "올바른 연도를 입력하세요"),
    member_count: z
      .number({ invalid_type_error: "인원 수를 숫자로 입력하세요" })
      .int("정수여야 합니다")
      .min(1, "인원 수는 1 이상이어야 합니다"),
    description: z.string().optional(),
    contact_email: z
      .string()
      .email("이메일 형식이 아닙니다")
      .optional()
      .or(z.literal("")),
    period_start: z.string().optional(),
    period_end: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.period_start && data.period_end) {
        const start = new Date(data.period_start);
        const end = new Date(data.period_end);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return true; // 유효하지 않은 날짜는 비교 안 함
        return start <= end;
      }
      return true;
    },
    {
      message: "종료 날짜는 시작 날짜 이후여야 합니다.",
      path: ["period_end"],
    }
  );
