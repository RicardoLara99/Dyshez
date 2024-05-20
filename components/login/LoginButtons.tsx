import React from "react";
import { SignIn } from "../auth-components";

export default function LoginButtons() {
  const providers = [
    {
      srcImage: "https://authjs.dev/img/providers/facebook.svg",
      name: "facebook",
    },
    {
      srcImage: "https://authjs.dev/img/providers/google.svg",
      name: "google",
    },
    {
      srcImage: "https://authjs.dev/img/providers/github.svg",
      name: "github",
    },
  ];

  return (
    <div className="flex flex-row gap-4 flex-wrap justify-center">
      {providers.map((provider, i) => (
        <SignIn {...provider} key={`Prov:[${i}]`} />
      ))}
    </div>
  );
}
