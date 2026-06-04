import { Component } from '@angular/core';

interface Shade { key: string; hex: string; darkText: boolean; }
interface Palette { name: string; shades: Shade[]; accents: Shade[]; }

const palettes: Palette[] = [
  { name: 'USLI Orange', shades: [
    { key: '50',  hex: '#fff4ea', darkText: true  }, { key: '100', hex: '#fde4c0', darkText: true  },
    { key: '200', hex: '#fbce94', darkText: true  }, { key: '300', hex: '#f9b868', darkText: true  },
    { key: '400', hex: '#f8a63f', darkText: true  }, { key: '500', hex: '#f69728', darkText: true  },
    { key: '600', hex: '#d4841e', darkText: false }, { key: '700', hex: '#b27015', darkText: false },
    { key: '800', hex: '#905c0d', darkText: false }, { key: '900', hex: '#6e4807', darkText: false },
  ], accents: [
    { key: 'A100', hex: '#ffe0b2', darkText: true  }, { key: 'A200', hex: '#ffb74d', darkText: true  },
    { key: 'A400', hex: '#ff9800', darkText: true  }, { key: 'A700', hex: '#ff6d00', darkText: false },
  ]},
  { name: 'USLI Blue', shades: [
    { key: '50',  hex: '#e3e9f6', darkText: true  }, { key: '100', hex: '#b3c2e6', darkText: true  },
    { key: '200', hex: '#809dd8', darkText: true  }, { key: '300', hex: '#4d78c9', darkText: false },
    { key: '400', hex: '#255dbf', darkText: false }, { key: '500', hex: '#00338e', darkText: false },
    { key: '600', hex: '#002c7c', darkText: false }, { key: '700', hex: '#00216a', darkText: false },
    { key: '800', hex: '#001657', darkText: false }, { key: '900', hex: '#000b44', darkText: false },
  ], accents: [
    { key: 'A100', hex: '#80b0ff', darkText: true  }, { key: 'A200', hex: '#448aff', darkText: false },
    { key: 'A400', hex: '#2979ff', darkText: false }, { key: 'A700', hex: '#2962ff', darkText: false },
  ]},
  { name: 'USLI Gray', shades: [
    { key: '50',  hex: '#fafafa', darkText: true  }, { key: '100', hex: '#f5f5f5', darkText: true  },
    { key: '200', hex: '#eeeeee', darkText: true  }, { key: '300', hex: '#e0e0e0', darkText: true  },
    { key: '400', hex: '#bdbdbd', darkText: true  }, { key: '500', hex: '#a8a8a8', darkText: true  },
    { key: '600', hex: '#757575', darkText: false }, { key: '700', hex: '#616161', darkText: false },
    { key: '800', hex: '#424242', darkText: false }, { key: '900', hex: '#212121', darkText: false },
  ], accents: [
    { key: 'A100', hex: '#ffffff', darkText: true  }, { key: 'A200', hex: '#eeeeee', darkText: true  },
    { key: 'A400', hex: '#bdbdbd', darkText: true  }, { key: 'A700', hex: '#616161', darkText: false },
  ]},
  { name: 'Info', shades: [
    { key: '50',  hex: '#e8f4ff', darkText: true  }, { key: '100', hex: '#c0e0ff', darkText: true  },
    { key: '200', hex: '#90c8fe', darkText: true  }, { key: '300', hex: '#60b0fd', darkText: true  },
    { key: '400', hex: '#3da0fc', darkText: true  }, { key: '500', hex: '#5aaafa', darkText: true  },
    { key: '600', hex: '#4996e3', darkText: false }, { key: '700', hex: '#3478c3', darkText: false },
    { key: '800', hex: '#235aa0', darkText: false }, { key: '900', hex: '#163d7a', darkText: false },
  ], accents: [
    { key: 'A100', hex: '#b3d8ff', darkText: true  }, { key: 'A200', hex: '#64b5ff', darkText: true  },
    { key: 'A400', hex: '#1890ff', darkText: false }, { key: 'A700', hex: '#0070e0', darkText: false },
  ]},
  { name: 'Success', shades: [
    { key: '50',  hex: '#edfaee', darkText: true  }, { key: '100', hex: '#bce8be', darkText: true  },
    { key: '200', hex: '#88d58b', darkText: true  }, { key: '300', hex: '#55bb59', darkText: true  },
    { key: '400', hex: '#2da332', darkText: false }, { key: '500', hex: '#14661a', darkText: false },
    { key: '600', hex: '#105515', darkText: false }, { key: '700', hex: '#0d4411', darkText: false },
    { key: '800', hex: '#09330c', darkText: false }, { key: '900', hex: '#062207', darkText: false },
  ], accents: [
    { key: 'A100', hex: '#ccff90', darkText: true  }, { key: 'A200', hex: '#b2ff59', darkText: true  },
    { key: 'A400', hex: '#76ff03', darkText: true  }, { key: 'A700', hex: '#64dd17', darkText: true  },
  ]},
  { name: 'Warning', shades: [
    { key: '50',  hex: '#fffde7', darkText: true  }, { key: '100', hex: '#fff9c4', darkText: true  },
    { key: '200', hex: '#fff59d', darkText: true  }, { key: '300', hex: '#fff176', darkText: true  },
    { key: '400', hex: '#ffee58', darkText: true  }, { key: '500', hex: '#efc100', darkText: true  },
    { key: '600', hex: '#c29a00', darkText: true  }, { key: '700', hex: '#997800', darkText: false },
    { key: '800', hex: '#705800', darkText: false }, { key: '900', hex: '#4d3c00', darkText: false },
  ], accents: [
    { key: 'A100', hex: '#ffff8d', darkText: true  }, { key: 'A200', hex: '#ffff00', darkText: true  },
    { key: 'A400', hex: '#ffea00', darkText: true  }, { key: 'A700', hex: '#ffd600', darkText: true  },
  ]},
  { name: 'Error', shades: [
    { key: '50',  hex: '#fff0f0', darkText: true  }, { key: '100', hex: '#f9c4c4', darkText: true  },
    { key: '200', hex: '#f09090', darkText: true  }, { key: '300', hex: '#e65858', darkText: false },
    { key: '400', hex: '#d92828', darkText: false }, { key: '500', hex: '#b10505', darkText: false },
    { key: '600', hex: '#940404', darkText: false }, { key: '700', hex: '#770303', darkText: false },
    { key: '800', hex: '#590202', darkText: false }, { key: '900', hex: '#3b0101', darkText: false },
  ], accents: [
    { key: 'A100', hex: '#ff8a80', darkText: true  }, { key: 'A200', hex: '#ff5252', darkText: false },
    { key: 'A400', hex: '#ff1744', darkText: false }, { key: 'A700', hex: '#d50000', darkText: false },
  ]},
];

@Component({
  selector: 'app-colors-docs',
  standalone: true,
  templateUrl: './colors-docs.html',
  styleUrl: './colors-docs.scss',
})
export class ColorsDocs {
  palettes = palettes;
}
