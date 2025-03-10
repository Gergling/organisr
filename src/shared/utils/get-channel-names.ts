// This seems like it could be more DRY.
// Maybe the ipc-config needs to include this functionality directly.

const prefixes = [
  'error',
  'message',
  'success',
] as const;

const propNames = [
  'errorChannelName',
  'messageChannelName',
  'successChannelName',
] as const;

type PropType = (typeof propNames)[number];

type ChannelNamesProps = {
  [prop in PropType]: string;
}

export const getChannelNames = (channelName: string): ChannelNamesProps => prefixes
  .reduce((names, prefix) => {
    const propName = `${prefix}ChannelName`;
    return {
      ...names,
      [propName]: `${prefix}-${channelName}`,
    };
  }, {}) as ChannelNamesProps;
