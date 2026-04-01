import { redirect } from "next/navigation";

export default function PgAbroadRedirectPage() {
  redirect("/contact?interest=pg-in-abroad");
}
