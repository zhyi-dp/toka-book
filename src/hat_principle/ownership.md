# Ownership & Hats

Ownership in Toka is governed by the Hat Principle. Each hat sigil communicates a different ownership model directly through syntax.

## Three Ownership Models

Toka defines three pointer types, each with distinct ownership semantics:

### `*` — Raw Pointer (Unsafe)

Raw pointers require explicit `unsafe` or `alloc` to create and manage:

```toka
{{#include ../../examples/ownership.tk:raw_ptr}}
```

Raw pointers are used when interfacing with C code or implementing low-level data structures.

### `^` — Unique Pointer (Move Semantics)

Unique pointers provide exclusive ownership. Only one `^` can point to a given resource at any time. Ownership is transferred via **move**:

```toka
{{#include ../../examples/ownership.tk:unique_ptr}}
```

The `^` token operates like Rust's `Box` or C++'s `std::unique_ptr`. When a unique pointer goes out of scope, its resource is automatically freed.

### `~` — Shared Pointer (Reference-Counted)

Shared pointers enable multiple owners via reference counting:

```toka
auto ~p = shared i32(val=42)
let ~q = p   // Reference count incremented
```

> **Note:** Support for `~` shared pointers is planned but not yet available in the current compiler release. Import from `std/memory` when available.

The resource is freed when the last `~` reference goes out of scope.

## Moving vs Copying

**Simple types** (like `i32`, `f64`, `bool`) are **copied** by default:

```toka
{{#include ../../examples/ownership.tk:move_copy}}
```

**Complex types** (like `string`, `Vec`, custom `shape` types) are **moved** by default:

```toka
auto original = create_string("Hello")
auto moved = original   // ownership transfers to `moved`
// `original` is no longer valid here
```

## Borrowing (In-Place Capture)

Toka uses **implicit borrow** for function parameters by default. You don't need special sigils for standard borrowing:

```toka
fn process(data: Buffer) {
    // data is an immutable borrow (in-place capture)
    println("size: " + str(data.len))
}

let buf = create_buffer(1024)
process(buf)   // Implicit immutable borrow
// buf is still valid here
```

For **mutable borrows**, use `#` on the parameter name:

```toka
fn mutate(data#: Buffer) {
    data.append("more data")
}

let buf# = create_buffer(1024)
mutate(buf)   // Mutable borrow — `#` only in declarations
```

## Explicit Local Borrow with `&`

The `&` sigil is used when **explicitly declaring a local borrow pointer** or returning a reference:

```toka
fn borrow_example(data: &Buffer) -> &str {
    // & denotes a reference type
    return &data[0..5]
}
```

## The PAL Checker in Action

The PAL Checker verifies at compile time that:

1. **No use after move** — A `^` value cannot be accessed after ownership transfer
2. **No dangling references** — Borrowed references cannot outlive the borrowed value
3. **No double-free** — Each value is freed exactly once
4. **No data races** — Mutable access is exclusive; shared access is read-only

All of this happens **without any lifetime annotations**. The Hat Principle makes ownership visible in the syntax itself.
