import { z } from "zod";

// export const InquirySchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: "Please enter at least 2 characters for your name." }),
//   email: z.string().email({ message: "Please enter a valid email address." }),
//   subject: z.string().min(1, { message: "Please enter a subject." }),
//   message: z
//     .string()
//     .min(5, { message: "Please enter at least 5 characters for the message." }),
// });


// export const IssueSchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: "Please enter at least 2 characters for your name." }),
//   email: z.string().email({ message: "Please enter a valid email address." }),
//   subject: z.string().min(1, { message: "Please enter a subject." }),
//   description: z
//     .string()
//     .min(5, { message: "Please enter at least 5 characters for the description." }),
// });


// export const SignUpSchema = z
//   .object({
//     name: z.string().min(1, "Name is required"),
//     phone: z.string().min(8, "Phone number is required"),
//     email: z.string().email("Invalid email format"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//     address: z.string().min(1, "Address is required"),
//     state: z.string().min(1, "State is required"),
//     city: z.string().min(1, "City is required"),
//     zip: z
//       .string()
//       .length(5, "Zip code must be exactly 5 digits")
//       .regex(/^\d+$/, "Zip code must contain only digits"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });
