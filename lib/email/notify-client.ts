export async function notifyEmails(path: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`Email notify failed (${path}):`, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Email notify error (${path}):`, err);
    return false;
  }
}
