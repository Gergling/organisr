import { getAggregation } from "./get-aggregation";

type Robot = {
  build: 'humanoid' | 'tank' | 'nanite';
  selfSealingStemBolts: number;
  model: string;
}

const robots: Robot[] = [
  {
    build: 'tank',
    selfSealingStemBolts: 5,
    model: 'ED-209',
  },
  {
    build: 'humanoid',
    selfSealingStemBolts: 1,
    model: 'Robocop',
  },
  {
    build: 'humanoid',
    selfSealingStemBolts: 10,
    model: 'T-101',
  },
  {
    build: 'nanite',
    selfSealingStemBolts: 25,
    model: 'T-1000',
  },
  {
    build: 'humanoid',
    selfSealingStemBolts: 0,
    model: 'C-3PO',
  },
  {
    build: 'humanoid',
    selfSealingStemBolts: 9,
    model: 'Data',
  }
];

describe('getAggregation', () => {
  it('should aggregate', () => {
    const meanStemBoltsByBuild = getAggregation<Robot, { meanStemBolts: number; }>(
      robots,
      ({ build }) => build,
      (aggregation, robot, idx) => {
        const meanStemBolts = (aggregation.meanStemBolts || 0) * idx;
        aggregation.meanStemBolts = (
          meanStemBolts + robot.selfSealingStemBolts
        ) / (idx + 1);
        return aggregation;
      },
    );
    expect(meanStemBoltsByBuild).toStrictEqual([
      {
        items: [
          {
            build: 'tank',
            model: 'ED-209',
            selfSealingStemBolts: 5,
          },
        ],
        key: 'tank',
        values: {
          meanStemBolts: 5,
        },
     },
     {
       items: [
          {
            build: 'humanoid',
            model: 'Robocop',
            selfSealingStemBolts: 1,
          },
          {
            build: 'humanoid',
            model: 'T-101',
            selfSealingStemBolts: 10,
          },
          {
            build: 'humanoid',
            model: 'C-3PO',
            selfSealingStemBolts: 0,
          },
          {
            build: 'humanoid',
            model: 'Data',
            selfSealingStemBolts: 3,
          },
        ],
        key: 'humanoid',
        values: {
          meanStemBolts: 2.944444444444444,
        },
      },
      {
        items: [
          {
            build: 'nanite',
            model: 'T-1000',
            selfSealingStemBolts: 25,
          },
        ],
        key: 'nanite',
        values: {
          meanStemBolts: 6.25,
        }
      }
    ]);
  });
});
