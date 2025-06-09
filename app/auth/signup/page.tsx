import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignupForm from "@/pages/SignUpForm";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/chat");

  return <SignupForm />;
}
