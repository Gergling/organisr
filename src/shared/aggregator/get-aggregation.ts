type KeyGenerator<ItemProps> = (item: ItemProps) => string;
type Reducer<AggregatedProps, ItemProps> = (
  aggregation: AggregatedProps,
  item: ItemProps,
  idx: number,
  key: string,
) => AggregatedProps;

type Aggregation<ItemProps, AggregatedProps> = {
  key: string;
  items: ItemProps[];
  values: AggregatedProps;
};

type AggregationMapping<ItemProps, AggregatedProps> = {
  [key: string]: Aggregation<ItemProps, AggregatedProps>;
};

export const getAggregation = <ItemProps, AggregatedProps>(
  list: ItemProps[],
  keyGenerator: KeyGenerator<ItemProps>,
  reducer: Reducer<AggregatedProps, ItemProps>,
): Aggregation<ItemProps, AggregatedProps>[] => {
  const aggregationMapping: AggregationMapping<ItemProps, AggregatedProps> = {};

  list.forEach((item, idx) => {
    const key = keyGenerator(item);
    const aggregation = aggregationMapping[key] || {
      key,
      items: [],
      values: {},
    };
    
    aggregationMapping[key] = {
      ...aggregation,
      items: [...aggregation.items, item],
      values: reducer(aggregation.values, item, idx, key),
    };
  });

  return Object.values(aggregationMapping);
};
