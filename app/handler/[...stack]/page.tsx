"use client";

import { StackHandler } from "@stackframe/stack";

export default function Handler(props: any) {
    console.log("Handler Props:", JSON.stringify(props, null, 2));
    return <StackHandler fullPage={true} {...props} />;
}
