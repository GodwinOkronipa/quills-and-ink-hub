/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'cloudflare:email' {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string | ReadableStream);
  }
}

