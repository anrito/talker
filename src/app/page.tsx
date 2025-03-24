import Link from "next/link";

export default async function Home() {
  // Generate a hash

  // Validate a password against the hash
  // const isValid = compareSync("anri1991", hash); // Should return true
  // const isInvalid = compareSync("wrongpassword", hash); // Should return false

  // console.log("Correct password valid:", isValid);
  // console.log("Incorrect password valid:", isInvalid);

  return (
    <div>
      <Link href="/registration">Register</Link>
    </div>
  );
}
