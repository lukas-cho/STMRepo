import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-screen max-w-3xl md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
