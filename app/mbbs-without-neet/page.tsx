import { redirect } from "next/navigation";

export default function MbbsWithoutNeetRedirect() {
  redirect("/contact?interest=mbbs-without-neet");
}
