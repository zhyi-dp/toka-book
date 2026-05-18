# The Hat Principle

The **Hat Principle** is the core concept behind Toka's memory safety model. Instead of requiring developers to annotate lifetimes or manually manage memory, Toka uses visible syntactic tokens called "hats" to track ownership and memory semantics at compile time.

## What is a Hat?

A **hat** is a sigil (symbol) attached to an identifier that tells both the programmer and the compiler how that value is stored, owned, and accessed. Toka has three hat types:

| Hat | Name | Meaning |
|-----|------|---------|
| `*` | Raw Pointer | Low-level pointer, requires `unsafe` / `alloc` |
| `^` | Unique Pointer | Exclusive ownership of a heap-allocated resource (like `Box` in Rust) |
| `~` | Shared Pointer | Reference-counted shared ownership |

## Handle vs. Soul

One of Toka's most elegant design features is the **Handle vs. Soul** distinction. It eliminates the need for explicit dereferencing operators:

- **Handle (The Hat)**: Identifiers **with** a sigil (`^p`, `*p`, `~p`) represent the *pointer container* itself.
- **Soul (The Data)**: Identifiers **without** a sigil (`p`) represent the *underlying data*.

When you want to read or modify the value a pointer points to, you simply operate on the **soul** directly — no dereference token needed:

```toka
auto *p# = unsafe alloc i32(val: 100)
// p (without *) refers to the underlying value
p = 200          // Modifies the allocated integer directly
let val = p      // Reads the value without explicit dereference
```

This is a major quality-of-life improvement over C's `*p = 200` or Rust's `*p = 200`. Toka's approach makes pointer-heavy code much more readable.

## How the PAL Checker Uses Hats

The PAL (Pointer Analysis Layer) Checker analyzes hat usage at compile time to enforce the same guarantees a borrow checker provides, but without lifetime annotations:

1. **No use after move** — A `^` value cannot be used after ownership has been transferred
2. **No dangling references** — References cannot outlive their referent
3. **No double-free** — Each owned value is freed exactly once
4. **No data races** — Mutable access is exclusive; shared access is read-only
