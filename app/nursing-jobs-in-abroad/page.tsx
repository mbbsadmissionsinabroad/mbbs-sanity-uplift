import { redirect } from "next/navigation";

export default function NursingJobsRedirectPage() {
  redirect("/contact?interest=nursing-jobs-in-abroad");
}
