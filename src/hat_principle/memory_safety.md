# Memory Safety

Toka achieves memory safety at compile time through the **PAL Checker** (Pointer Analysis Layer), without needing a garbage collector, runtime overhead, or explicit lifetime annotations.

## How PAL Works

The PAL Checker analyzes the usage of hat sigils (`*`, `^`, `~`) across your code to enforce ownership and borrowing rules. It runs at compile time and guarantees:

1. **No dangling pointers** — You cannot access memory after it has been freed
2. **No double-free** — Each allocation is freed exactly once
3. **No use after move** — A moved-from `^` (unique) pointer cannot be accessed
4. **No data races** — Mutable access is exclusive; shared access is read-only

## Unique Pointers (`^`) — No Use After Move

The `^` hat enforces exclusive ownership. Ownership can be transferred via *move*:

```toka
auto ^p = new i32(val=42)
auto ^q = ^p     // Ownership moves to q
println(str(q))  // OK — q owns the value
// println(str(p))  // ERROR — p is no longer valid
```

The compiler tracks the flow of ownership and rejects any code that accesses a value after its ownership has been transferred.

## Raw Pointers (`*`) — Unsafe Operations

Raw pointers require explicit `unsafe` blocks:

```toka
auto *p# = unsafe alloc i32(val=100)
p = 99             // Modify via soul (implicit dereference)
unsafe free(p)     // Manual free in unsafe
```

The `unsafe` keyword signals to the PAL Checker that you are taking manual responsibility for memory safety.

## Shared Pointers (`~`) — Reference Counting

Shared pointers use runtime reference counting but are still safe:

```toka
auto ~p = shared i32(val=42)
let ~q = p
// Both p and q can access the value
// Freed when the last reference goes out of scope
```

## Borrowing Safety

Implicit borrowing (in-place capture) is the default:

```toka
fn read(data: Buffer) {
    println(str(data.len))
}

let buf = create_buffer(1024)
read(buf)        // Immutable borrow — buf is still valid here
println(str(buf.len))  // OK
```

Mutable borrowing requires `#`:

```toka
fn write(data#: Buffer) {
    data.append("world")
}

let buf# = create_buffer(1024)
write(buf#)      // Mutable borrow — exclusive access
// buf is still valid here
```

## The PAL Checker's Guarantees at a Glance

| Situation | PAL Checker Action |
|-----------|-------------------|
| Use after `^` move | ❌ Compile error |
| Dangling `&` reference | ❌ Compile error |
| Double `unsafe free` | ❌ Compile error |
| Race on mutable data | ❌ Compile error |
| Valid borrow usage | ✅ Passes |
| Correct scope cleanup | ✅ Automatic free |

This model achieves the same safety guarantees as Rust's borrow checker, but without any lifetime annotations — the hat sigils make ownership visible directly in the syntax.
