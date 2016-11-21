import { transform } from 'babel-core';
import plugin from '../src';

describe('the plugin', () => {
  beforeEach(() => {
    Object.keys(process.env)
      .filter((key) => key.startsWith('VARIANT_'))
      .forEach((key) => {
        delete process.env[key];
      });
  });

  it('inlines the default key when nothing is set', () => {
    const input = "                           \
      var color = Variant.select(\"color\", { \
        default: 'orange',                    \
        test: 'red',                          \
      });                                     \
    ";

    const result = transform(input, {
      plugins: [ plugin ]
    });

    expect(result.code).toEqual("var color = 'orange';");
  });

  it('throws an error when other members of Variant are accessed', () => {
    const input = "Variant.color = 'red';";

    expect(() => {
      const result = transform(input, {
        plugins: [ plugin ]
      });
    }).toThrow();
  });

  it('throws an error when Variant.select is used outside of a call', () => {
    const input = "Variant.select = 'red';";

    expect(() => {
      const result = transform(input, {
        plugins: [ plugin ]
      });
    }).toThrow();
  });

  it('does not throw an error when Variant is bound to something else', () => {
    const input = "var Variant = {};Variant.color = 'red';";

    const result = transform(input, {
      plugins: [ plugin ]
    });

    expect(result.code).toEqual(input);
  });

  it('throws an error when Variant.select is passed the wrong number of arguments', () => {
    const input1 = "Variant.select('color');";
    const input2 = "Variant.select('color', { default: 5 }, true, false);";

    expect(() => {
      const result = transform(input1, {
        plugins: [ plugin ]
      });
    }).toThrow();

    expect(() => {
      const result = transform(input2, {
        plugins: [ plugin ]
      });
    }).toThrow();
  });

  it('throws an error when Variant.select is passed the wrong type of first argument', () => {
    const input = "Variant.select(1, { default: 5 });";

    expect(() => {
      const result = transform(input, {
        plugins: [ plugin ]
      });
    }).toThrow();
  });

  it('throws an error when Variant.select is passed the wrong type of second argument', () => {
    const input = "Variant.select('color', 1);";

    expect(() => {
      const result = transform(input, {
        plugins: [ plugin ]
      });
    }).toThrow();
  });

  it('throws an error when Variant.select is called with missing option', () => {
    const input = "Variant.select('color', { x: 'y' });";

    expect(() => {
      const result = transform(input, {
        plugins: [ plugin ]
      });
    }).toThrow();
  });

  it('inlines the selected key from environment variable', () => {
    process.env.VARIANT_color = 'green';

    const input = "                           \
      var color = Variant.select(\"color\", { \
        default: 'orange',                    \
        green: '#00fa00',                     \
      });                                     \
    ";

    const result = transform(input, {
      plugins: [ plugin ]
    });

    expect(result.code).toEqual("var color = '#00fa00';");
  });
});
