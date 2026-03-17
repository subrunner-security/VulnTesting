# Dependency test files

These files import from vuln-test/*. When pushed, Subrunner should:
1. See src/* as changed files
2. Follow imports to vuln-test/* (dependencies)
3. Rescan vuln-test/* even though they weren't changed

Tests if the bot rescans already-committed vulnerable files when new dependents are added.
