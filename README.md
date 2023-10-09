# Simple SPV Client

A simple SPV client that aims for easy integration primarily with LBRY Hub servers.

To see what methods that the SPV will answer on, check [this website](https://electrumx.readthedocs.io/en/latest/protocol-methods.html).
This client doesn't try to decode the data recieved, rather it gives you the raw JSONRPC that the SPV replied with.

The claimtrie methods specific to LBRY will return a Base64 encoded protobuf as the result. You'll need to decode the result according to the [LBRY types](https://github.com/lbryio/types).

## Good Resources
* [Protocol Methods](https://electrumx.readthedocs.io/en/latest/protocol-methods.html)
* [Documentation of the full Electrum Protocol](https://github.com/ben221199/Electrum-Protocol)
* [SPV Monitor](https://1209k.com/bitcoin-eye/ele.php?chain=lbc)
* [LBRY types](https://github.com/lbryio/types).


## Usage

Get started:
> You need to have [Bun](https://bun.sh/) installed

```bash
git clone https://github.com/pigges/simple-spv-client.git
cd simple-spv-client
bun install
bun start
```

The startup looks like this:

```bash
|-------------------|
| Simple SPV Client |
|-------------------|

Which SPV server should be used?
1. Default (a-hub1.odysee.com:50001)
2. Custom
Answer: 
```

You can also choose to use arguments to directly get a response:
```bash
bun start --server "server" command {your command}
```

## Build

You can build the project to get an executable:
> This will give you a file named a.out
```bash
bun run build
```


