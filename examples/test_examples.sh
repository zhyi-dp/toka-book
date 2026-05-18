#!/usr/bin/env bash
set -euo pipefail

# CI test script for toka-book examples
# Tests that all examples compile with tokac -c

TOKAC="/home/zhyi/.toka/bin/tokac"
TOKA_LIB="/home/zhyi/.toka/lib"
EXAMPLES_DIR="$(cd "$(dirname "$0")" && pwd)"
FAILURES=0
TOTAL=0

echo "=== Toka Book: Compiling Examples ==="
echo "tokac: $($TOKAC --version 2>&1)"
echo ""

for example in "$EXAMPLES_DIR"/*.tk; do
    name="$(basename "$example")"
    TOTAL=$((TOTAL + 1))
    
    if TOKA_LIB="$TOKA_LIB" "$TOKAC" -c "$example" -o /dev/null 2>/tmp/tokac_err.txt; then
        echo "  ✅ $name"
    else
        echo "  ❌ $name"
        cat /tmp/tokac_err.txt
        FAILURES=$((FAILURES + 1))
    fi
done

echo ""
echo "=== Results: $TOTAL files, $FAILURES failures ==="
exit $FAILURES
