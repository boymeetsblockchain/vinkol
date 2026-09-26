import { redirect } from "next/navigation";

/**
 * Canada has one agreement covering Customers and Merchants, where Nigeria
 * has two documents. Rather than serve the same text at a second address,
 * this redirects. Temporary rather than permanent, so nothing is cached into
 * browsers if a separate Canadian customer document ever appears.
 */
export default function Page() {
  redirect("/ca/terms-and-conditions");
}
