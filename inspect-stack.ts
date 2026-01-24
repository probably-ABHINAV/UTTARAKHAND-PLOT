
import { StackServerApp } from "@stackframe/stack";

process.env.NEXT_PUBLIC_STACK_PROJECT_ID = "608f9558-7748-4f15-a863-e2047000ccda";
process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY = "pck_a05y3afjr41gdz6nnnd70qwkqt9ty3ryh3ppzwspckfs8";
process.env.STACK_SECRET_SERVER_KEY = "ssk_y5thq6fsydy1wv9yecj7rt9rw3ajv0a891t3ze0g4bs2r";

const app = new StackServerApp({
    tokenStore: "nextjs-cookie",
});

console.log("Keys:", Object.keys(app));
console.log("Prototype:", Object.getOwnPropertyNames(Object.getPrototypeOf(app)));
console.log("Parent Prototype:", Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(app))));

// Check for anything that looks like a handler
for (const key of Object.getAllPropertyNames(app)) {
    if (key.toLowerCase().includes('handl') || key.toLowerCase().includes('req')) {
        console.log("Found candidate:", key);
    }
}

// Check the constructor
console.log("Constructor:", app.constructor.name);

// Recursively get all property names
function getAllPropertyNames(obj) {
    let props = [];
    do {
        Object.getOwnPropertyNames(obj).forEach(function (prop) {
            if (props.indexOf(prop) === -1) {
                props.push(prop);
            }
        });
    } while (obj = Object.getPrototypeOf(obj));
    return props;
}

console.log("All Props:", getAllPropertyNames(app).filter(p => !p.startsWith('_')));
