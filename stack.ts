import { StackServerApp } from "@stackframe/stack";

const stackProjectID = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;

export const stackServerApp = new StackServerApp({
    tokenStore: "nextjs-cookie",
    urls: {
        signIn: "/handler/sign-in",
        signUp: "/handler/sign-up",
        accountSettings: "/handler/account-settings",
    },
    // Prevent crash during build if env var is missing
    ...(stackProjectID ? {} : { projectId: "build-placeholder" })
});
