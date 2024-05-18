# LooxOS Simulator

## Why ?

The loox OS Simulator can serve to make apps for the OS or port existiongs apps to Loox Store

## Requirements

* NodeJS 20+
* Controller (TV & Console editions)

## Usage

If you don't have any understanding of NodeJS & NPM follow this guide

1) Install all required packages by running this command:

```bash
npm install
```

2) Run the simulator for the first time:

```bash
npm run dev
```

3. The default edition is the desktop edition to change it, go to `/profiles/0/internal.json` and locate the `OS_TYPE` variable.
   "desktop" for Desktop interface
   "laptop" for Laptop interface (add Battery and portable devices specific thing)
   "phone" for Phone interface
   "tablet" for Tablet interface
   "smart_tv" for Smart TV interface (Controller needed)
   "console" for a Console environment (Controller needed)


# Changelogs

### PRE ALPHA v1.0.0