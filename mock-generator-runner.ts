import glob from 'glob';

// Get all .mockgen files.
// Run them.

const LARGEST_POSSIBLE_PRIME = 9007199254740881; // Apparently

const getLargestPrime = (limit: number): number => {
  const candidate = Math.floor(limit);

  let divisor = 2;
  let maximumDivisor = candidate / 2;
  while (divisor <= maximumDivisor) {
    if ((candidate % divisor) === 0) {
      // Not a prime
      candidate -= 1;
      divisor = 2;
      maximumDivisor = candidate / 2
    } else {
      // Still a candidate
      divisor += 1;
    }
  }

  return candidate;
}

const multiMap = (
  dimensions: unknown[][],
  callback: (props: unknown[]) => unknown[],
) => {
  const dimension = dimensions.pop();
  if (!dimension) return [];

  const data = dimension.reduce((acc, mockValue) => {
    const deeper = multiMap(dimensions);
    const rows = deeper.map((deepRow) => {
      return [
        mockValue,
        ...deepRow,
      ];
    });
    return [
      ...acc,
      rows,
    ];
  }, []);

  return data.map(callback);
}

type NumberGenProps = {
  minimum: number;
  maximum: number;
}

const numberGen = ({
  minimum = 0,
  maximum = 1,
}: NumberGenProps, x: number): number => {
  // We calculate a range so that we can generate
  // our number on a scale from 0.
  const range = maximum - minimum;

  // This will generate non-linear numbers
  const quad = Math.pow(x, 2) + (x * 2) + x;

  // This will scale up the number to the range.
  const scaledUp = quad * range;

  // This will limit the number so that we can
  // stay within the range.
  const limited = scaledUp % LARGEST_POSSIBLE_PRIME;

  // This will scale the number down to less than 1.
  const scaledDown = limited / LARGEST_POSSIBLE_PRIME;

  // This will add the minimum back so that we are
  // back to the specified range.
  const added = scaledDown + minimum;

  return added;
}

type ToolProps = {
  // multiMap: ()
  numberGen: () => number;
};

type GenerateProps<ReturnType> = (tools: ToolProps) => ReturnType;

const generate<ReturnType> = (
  generator: GenerateProps<ReturnType>,
): ReturnType => {
  let generationIncrement = 0;
  const numberGenWrapper = (props: NumberGenProps) => {
    const number = numberGen(props, generationIncrement);
    generationIncrement += 1;
    return number;
  }
  const tools = {
    numberGen: numberGenWrapper,
  };
  return generator(tools);
}

const getFiles = () => {
  // blob list of files
  // run them and put the results into an adjacent json file
  glob('**/*.mockgen.ts', (err, files) => {
    files.map((path) => {
      // probably requires compiling the path into javascript from a shell tsc command
      // this will likely result in a deeper promise
      // once compiled, run the javascript
      // stringify the output into a json file with the same path excepting the extension
    });
  });
}


