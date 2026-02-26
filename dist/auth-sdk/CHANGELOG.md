## 25.1.1 - 2025-02-22 ##

- `[Added]`: Implemented token verification functionality using jsrsasign
- `[Removed]`: Removed token verification previously implemented using jsonwebtoken
- `[Added]`: Handled language specific characters while decoding Id token

## 25.2.0 - 2025-05-27 ##

- `[Added]`: Added changes for storing token in encrypted format in localstorage, controlled by a feature toggle

## [0.0.1] - 2026-02-26 - 26.1.1 ##

- `[Updated]`: Updated originatingServiceIdentifier field as nullable, CMA SDK consumers should no longer pass a static value; the identifier is derived internally as CMASDK.
