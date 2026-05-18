# Soul & Identity

Toka's Hat Principle introduces a clear distinction between a pointer's **handle** (the container) and its **soul** (the underlying data). Understanding this split is key to mastering Toka's memory model.

## Handle vs. Soul

Every pointer in Toka has two aspects:

- **Handle (The Hat)**: The identifier *with* its sigil (`^p`, `*p`, `~p`). This represents the pointer container itself — the memory location that holds the address.
- **Soul (The Data)**: The identifier *without* the sigil (`p`). This represents the underlying value being pointed to.

## Implicit Dereferencing

Toka's killer feature is **implicit dereferencing**: you never need a `*` or `->` operator to access the data behind a pointer. Just use the soul directly:

```toka
auto ^p = new Point(x: 10, y: 20)
p.x = 30       // No dereference operator needed!
let sum = p.x + p.y
```

This is a massive ergonomic improvement over C (`p->x = 30`) or Rust (`(*p).x = 30`).

## The Three Hats

Each hat sigil carries different ownership semantics:

### `*` — Raw Pointer
Low-level, unsafe pointer. Requires `unsafe` keyword or explicit `alloc`:

```toka
auto *p# = unsafe alloc i32(val: 42)
p = 100           // Modify soul directly
unsafe free(p)    // Manual cleanup
```

### `^` — Unique Pointer
Exclusive ownership of a heap-allocated resource. Created with `new`:

```toka
auto ^p = new i32(val: 42)
auto ^q = ^p      // Ownership moves to q
// p is now invalid — use after move is a compile error
```

### `~` — Shared Pointer
Reference-counted, shared ownership:

```toka
auto ~p = shared i32(val: 42)
```

## Identity and Address

To get the raw memory address of a local variable, use the `*(expr)` syntax:

```toka
auto a# = 42
auto *raw_ptr = *(a)  // Get the physical address of `a`
```

The hat (`^`) does **not** mean "address of". It specifically denotes the unique pointer container.
