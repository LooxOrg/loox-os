let devices = {
  "desktop": {
    width: 1440,
    height: 1024,
    
  },
  "laptop": {
    width: 1280,
    height: 832
  },
  "phone": {
    width: 375,
    height: 647
  },
  "tablet": {
    width: 744,
    height: 1133
  }
} as Device

type Device = {
  [key: string]: {
    width: number,
    height: number,
  }
}

export default devices