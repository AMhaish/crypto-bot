import DataLoader from "dataloader";

type MakeLoaderOptions = {
  maxBatchSize?: number;
  manyItems?: boolean;
};

export default function makeLoader<R, I>(
  repo: R,
  field = "id",
  { maxBatchSize = 1000 }: MakeLoaderOptions = {}
) {
  return new DataLoader(
    async (ids: readonly (string | number)[]) => {
      // @ts-ignore
      const results: InstanceType<I>[] = await repo.findAllByWhereClause({
        [field]: {
          $in: ids,
        },
      });

      return results;
    },
    { maxBatchSize }
  );
}
