import DataLoader from "dataloader";

<<<<<<< HEAD
=======
/**
 * Create a data loader for model
 * @param model
 * @param {String} field
 * @param {Number} maxBatchSize
 * @param {Object} loaders
 * @param {Boolean} caseInsensitive - sort results case insensitive
 * @returns {DataLoader<*>}
 */

>>>>>>> fb3a8bc (Updates to make it work)
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
