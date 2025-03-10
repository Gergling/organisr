import { useEffect, useState } from "react";
import { GOOGLE_API_TRANSACTION_FOLDER, useGoogleAPI } from "../../../../shared/google-api";
import { TransactionFileMeta } from "../../transaction-manager";
import { getConvertedTransactionFiles } from "../utils/get-converted-transaction-files";

export const useTransactionFileListGDrive = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [list, setList] = useState<TransactionFileMeta[]>([]);
  const { getClient, isLoading } = useGoogleAPI();

  const fetchTransactionFiles = async () => {
    if (!isLoading && getClient()) {
      try {
        const { result: { files }} = await getClient().drive.files
          .list({
            fields: 'nextPageToken, files(id, name)',
            q: `'${GOOGLE_API_TRANSACTION_FOLDER}' in parents and trashed=false`,
          });

        if (!files) return [];

        setList(getConvertedTransactionFiles(files));
        setIsFetching(false);
        return files;
      } catch (error) {
        setIsFetching(false);
        console.error(error);
        throw error;
      }
    } else {
      throw new Error('This could do with a really good error message.');
    }
  }

  useEffect(() => {
    if (!isLoading && getClient()) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchTransactionFiles();
    }
  }, [isLoading, getClient]);

  return {
    isFetching,
    list,
  }
};
