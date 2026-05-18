# The Toka Programming Language Guide

The official documentation book for **Toka** — a modern systems programming language with the Hat Principle.

Toka is created by [YiZhonghua](https://github.com/zhyi-dp) and the main repository is at **[github.com/zhyi-dp/tokalang](https://github.com/zhyi-dp/tokalang)**.

## About

This book serves as the definitive guide to the Toka programming language, covering everything from installation and basic syntax to advanced topics like the Hat Principle (Toka's unique memory safety model), generics, concurrency, and standard library usage.

## Read Online

The latest version is automatically published to GitHub Pages:

[https://lumicore-dev.github.io/toka-book/](https://lumicore-dev.github.io/toka-book/)

## Build Locally

### Prerequisites

- [mdBook](https://github.com/rust-lang/mdBook) — the documentation tool used to build this book

### Build

```sh
mdbook build
```

The output will be in the `book/` directory. Open `book/index.html` in your browser.

### Serve with Live Reload

```sh
mdbook serve --open
```

This will start a local development server at `http://localhost:3000` with auto-reload on file changes.

## Project Structure

```
toka-book/
├── book.toml           # mdBook configuration
├── src/
│   ├── SUMMARY.md      # Table of contents (book structure)
│   ├── foreword.md     # Foreword
│   ├── getting_started/# Installation and first steps
│   ├── basics/         # Variables, functions, types, control flow
│   ├── hat_principle/  # Core memory safety model
│   ├── advanced/       # Error handling, generics, concurrency
│   ├── stdlib/         # Standard library documentation
│   ├── projects/       # Practical examples and projects
│   └── appendix/       # FAQ, comparison, migration guides
├── .github/workflows/  # CI/CD — auto-build and deploy to Pages
└── LICENSE             # MIT License
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
