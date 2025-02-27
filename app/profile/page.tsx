import { redirect } from "next/navigation";

export default function ProfilePage() {
  redirect("/profile/orders");
  return null; // This ensures the component doesn't render anything
}
