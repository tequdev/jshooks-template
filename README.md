# JSHooks Template

## Prerequisites

- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started/)
- [xrpld-netgen](https://github.com/Transia-RnD/xrpld-network-gen)
  - Python: ^3.9.6
  - `pip3 install xrpld-netgen`

## Usage

### Install dependencies

```sh
pnpm i
```

### Start the standalone network

```sh
pnpm xrpld:start
```

### Stop the standalone network

```sh
pnpm xrpld:stop
```

### Build

```sh
pnpm build
```

### Test

#### all

```sh
pnpm test
```

#### only unit tests

```sh
pnpm test:unit
```

### Output network Hook logs

```sh
pnpm trace
```
