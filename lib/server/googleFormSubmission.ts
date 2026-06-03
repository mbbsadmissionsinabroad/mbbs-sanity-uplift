export function buildGoogleFormBody(payload: Record<string, string>) {
  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    params.set(key, value);
  });

  return params.toString();
}

export async function submitToGoogleForm(
  formResponseUrl: string,
  payload: Record<string, string>,
) {
  const body = buildGoogleFormBody(payload);

  const response = await fetch(formResponseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
    redirect: "follow",
    cache: "no-store",
  });

  const responseText = await response.text();

  if (
    !response.ok ||
    !responseText.includes("Your response has been recorded.")
  ) {
    throw new Error(
      `Google Form submission failed with status ${response.status}`,
    );
  }
}
