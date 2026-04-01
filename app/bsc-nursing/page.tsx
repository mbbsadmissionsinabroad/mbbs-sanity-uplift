import { redirect } from "next/navigation";

export default function BscNursingRedirect() {
  redirect("/contact?interest=bsc-nursing");
}
