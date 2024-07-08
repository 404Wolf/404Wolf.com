import { notify } from "src/utils/misc";

export async function fetchResource(domain: string, id: string) {
  const link = await fetch(`${domain}/api/resources/${id}/link`)
    .then((response: any) => response.json())
    .then(resource => resource.url)
    .catch(notify);
  if (!link) throw new Error("Failed to get resource URL");
  return (await fetch(link)).arrayBuffer();
}
